const express = require('express');
const conn = require('../config/mysql-config');
const path = require('path');
const fs = require('fs');
const { uploadMultipleFileToS3 } = require('../config/file-upload-config-s3');
const { invalidToValidStr, getAllImage, deleteImages, deleteHeaderImage, deleteTemplateImages } = require('../utils/helper');

const router = express.Router();








// PREVIEW ALL TEMPLATE 
router.get('/', (req, res, next) => {

    
    /*
    // const tableChekSql = `SELECT count(*) FROM information_schema.TABLES WHERE(TABLE_SCHEMA = '${process.env.DBNAME}') AND(TABLE_NAME = 'nodejs_story')`;
    const tableChekSql = `SHOW TABLES LIKE 'nodejs_story'`;

    conn.query(tableChekSql, (err, hasTable) => {
        if (err) throw err;
        if (hasTable.length < 1) {
            console.log("No Table create one - ", hasTable.length);
            const createTableSql = `
            SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
            START TRANSACTION;
            SET time_zone = "+00:00";
            CREATE TABLE nodejs_story( id int(11) NOT NULL, 
                title varchar(255) NOT NULL, 
                make_id int(11) DEFAULT NULL,
                created_at datetime NOT NULL DEFAULT current_timestamp(),
                updated_at datetime NOT NULL DEFAULT current_timestamp(),
                created_by int(11) DEFAULT NULL,
                updated_by int(11) DEFAULT NULL,
                active_date datetime NOT NULL DEFAULT current_timestamp(),
                publish_date datetime NOT NULL DEFAULT current_timestamp(),
                embargo_date datetime NOT NULL DEFAULT current_timestamp(),
                status int(11) DEFAULT NULL,
                bg_img varchar(255) DEFAULT NULL,
                bg_color varchar(255) NOT NULL,
                link_color varchar(255) NOT NULL,
                layout longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
                content longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
                sibling longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid("sibling"))
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
                INSERT INTO nodejs_story (id, title, make_id, created_at, updated_at, created_by, updated_by, active_date, publish_date, embargo_date, status, bg_img, bg_color, link_color, layout, content, sibling) VALUES
                    (10, 'Example 4', NULL, '2021-07-31 05:05:49', '2021-07-31 05:05:49', NULL, NULL, '2021-07-31 05:05:49', '2021-07-31 05:05:49', '2021-07-31 05:05:49', NULL, 'default-header.jpg', '#e6f2ff', '#000066', '[{\"rowID\":2,\"rowWithColumn\":1},{\"rowID\":1,\"rowWithColumn\":2},{\"rowID\":3,\"rowWithColumn\":3},{\"afterRow\":2,\"spaceRow\":12},{\"rowID\":4,\"rowWithColumn\":1}]', '[{\"rowNumber\":1,\"columnNumber\":2,\"blockElement\":{\"name\":\"imgBlockContent\",\"blockHtml\":\"<a><img /></a>\",\"imgHyperlink\":\"http://localhost:4000\",\"imgNewTab\":false,\"imgUrl\":\"/img/empty-image.png\"}},{\"rowNumber\":1,\"columnNumber\":1,\"blockElement\":{\"name\":\"txtBlockContent\",\"blockHtml\":\"<div id=~_txt-1-1~_ contenteditable=~_true~_ class=~_content txt-content-block~_>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil corrupti natus eos in a voluptas incidunt porro quis autem quo!</div>\"}},{\"rowNumber\":2,\"columnNumber\":1,\"blockElement\":{\"name\":\"txtBlockContent\",\"blockHtml\":\"<div id=~_txt-2-1~_ contenteditable=~_true~_ class=~_content txt-content-block~_>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil corrupti natus eos in a voluptas incidunt porro quis autem quo!</div>\"}},{\"rowNumber\":3,\"columnNumber\":3,\"blockElement\":{\"name\":\"imgBlockContent\",\"blockHtml\":\"<a><img /></a>\",\"imgHyperlink\":\"http://localhost:4000\",\"imgNewTab\":false,\"imgUrl\":\"img-3-3-159867093-38-o.jpg\"}},{\"rowNumber\":3,\"columnNumber\":1,\"blockElement\":{\"name\":\"txtBlockContent\",\"blockHtml\":\"<div id=~_txt-3-1~_ contenteditable=~_true~_ class=~_content txt-content-block~_>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil corrupti natus eos in a voluptas incidunt porro quis autem quo!</div>\"}},{\"rowNumber\":4,\"columnNumber\":1,\"blockElement\":{\"name\":\"socialBlockContent\",\"blockHtml\":\"<div>social</div>\",\"socialFbHyperlink\":\"fb.com/md.shayon.148\",\"socialTwitterHyperlink\":\"twitter.com/shayon_md\",\"socialInstagramHyperlink\":\"https://www.instagram.com/md_shayon/\"}}]', '[{\"rowNum\":1,\"colNum\":2,\"btnBgColor\":\"rgb(70, 133, 192)\",\"btnTextColor\":\"rgb(15, 48, 80)\",\"btnHyperlink\":\"http://localhost:4000\",\"btnOpenNewTab\":false,\"btnRound\":false,\"btnAlign\":\"inherit\",\"btnContent\":\"Preview\",\"btnFontFamily\":\"Helvetica\",\"btnFontSize\":12},{\"rowNum\":3,\"colNum\":1,\"btnBgColor\":\"rgb(70, 133, 192)\",\"btnTextColor\":\"rgb(15, 48, 80)\",\"btnHyperlink\":\"http://localhost:4000\",\"btnOpenNewTab\":false,\"btnRound\":false,\"btnAlign\":\"inherit\",\"btnContent\":\"Preview\",\"btnFontFamily\":\"Helvetica\",\"btnFontSize\":12}]');

                ALTER TABLE nodejs_story ADD PRIMARY KEY (id);
                ALTER TABLE nodejs_story MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12; COMMIT;

              `;

              conn.query(createTableSql, (err, createTableResult)=>{
                  if(err) throw err;
                  console.log("Create table ",createTableResult);
              });


        }

    });
    */
    const sql = `SELECT id, title FROM nodejs_story`;
    conn.query(sql, [req.params.id], (err, result, fields) => {
        if (err) throw err;
        console.log(result);
        res.render('template/index', { docs: result });
    });
    // res.render('template/index', { docs: result });
});



