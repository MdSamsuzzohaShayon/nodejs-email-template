// https://www.youtube.com/watch?v=NZElg91l_ms&t=1085s
const multer = require('multer');
// var aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const fs = require('fs');
const path = require('path');
const s3 = require('./s3');


// aws.config.update({
//     secretAccessKey: process.env.AWS_SECRET_KEY,
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     region: process.env.AWS_BUCKET_REGION,

// });
// const s3 = new aws.S3();


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
            newFileName = `${file.fieldname}-${file.originalname.substring(0, 9)}-${new Date().getSeconds()}-${file.originalname.substring(file.originalname.length - 5)}`
        } else {
            newFileName = `${file.fieldname}-${file.originalname}-${new Date().getSeconds()}-${file.originalname.substring(file.originalname.length - 5)}`
        }
        cb(null, newFileName);
    }
});


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

const uploadFile = multer({
    storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
}).any();



const uploadMultipleFile = multer({
    storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
}).fields(arrayOfImg);




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






function deleteImages(bg_img, blockContent) {
    // DELETE BACKGROUND IMAGE  
    if (bg_img !== "default-header.jpg") {
        s3.deleteObject({
            Bucket: process.env.AWS_BUCKET_NAME,
            // Key: 'some/subfolders/nameofthefile1.extension',
            Key: bg_img,
        }, function (err, data) {
            if (err) throw err;
            console.log("AWS S3 Object Data: ", data);
        });
    }




    // DELETE IMAGES 
    blockContent.forEach((bCt, bctIdx) => {
        if (bCt.blockElement.name === "imgBlockContent" && bCt.blockElement.imgUrl !== "empty-image.png") {
            s3.getObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: bCt.blockElement.imgUrl, }, function (err, data) {
                if (err) throw err;
                console.log("AWS S3 Object Data: ", data);
            });
        }
    });
}





// Data - Images:  {
//     AcceptRanges: 'bytes',
//     LastModified: 2021-06-01T20:00:36.000Z,
//     ContentLength: 61488,
//     ETag: '"c0a4498360cc0d21f9e6615c10a64303"',
//     ContentType: 'application/octet-stream',
//     Metadata: { fieldname: 'header-img' },
//     Body: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 02 00 00 01 00 01 00 00 ff db 00 43 00 06 04 05 06 05 04 06 06 05 06 07 07 06 08 0a 10 0a 0a 09 09 0a 14 0e 0f 0c ... 61438 more bytes>
//   }



const getImage = async (imgKay, blockContent, response) => {
    let tempImage = null;
    if (imgKay !== "default-header.jpg") {
       tempImage = await s3.getObject({Key: imgKay, Bucket: process.env.AWS_BUCKET_NAME}).promise();
    //    console.log("Temp image: ", tempImage);
    }
    return tempImage;
}

// function getFileStream(fileKey) {
//     const donwloadParams = {
//         Key: fileKey,
//         Bucket: bucketName
//     };

//     return s3.getObject(donwloadParams).createReadStream();
// }




module.exports = { uploadFile, uploadMultipleFile, uploadMultipleFileToS3, deleteImages, getImage };