const express = require('express');
const conn = require('../config/mysql-config');
// const multer = require('multer');
const path = require('path');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const uploadFile = require('../config/file-upload-config');
const fileUploadToS3 = require('../config/file-upload-config-s3');
const { uploadS3File, getFileStream } = require('../config/s3');

const router = express.Router();


function invalidToValidStr(invalidString) {
    let blockElementString = invalidString.toString();
    let newHtmlBlock = blockElementString.replace(/"/g, "~_");
    let validString = newHtmlBlock;
    return validString;
}


// EDITOR VIEWS 
router.get('/editor', (req, res, next) => {
    // conn.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    //     if (error) throw error;
    //     console.log('The solution is: ', results[0].solution);
    // });

    // conn.end();
    res.render('template/email-template');
});













// ADD A TEMPLATE TO DATABASE 
router.post('/add', uploadFile, (req, res, next) => {

    const { title, bgColor, linkColor, layout, element, sibling } = req.body;
    let bgImg = "default-header.jpg";
    if (req.files['header-img']) {
        bgImg = req.files['header-img'][0].filename;
    }



    // console.log("Element object Before parse: ", element);



    // let layoutObj = JSON.parse(layout);
    let elementObject = JSON.parse(element);
    // let siblingObject = JSON.parse(sibling);


    // console.log("Element object: ", elementObject);
    // console.log("Sibling object: ", siblingObject);








    // CHANGE IMAGE URL 
    elementObject.forEach((eo, index) => {
        // CHANGING HTML AS VALID HTML 
        eo.blockElement.blockHtml = invalidToValidStr(eo.blockElement.blockHtml);
        // STRINGIFYING BUTTON ELEMENT 
        // if (eo.blockElement.name === "imgBlockContent" || eo.blockElement.name === "txtBlockContent") {
        //     if (eo.blockElement.siblingButton !== null) {
        //         eo.blockElement.siblingButton = JSON.stringify(invalidToValidStr(eo.blockElement.siblingButton));
        //     }
        // }
        // eo.blockElement.imgHyperlink = null;

        if (eo.blockElement.name === "imgBlockContent") {
            const findImg = req.files[`img-${eo.rowNumber}-${eo.columnNumber}`];
            if (findImg) {
                findImg.forEach((img, idx) => {
                    if (img.fieldname === `img-${eo.rowNumber}-${eo.columnNumber}`) {
                        eo.blockElement.imgUrl = img.filename;
                    }
                });
            }
        }
    });


    // console.log(elementObject);







    // https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp
    // INSERT INTO `nodejs_story`(`id`, `title`, `make_id`, `created_at`, `updated_at`, `created_by`, `updated_by`, `active_date`, `publish_date`, `embargo_date`, `status`, `bg_img`, `bg_color`, `link_color`, `layout`, `content`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]','[value-6]','[value-7]','[value-8]','[value-9]','[value-10]','[value-11]','[value-12]','[value-13]','[value-14]','[value-15]','[value-16]')




    console.log("All block Details: ", JSON.stringify(elementObject));



    const sql = `INSERT INTO nodejs_story 
                        (title,  bg_img, bg_color, link_color, layout, content, sibling) VALUES 
                        ('${title}', '${bgImg}', '${bgColor}', '${linkColor}', '${layout}', '${JSON.stringify(elementObject)}', '${sibling}')`;

    // const values = [title, bgImg, bgColor, linkColor, layoutObj, elementObject];
    conn.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log("The result is: ", result);
        res.redirect('/template');
    });
    //conn.end();
});





// EDIT A TEMPLATE 
router.get('/edit/:id', (req, res, next) => {
    // SELECT `id`, `title`, `bg_img`, `bg_color`, `link_color`, `layout`, `content` FROM `nodejs_story` WHERE 1
    // const sql = `SELECT id, title, bg_img, bg_color, link_color, layout, content FROM nodejs_story WHERE id=?`;

    // // const values = [title, bgImg, bgColor, linkColor, layoutObj, elementObject];
    // conn.query(sql, [req.params.id], (err, result, fields) => {
    //     if (err) throw err;
    //     console.log("The result is: ", result[0].layout);
    //     res.status(200).json(result[0]);
    //     res.render('template-preview', { docs: result[0] });
    //     conn.end();
    // });
    const sql = `SELECT id, title, bg_img, bg_color, link_color, layout, content, sibling FROM nodejs_story WHERE id=?`;

    // const values = [title, bgImg, bgColor, linkColor, layoutObj, elementObject];
    conn.query(sql, [req.params.id], (err, result, fields) => {
        if (err) throw err;
        // console.log("The result is: ", JSON.parse(result[0].content));
        res.render('template/edit-template', { docs: result[0], templateID: req.params.id });
        // conn.end();
    });
});



router.put('/edit', (req, res, next) => {
    console.log("Put Request", req.body);
});





