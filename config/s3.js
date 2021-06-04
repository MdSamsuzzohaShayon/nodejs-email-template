const aws = require("aws-sdk");

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION,

});
const s3 = new aws.S3();


module.exports = s3;