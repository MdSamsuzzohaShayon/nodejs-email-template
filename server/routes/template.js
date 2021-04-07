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
    res.render('email-template');
});


// POSSIBLE NAME 
// header-img
// img-1-1 


const arrayOfImg = [
    { name: 'header-img', maxCount: 1 },
    { name: 'img-1-1', maxCount: 1 },
    { name: 'img-1-2', maxCount: 1 },
    { name: 'img-1-3', maxCount: 1 },
    { name: 'img-2-1', maxCount: 1 },
    { name: 'img-2-2', maxCount: 1 },
    { name: 'img-2-3', maxCount: 1 },
    { name: 'img-3-1', maxCount: 1 },
    { name: 'img-3-2', maxCount: 1 },
    { name: 'img-3-3', maxCount: 1 },
    { name: 'img-4-1', maxCount: 1 },
    { name: 'img-4-2', maxCount: 1 },
    { name: 'img-4-3', maxCount: 1 },
    { name: 'img-5-1', maxCount: 1 },
    { name: 'img-5-2', maxCount: 1 },
    { name: 'img-5-3', maxCount: 1 },
];




router.post('/add', uploadFile.fields(arrayOfImg), (req, res, next) => {

    const { title, bgColor, linkColor, layout, element } = req.body;
    // const bgImg =  req.files['header-img'].orginalname;
    // JSON TO JS OBJECT 

    let layoutObj = JSON.parse(layout);
    let elementObject = JSON.parse(element);

    // console.log(layoutObj);
    // console.log(elementObject);


    // Block element name:  {
    //     name: 'txtBlockContent',
    //     blockHtml: '<div class="content txt-content-block" onclick="txtChangeHandler" contenteditable="true" id="txt-3-1">😊Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil corrupti natus eos in a voluptas incidunt porro quis autem quo!</div>',
    //     siblingButton: null
    //   }


    // str.replaceAll('dog', 'monkey')
    // <div class=_content txt-content-block_ onclick=_txtChangeHandler_ contenteditable=_true_ id=_txt-1-2_>😊Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil corrupti natus eos in a voluptas incidunt porro quis autem quo!</div>

    // CHANGE IMAGE URL 
    elementObject.forEach((eo, index) => {
        // let htmlBlockString = eo.blockElement.blockHtml.toString();
        // const search = '"';
        // const replaceWith = '_';

        // const removeDoubleQuatation = htmlBlockString.split(search).join(replaceWith);
        // SCAPE ALL DOUBLE QUATATION MARK
        // eo.blockElement.blockHtml = htmlBlockString.replace(/"/g, 'q.');
        // eo.blockElement.blockHtml = ;
        // console.log("Block element name: ", eo.blockElement.blockHtml);
        if (eo.blockElement.name === "imgBlockContent") {
            // console.log("button", eo.blockElement.siblingButton); //WORKING
            // console.log("Requested files", req.files[`img-${eo.rowNumber}-${eo.columnNumber}`]);
            const findImg = req.files[`img-${eo.rowNumber}-${eo.columnNumber}`];
            if (findImg) {
                findImg.forEach((img, idx) => {
                    if (img.fieldname === `img-${eo.rowNumber}-${eo.columnNumber}`) {
                        eo.blockElement.imgUrl = `./uploads/${img.filename}`;
                    }
                });
            }
        }
    });



    // console.log(req.files['header-img'][0]); // filename




    // console.log("LayoutObj: ", layoutObj);
    // console.log("Element Object: ", elementObject);
    // console.log("Whole Body: ", req.body);
    // conn.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    //     if (error) throw error;
    //     console.log('The solution is: ', results[0].solution);
    // });
    // console.log("bg img: ", bgImg);



    let bgimgName = "this is name";
    // https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp
    // INSERT INTO `nodejs_story`(`id`, `title`, `make_id`, `created_at`, `updated_at`, `created_by`, `updated_by`, `active_date`, `publish_date`, `embargo_date`, `status`, `bg_img`, `bg_color`, `link_color`, `layout`, `content`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]','[value-6]','[value-7]','[value-8]','[value-9]','[value-10]','[value-11]','[value-12]','[value-13]','[value-14]','[value-15]','[value-16]')
    // INSERT INTO `nodejs_story`(`id`, `title`, `bg_img`, `bg_color`, `link_color`, `layout`, `content`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]','[value-6]','[value-7]','[value-8]','[value-9]','[value-10]','[value-11]','[value-12]','[value-13]','[value-14]','[value-15]','[value-16]')
    // console.log(elementObject);


    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
    // const entries = new Map([
    //     ['foo', 'bar'],
    //     ['baz', 42]
    //   ]);

    //   const obj = Object.fromEntries(entries);

    //   console.log(obj);
    //   // expected output: Object { foo: "bar", baz: 42 }
    const layoutJSON = JSON.stringify(layoutObj);
    const elementJSON = JSON.stringify(elementObject);
    // let layoutJSON = { row1: '12', row2: '23', row3: '45' };
    // let elementJSON = { el1: "el1", el2: "eker", el3: '123' };


    console.log(elementJSON);

    const sql = `INSERT INTO nodejs_story 
                        (title,  bg_color, link_color, layout, content) VALUES 
                        ('${title}', '${bgColor}', '${linkColor}', '${layoutJSON}', '${elementJSON}')`;



    // const sql = `INSERT INTO nodejs_story (title, bg_color, link_color) VALUES  ('${title}', '${bgColor}', '${linkColor}')`;
    // const values = [title, bgImg, bgColor, linkColor, layoutObj, elementObject];
    conn.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log("The result is: ", result);
    });
    conn.end();



    // https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp
    // https://stackoverflow.com/questions/20411440/incorrect-string-value-xf0-x9f-x8e-xb6-xf0-x9f-mysql


    res.status(200).json({ request: 'Success' });
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