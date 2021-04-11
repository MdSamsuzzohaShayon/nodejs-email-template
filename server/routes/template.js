const express = require('express');
const conn = require('../config/mysql-config');
const multer = require('multer');
const fs = require('fs');
const uploadFile = require('../config/file-upload-config');

const router = express.Router();





router.get('/editor', (req, res, next) => {
    // conn.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    //     if (error) throw error;
    //     console.log('The solution is: ', results[0].solution);
    // });

    // conn.end();
    res.render('template/email-template');
});







function invalidToValidStr(invalidString) {
    let blockElementString = invalidString.toString();
    let newHtmlBlock = blockElementString.replace(/"/g, "~_");
    let validString = newHtmlBlock;
    return validString;
}






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




    const sql = `INSERT INTO nodejs_story 
                        (title,  bg_img, bg_color, link_color, layout, content, sibling) VALUES 
                        ('${title}', '${bgImg}', '${bgColor}', '${linkColor}', '${layout}', '${JSON.stringify(elementObject)}', '${sibling}')`;

    // const values = [title, bgImg, bgColor, linkColor, layoutObj, elementObject];
    conn.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log("The result is: ", result);
    });
    //conn.end();
});




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
        // console.log("The result is: ", result[0].layout);
        res.render('template/template-preview', { docs: result[0] });
        // conn.end();
    });
});


// THIS IS FOR EXPIREMENT 
/*
// const uploadFile = multer({ storage });
router.get('/file-upload', (req, res, next) => {
    res.render('file-upload');
});
// router.post('/file-upload', uploadFile.single('imgs'), (req, res, next) => {
//     console.log(req.file);
//     console.log(req.body);
// });




// router.post('/file-multiple-upload', uploadFile.any(), (req, res, next) => {
//     console.log(req.files);
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.end("Done");
//     // console.log(req.body);
// });


router.post('/file-multiple-upload', uploadFile.fields([{ name: 'img1', maxCount: 1 }, { name: 'img2', maxCount: 1 }]), (req, res, next) => {
    // const files = req.files['img1'][0];
    // if (!files) {
    //     const error = new Error('Please choose files')
    //     error.httpStatusCode = 400
    //     return next(error)
    // }

    console.log(req.files['img1'][0]);
    console.log(req.body.title);
});
*/







module.exports = router;