const multer = require('multer');
const fs = require('fs');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdir('./uploads/', (err) => {
            cb(null, './uploads/');
        });
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const uploadFile = multer({ storage });






module.exports = uploadFile;