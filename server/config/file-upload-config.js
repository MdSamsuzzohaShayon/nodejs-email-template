const multer = require('multer');
const fs = require('fs');
const path = require('path');


// console.log(path.join(__dirname, '../uploads/'));



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // fs.mkdir('./uploads/', (err) => {
        cb(null, path.join(__dirname, '../uploads/'));
        // });
    },
    filename: function (req, file, cb) {
        let newFileName = null;
        if (file.originalname.length > 10) {
            newFileName = `${file.fieldname}-${file.originalname.substring(0, 9)}-${file.originalname.substring(file.originalname.length - 5)}`
        } else {
            newFileName = `${file.fieldname}-${file.originalname}-${file.originalname.substring(file.originalname.length - 5)}`
        }
        // cb(null, newFileName);
        cb(null, newFileName);
    }
})

const uploadFile = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});






module.exports = uploadFile;