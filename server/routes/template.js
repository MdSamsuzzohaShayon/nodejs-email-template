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
// img-1-2 
// img-1-3
// img-2-1 
// img-2-2 
// img-2-3
// img-3-1 
// img-3-2 
// img-3-3
// img-4-1 
// img-4-2 
// img-4-3
// img-5-1 
// img-5-2 
// img-5-3

const arrayOfImg = [
    { name: 'header-img', maxCount: 1 },
    { name: 'img-1-1', maxCount: 1 },
    { name: 'img-1-2', maxCount: 1 },
    // { name: 'img-1-3', maxCount: 1 },
    // { name: 'img-2-1', maxCount: 1 },
    // { name: 'img-2-2', maxCount: 1 },
    // { name: 'img-2-3', maxCount: 1 },
    // { name: 'img-3-1', maxCount: 1 },
    // { name: 'img-3-2', maxCount: 1 },
    // { name: 'img-3-3', maxCount: 1 },
    // { name: 'img-4-1', maxCount: 1 },
    // { name: 'img-4-2', maxCount: 1 },
    // { name: 'img-4-3', maxCount: 1 },
];


router.post('/add', uploadFile.fields(arrayOfImg), (req, res, next) => {
    console.log(req.files);
    console.log(req.body);
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