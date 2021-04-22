// https://www.npmjs.com/package/aws-sdk
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html
// https://github.com/Sam-Meech-Ward/image-upload-s3
const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccesskey = process.env.AWS_SECRET_KEY;

// SETUP S3 CREDENTIALS 
const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

// UPLOADS A FILE TO S3
function uploadS3File(file) {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        key: file.filename
    };

    return s3.upload(upload).promise();
}


exports.uploadS3File = uploadS3File;




// DOWNLOAD A FILE FROM S3 
function getFileStream(fileKey) {
    const donwloadParams = {
        Key: fileKey,
        Bucket: bucketName
    };

    return s3.getObject(donwloadParams).createReadStream();
}