const express = require('express');
const conn = require('../config/mysql-config');
const path = require('path');
const fs = require('fs');
const { uploadMultipleFileToS3 } = require('../config/file-upload-config-s3');
const { invalidToValidStr, getAllImage, deleteImages } = require('../utils/helper');

const router = express.Router();








// PREVIEW ALL TEMPLATE 
router.get('/', (req, res, next) => {
    const sql = `SELECT id, title FROM nodejs_story`;
    conn.query(sql, [req.params.id], (err, result, fields) => {
        if (err) throw err;
        res.render('template/index', { docs: result });
    });
});



// PREVIEW SINGLE TEMPLATE 
router.get('/preview/:id', (req, res, next) => {
    const sql = `SELECT id, title, bg_img, bg_color, link_color, layout, content, sibling FROM nodejs_story WHERE id=?`;
    conn.query(sql, [req.params.id], (err, result, fields) => {
        if (err) throw err;
        try {
            res.render('template/template-preview', { docs: result[0], headerImg: result[0].bg_img });
        } catch (readFileErr) {
            console.log("Read file error: ".red, readFileErr);
        }

    });
});



















// ADD A TEMPLATE TO DATABASE 
router.post('/add', uploadMultipleFileToS3, (req, res, next) => {


    const { title, bgColor, linkColor, layout, element, sibling } = req.body;
    let bgImg = "default-header.jpg";
    console.log("Required files: ".blue, req.files);
    if (req.files['header-img']) {
        bgImg = req.files['header-img'][0].key;
    }
    let elementObject = JSON.parse(element);

    // CHANGE IMAGE URL 
    elementObject.forEach((eo, index) => {
        // CHANGING HTML AS VALID HTML 
        eo.blockElement.blockHtml = invalidToValidStr(eo.blockElement.blockHtml);
        if (eo.blockElement.name === "imgBlockContent") {
            const findImg = req.files[`img-${eo.rowNumber}-${eo.columnNumber}`];
            if (findImg) {
                findImg.forEach((img, idx) => {
                    if (img.fieldname === `img-${eo.rowNumber}-${eo.columnNumber}`) {
                        eo.blockElement.imgUrl = img.key;
                    }
                });
            }
        }
    });

    console.log("All block Details: ", JSON.stringify(elementObject));
    const sql = `INSERT INTO nodejs_story (title,  bg_img, bg_color, link_color, layout, content, sibling) VALUES ('${title}', '${bgImg}', '${bgColor}', '${linkColor}', '${layout}', '${JSON.stringify(elementObject)}', '${sibling}')`;
    conn.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log("The result is: ", result);
        res.redirect('/template');
    });
});













// EDITOR VIEWS 
router.get('/editor', (req, res, next) => {
    res.render('template/email-template');
});





// EDIT A TEMPLATE 
router.get('/edit/:id', (req, res, next) => {
    const sql = `SELECT id, title, bg_img, bg_color, link_color, layout, content, sibling FROM nodejs_story WHERE id=?`;

    // const values = [title, bgImg, bgColor, linkColor, layoutObj, elementObject];
    conn.query(sql, [req.params.id], (err, result, fields) => {
        if (err) throw err;
        console.log("The result is: ", JSON.parse(result[0].layout));
        res.render('template/edit-template', { docs: result[0], templateID: req.params.id });
        // conn.end();
    });
});