// PREVIEW SINGLE TEMPLATE 
router.get('/preview/:id', (req, res, next) => {
    const sql = `SELECT id, title, bg_img, bg_color, link_color, layout, content, sibling FROM nodejs_story WHERE id=?`;
    conn.query(sql, [req.params.id], (err, result, fields) => {
        if (err) throw err;
        try {
            // console.log("Layout - ", JSON.parse(result[0].layout));
            // console.log("---------break--------------".white);
            // console.log("Content - ", JSON.parse(result[0].content));
            // console.log("---------break--------------".white);
            // console.log("Sibling - ", JSON.parse(result[0].sibling));
            res.render('template/template-preview', { docs: result[0], headerImg: result[0].bg_img });
        } catch (readFileErr) {
            console.log("Read file error: ".red, readFileErr);
        }

    });
});







// EDITOR VIEWS 
router.get('/editor', (req, res, next) => {
    res.render('template/email-template');
});











// ADD A TEMPLATE TO DATABASE 
router.post('/add', uploadMultipleFileToS3, (req, res, next) => {


    const { title, bgColor, linkColor, layout, element, sibling } = req.body;
    let bgImg = "default-header.jpg";
    // console.log("Required files: ".blue, req.files);
    if (req.files['headerImg']) {
        bgImg = req.files['headerImg'][0].key;
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

    // console.log("All block Details: ", JSON.stringify(elementObject));
    const sql = `INSERT INTO nodejs_story (title,  bg_img, bg_color, link_color, layout, content, sibling) VALUES ('${title}', '${bgImg}', '${bgColor}', '${linkColor}', '${layout}', '${JSON.stringify(elementObject)}', '${sibling}')`;
    conn.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log("Successfully added: ".bgGreen, result);
        res.redirect('/template');
    });
});



















// EDIT A TEMPLATE 
router.get('/edit/:id', (req, res, next) => {
    const sql = `SELECT id, title, bg_img, bg_color, link_color, layout, content, sibling FROM nodejs_story WHERE id=?`;

    // const values = [title, bgImg, bgColor, linkColor, layoutObj, elementObject];
    conn.query(sql, [req.params.id], async (err, result, fields) => {
        if (err) throw err;
        console.log("The result is: ", JSON.parse(result[0].layout));
        res.render('template/edit-template', { docs: result[0], templateID: req.params.id });
        // conn.end();
    });
});





