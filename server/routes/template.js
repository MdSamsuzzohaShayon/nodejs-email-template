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





// THIS IS FOR EXPIREMENT 

// const uploadFile = multer({ storage });
router.get('/file-upload', (req, res, next) => {
    res.render('file-upload');
});
router.post('/file-upload', uploadFile.single('filename'), (req, res, next) => {
    console.log(req.file);
    console.log(req.body);
});






router.post('/add', (req, res, next) => {
    res.status(200).json({ request: 'Success' });
});
module.exports = router;