// UPDATE TEMPLATE 
router.put('/edit/:id', uploadMultipleFileToS3, (req, res, next) => {
    const { title, bgColor, linkColor, layout, element, sibling } = req.body;
    try {
        const findSql = `SELECT id, title, bg_img, bg_color, link_color, layout, content, sibling FROM nodejs_story WHERE id=?`;

        // FIND THE EMPLATE BY USING ID 
        conn.query(findSql, [req.params.id], (findErr, findResult, findFields) => {
            if (findErr) throw findErr;
            let updatedBgImg = null;
            if (req.files['header-img']) {
                // DELETE PREVIOUS HEADER IMAGE 
                if (req.files['header-img']) {
                    updatedBgImg = req.files['header-img'][0].filename;
                    if (fs.existsSync(path.join(__dirname, "../uploads/" + findResult[0].bg_img)) && req.files['header-img'][0].filename !== "default-header.jpg") {
                        fs.unlinkSync(path.join(__dirname, "../uploads/" + findResult[0].bg_img));
                    }
                }
            }
            else {
                // IF HEADER IS NOT UPDATED 
                updatedBgImg = findResult[0].bg_img;
            }


            let elementObject = JSON.parse(element);
            elementObject.forEach((eo, eoI) => {
                // STRINGIFYING BUTTON ELEMENT 
                eo.blockElement.blockHtml = invalidToValidStr(eo.blockElement.blockHtml);
                // DELETE PREVIOUS FILE AND UPLOAD CURRENT ONE 
                if (eo.blockElement.name === "imgBlockContent") {
                    const foundContent = JSON.parse(findResult[0].content);

                    const findImg = req.files[`img-${eo.rowNumber}-${eo.columnNumber}`];
                    if (findImg !== undefined && findImg) {
                        const deleteImg = foundContent.filter((fc, fcI) => fc.rowNumber === eo.rowNumber && fc.columnNumber === eo.columnNumber);

                        if (fs.existsSync(path.join(__dirname, `../uploads/${deleteImg[0].blockElement.imgUrl}`))) {
                            console.log("File exist".red, deleteImg[0].blockElement.imgUrl);
                            fs.unlinkSync(path.join(__dirname, "../uploads/" + deleteImg[0].blockElement.imgUrl));
                        }

                        eo.blockElement.imgUrl = findImg[0].filename;
                    }
                    if (!findImg) {
                        // UPDATE CONTENT 
                        const findResultContent = JSON.parse(findResult[0].content);
                        findResultContent.forEach((frc, frcI) => {
                            if (eo.rowNumber === frc.rowNumber && eo.columnNumber === frc.columnNumber) {
                                eo.blockElement.imgUrl = frc.blockElement.imgUrl;
                                console.log("frc.blockElement.imgUrl: ", frc.blockElement.imgUrl);
                            }
                        });
                    }



                }

            });

            // UPDATE DATABASE 
            const updateSql = `UPDATE nodejs_story SET title='${title}', bg_img='${updatedBgImg}', bg_color='${bgColor}', link_color='${linkColor}', layout='${layout}', content='${JSON.stringify(elementObject)}', sibling='${sibling}' WHERE id=?`;

            conn.query(updateSql, [req.params.id], (updateErr, updateResult, updateFields) => {
                if (updateErr) throw updateErr;
                console.log("Update result: ".green, updateResult);
                // DELETE PREVIOUS HEADER IMAGE 
            });
        });
    } catch (err) {
        console.log(err);
    }


});










// DELETE FROM `nodejs_story` WHERE 0
router.delete('/delete/:id', async (req, res, next) => {



    console.log("Delete request is called - ID: ".info + req.params.id);
    const findSql = "SELECT bg_img, content from nodejs_story WHERE id=?";
    conn.query(findSql, [req.params.id], async (findErr, findResult, findFields) => {
        if (findErr) throw findErr;
        const blockContent = JSON.parse(findResult[0].content);
        const deletedImage = await deleteImages(findResult[0].bg_img, blockContent);
        console.log("Delete header image from template: ".bgBlue, deletedImage);
        // DELETE FROM DATABASE 
        const sql = "DELETE FROM nodejs_story WHERE id=?";
        conn.query(sql, [req.params.id], (err, result, fields) => {
            if (err) throw err;
            console.log("A record is beed deleted successfully".white, result);
            res.redirect('/template');
        });
    });



});























module.exports = router;