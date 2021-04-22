// https://www.youtube.com/watch?v=NZElg91l_ms&t=1085s
const multer = require('multer');
const fs = require('fs');
const path = require('path');


// console.log(path.join(__dirname, '../uploads/'));



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // fs.mkdir('./uploads/', (err) => {
        cb(null, path.join(__dirname, '../aws/'));
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
});
const arrayOfImg = [
    { name: 'img1', maxCount: 1 },
    { name: 'img2', maxCount: 1 }
];

const fileUploadToS3 = multer({
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






// module.exports = { multipleFile: fileUploadToS3.fields(arrayOfImg), singleFile: fileUploadToS3.single('img1') };
module.exports = fileUploadToS3;