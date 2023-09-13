// HELPING FUNCTION 1
function invalidToValidStr(invalidString) {
    let blockElementString = invalidString.toString();
    let removeDoubleQuatation = blockElementString.replace(/"/g, "~_");
    let validString = removeDoubleQuatation.replace(/'/g, "_~");
    let removeQ = validString.replace(/\?/g, "-_");
    return removeQ;
}







// HELPIING FUNCTION 2 
const getImage = async (imgKay) => {
    let tempImage = null;
    if (imgKay !== "default-header.jpg") {
        // tempImage = await s3.getObject({ Key: imgKay, Bucket: process.env.AWS_BUCKET_NAME }).promise();
    }
    return tempImage;
}


// HELPING FUNCTION 3
const getAllImage = async (blockContent) => {
    // const imgKeys = ['header-img-Screensho-31-1.png', 'img-1-1-131299444-31-0.jpg', 'img-3-2-126719613-31-0.jpg'];
    const imgList = new Array();
    for (const bc of blockContent) {
        if (bc.blockElement.name === "imgBlockContent") {
            const tempImage = await getImage(bc.blockElement.imgUrl);
            imgList.push({ key: bc.blockElement.imgUrl, binaryImg: tempImage.Body });
        }
    }
    return imgList;
}




const deleteHeaderImage = async (imgKey) => {

    try {
        const deletedHeader = null;
        // const deletedHeader = await s3.deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, /* required */ Key: imgKey, /* required */ }).promise();
        return deletedHeader;
    } catch (error) {
        console.log("Error: ", error);
    }
}






const deleteTemplateImages = async (imgList) => {
    // DELETE MULTIPLE OBJECTS 
    const multipleImage = null;
    // const multipleImage = await s3.deleteObjects({
    //     Bucket: process.env.AWS_BUCKET_NAME,
    //     Delete: {
    //         Objects: imgList,
    //         Quiet: false
    //     }
    // }).promise();
    return multipleImage;
}




// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteObjects-property
// https://stackoverflow.com/questions/27753411/how-do-i-delete-an-object-on-aws-s3-using-javascript
const deleteImages = async (bg_img, blockContent) => {


    try {
        const deletedHeader = null;
        // const deletedHeader = await s3.deleteObject({
        //     Bucket: process.env.AWS_BUCKET_NAME,
        //     Key: bg_img, 
        // }).promise();

        // STORE MULTIPLE IMAGES TO AN ARRAY
        const imgList = new Array();
        for (const bc of blockContent) {
            if (bc.blockElement.name === "imgBlockContent") {
                imgList.push({ Key: bc.blockElement.imgUrl });
            }
        }



        // DELETE MULTIPLE OBJECTS 
        const multipleImage = null;
        // const multipleImage = await s3.deleteObjects({
        //     Bucket: process.env.AWS_BUCKET_NAME,
        //     Delete: {
        //         Objects: imgList,
        //         Quiet: false
        //     }
        // }).promise();
        return Promise.all([deletedHeader, multipleImage]);
    } catch (error) {
        console.log(error);
    }




}













module.exports = { invalidToValidStr, getAllImage, deleteImages, deleteHeaderImage, deleteTemplateImages };