// UPDATE TEMPLATE 
router.put('/edit/:id', uploadMultipleFileToS3, (req, res, next) => {
    const { title, bgColor, linkColor, layout, element, sibling } = req.body;
    // console.log("header Image - ", req.body.header-img);



    try {
        const findSql = `SELECT id, title, bg_img, bg_color, link_color, layout, content, sibling FROM nodejs_story WHERE id=?`;

        // FIND THE EMPLATE BY USING ID 
        conn.query(findSql, [req.params.id], async (findErr, findResult, findFields) => {
            if (findErr) throw findErr;
            let updatedBgImg = null;
            // console.log("Undefined Header image outside - ", req.files['headerImg']);

            // console.log("Find header - ", findResult[0].bg_img);
            // DELETE PREVIOUS HEADER IMAGE 
            if (req.files['headerImg']) {
                updatedBgImg = req.files['headerImg'][0].key;
                if (findResult[0].bg_img !== "default-header.jpg") {
                    const deletedH = await deleteHeaderImage(findResult[0].bg_img);
                    // console.log("Delete header: ", deletedH);
                }
            } else if (req.body.headerImg === "header-deleted") {
                // console.log("Header image text - ", req.body.headerImg);
                // IF HEADER IS BEED DELETED 

                updatedBgImg = null;
                if (findResult[0].bg_img !== "default-header.jpg") {
                    const deletedH = await deleteHeaderImage(findResult[0].bg_img);
                    // console.log("Delete header: ", deletedH);
                }
            } else {
                // IF HEADER IS NOT UPDATED 
                updatedBgImg = findResult[0].bg_img;
            }



            const delImgList = [];
            let elementObject = JSON.parse(element);
            elementObject.forEach((eo, eoI) => {
                // STRINGIFYING BUTTON ELEMENT 
                eo.blockElement.blockHtml = invalidToValidStr(eo.blockElement.blockHtml);
                // DELETE PREVIOUS FILE AND UPLOAD CURRENT ONE 
                if (eo.blockElement.name === "imgBlockContent") {
                    const foundContent = JSON.parse(findResult[0].content);


                    // CHECK IF THERE IS ANY IMAGE UPDATED
                    const findImg = req.files[`img-${eo.rowNumber}-${eo.columnNumber}`];
                    if (findImg !== undefined && findImg) {
                        const deleteImg = foundContent.filter((fc, fcI) => fc.rowNumber === eo.rowNumber && fc.columnNumber === eo.columnNumber);
                        delImgList.push({ Key: deleteImg[0].blockElement.imgUrl });
                        eo.blockElement.imgUrl = findImg[0].key;
                    }
                    if (!findImg) {
                        // UPDATE CONTENT 
                        const findResultContent = JSON.parse(findResult[0].content);
                        findResultContent.forEach((frc, frcI) => {
                            if (eo.rowNumber === frc.rowNumber && eo.columnNumber === frc.columnNumber) {
                                eo.blockElement.imgUrl = frc.blockElement.imgUrl;
                                // console.log("frc.blockElement.imgUrl: ", frc.blockElement.imgUrl);
                            }
                        });
                    }



                }

            });


            if (delImgList.length !== 0) {
                const delTempImg = await deleteTemplateImages(delImgList);
                // console.log("Delete template imgs: ", delTempImg);
            }

            // console.log("Element object - ", elementObject);

            // UPDATE DATABASE 
            const updateSql = `UPDATE nodejs_story SET title='${title}', bg_img='${updatedBgImg}', bg_color='${bgColor}', link_color='${linkColor}', layout='${layout}', content='${JSON.stringify(elementObject)}', sibling='${sibling}' WHERE id=?`;


            conn.query(updateSql, [req.params.id], (updateErr, updateResult, updateFields) => {
                if (updateErr) throw updateErr;
                console.log("Update result: ".green, updateResult);
                console.log(updateErr);
                // DELETE PREVIOUS HEADER IMAGE 
                res.redirect('/template');
            });
        });
    } catch (err) {
        console.log(err);
    }


});










// DELETE FROM `nodejs_story` WHERE 0
router.delete('/delete/:id', async (req, res, next) => {



    // console.log("Delete request is called - ID: ".info + req.params.id);
    const findSql = "SELECT bg_img, content from nodejs_story WHERE id=?";
    conn.query(findSql, [req.params.id], async (findErr, findResult, findFields) => {
        if (findErr) throw findErr;
        const blockContent = JSON.parse(findResult[0].content);
        const deletedImage = await deleteImages(findResult[0].bg_img, blockContent);
        // console.log("Delete header image from template: ".bgBlue, deletedImage);
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