const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('./s3');




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
    { name: 'img-6-1', maxCount: 1 },
    { name: 'img-6-2', maxCount: 1 },
    { name: 'img-6-3', maxCount: 1 },
    { name: 'img-7-1', maxCount: 1 },
    { name: 'img-7-2', maxCount: 1 },
    { name: 'img-7-3', maxCount: 1 },
    { name: 'img-8-1', maxCount: 1 },
    { name: 'img-8-2', maxCount: 1 },
    { name: 'img-8-3', maxCount: 1 },
    { name: 'img-9-1', maxCount: 1 },
    { name: 'img-9-2', maxCount: 1 },
    { name: 'img-9-3', maxCount: 1 },
];




// UPLOAD TO AWS S3 
const uploadMultipleFileToS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: "public-read",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            let newFileName = null;
            if (file.originalname.length > 10) {
                newFileName = `${file.fieldname}-${file.originalname.substring(0, 9)}-${new Date().getSeconds()}-${file.originalname.substring(file.originalname.length - 5)}`
            } else {
                newFileName = `${file.fieldname}-${file.originalname}-${new Date().getSeconds()}-${file.originalname.substring(file.originalname.length - 5)}`
            }
            cb(null, newFileName);
        }
    }),
    fileFilter: function (req, file, cb) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
}).fields(arrayOfImg);







module.exports = { uploadMultipleFileToS3 };