// PREVIEW ALL TEMPLATE 
router.get('/', (req, res, next) => {
    const sql = `SELECT id, title FROM nodejs_story`;

    // const values = [title, bgImg, bgColor, linkColor, layoutObj, elementObject];
    conn.query(sql, [req.params.id], (err, result, fields) => {
        if (err) throw err;
        // console.log("The result is: ", result[0].layout);
        // res.render('template/template-preview', { docs: result[0] });
        // console.log(result);
        res.render('template/index', { docs: result });
        // conn.end();
    });
});

router.get('/preview/:id', (req, res, next) => {
    // SELECT `id`, `title`, `bg_img`, `bg_color`, `link_color`, `layout`, `content` FROM `nodejs_story` WHERE 1
    const sql = `SELECT id, title, bg_img, bg_color, link_color, layout, content, sibling FROM nodejs_story WHERE id=?`;

    // const values = [title, bgImg, bgColor, linkColor, layoutObj, elementObject];
    conn.query(sql, [req.params.id], (err, result, fields) => {
        if (err) throw err;
        console.log("The result is: ", JSON.parse(result[0].content));
        res.render('template/template-preview', { docs: result[0] });
        // conn.end();
    });
});




// DELETE FROM `nodejs_story` WHERE 0
router.delete('/delete/:id', (req, res, next) => {
    console.log("Delete request is called - ID: ".info + req.params.id);
    // FIND FOR IMAGES AND DELETE IMAGES
    // const findSql = "SELECT bg_img, content from nodejs_story WHERE id=?";
    //     const findImgResult = await conn.query(findSql, [req.params.id]);
    //     const blockContent = JSON.parse(findImgResult[0].content);
    const findSql = "SELECT bg_img, content from nodejs_story WHERE id=?";
    conn.query(findSql, [req.params.id], (findErr, findResult, findFields) => {
        if (findErr) throw findErr;
        const blockContent = JSON.parse(findResult[0].content);
        // console.log(findResult);
        // blockElement: {
        //     name: 'imgBlockContent',
        //     imgUrl: 'img-1-2-151979801-.jpeg'
        //   } 
        // DELETE BACKGROUND IMAGE  
        if (findResult[0].bg_img !== "default-header.jpg") {
            if (fs.existsSync(path.join(__dirname, "../uploads/" + findResult[0].bg_img))) {
                // console.log(path.join(__dirname, "../uploads/" + findResult[0].bg_img ));
                fs.unlinkSync(path.join(__dirname, "../uploads/" + findResult[0].bg_img));
            }
        }


        // console.log(blockContent);
        // DELETE IMAGES 
        blockContent.forEach((bCt, bctIdx) => {
            if (bCt.blockElement.name === "imgBlockContent" && bCt.blockElement.imgUrl !== "empty-image.png") {
                if (fs.existsSync(path.join(__dirname, "../uploads/" + bCt.blockElement.imgUrl))) {
                    // console.log(path.join(__dirname, "../uploads/" + bCt.blockElement.imgUrl));
                    fs.unlinkSync(path.join(__dirname, "../uploads/" + bCt.blockElement.imgUrl));
                }
                // else {
                //     console.log("file doesn't exist".red, path.join(__dirname, "../uploads"));
                // }
                // console.log(bCt);
            }
        });
        // // DELETE FROM DATABASE 
        const sql = "DELETE FROM nodejs_story WHERE id=?";
        conn.query(sql, [req.params.id], (err, result, fields) => {
            if (err) throw err;
            console.log("A record is beed deleted successfully".white, result);
            res.redirect('/template');
        });
    });



});


// THIS IS FOR EXPIREMENT 
// const uploadFile = multer({ storage });
router.get('/file-upload', (req, res, next) => {
    res.render('file-upload');
});


router.get('/file-fetch-s3/:key', (req, res, next) => {
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);
    res.render('file-upload');
});



router.post('/file-upload', fileUploadToS3.single('img1'), async (req, res, next) => {
    console.log("Hitting post: /template/file-upload".white);
    console.log(req.file);
    console.log(req.body.title);
    const result = await uploadS3File(req.file);
    console.log("Result of s3: ", result); // RESPONSE - WE WILL GET ETTAG, LOCATION, KEY, KEY, BUCKET
    console.log(`Make a get request to /timplate/file-fetch-s3/${result.Key}`);

    // REMOVE FILE FROM SERVER 
    await unlinkFile(req.file.path);
});




// router.post('/file-multiple-upload', uploadFile.any(), (req, res, next) => {
//     console.log(req.files);
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.end("Done");
//     // console.log(req.body);
// });


router.post('/file-multiple-upload', fileUploadToS3.fields([{ name: 'img1', maxCount: 1 }, { name: 'img2', maxCount: 1 }]), (req, res, next) => {
    console.log("Hitting post: /template/file-multiple-upload".white);
    // const files = req.files['img1'][0];
    // if (!files) {
    //     const error = new Error('Please choose files')
    //     error.httpStatusCode = 400
    //     return next(error)
    // }

    console.log(req.files['img1'][0]);
    console.log(req.body.title);
});








module.exports = router;