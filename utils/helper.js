const { promises: fsPromise } = require('fs');
const cloudinary = require('../config/cloudinary-config');

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
    const imgList = new Array();
    for (const bc of blockContent) {
        if (bc.blockElement.name === "imgBlockContent") {
            const tempImage = await getImage(bc.blockElement.imgUrl);
            imgList.push({ key: bc.blockElement.imgUrl, binaryImg: tempImage.Body });
        }
    }
    return imgList;
}


const deleteServerImages = async (imgList) => {
    // DELETE MULTIPLE OBJECTS 
    const deletedImgsList = [];
    for (const imgName of imgList) {
        deletedImgsList.push(fsPromise.unlink(__dirname + "/../uploads/" + imgName));
    }
    try {
        await Promise.all(deletedImgsList);
    } catch (error) {
        console.log(error);
    }
}


const deleteImages = async (imgList) => {
    try {
        const deleteImgs = await cloudinary.api.delete_resources(imgList);
        return deleteImgs;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { invalidToValidStr, getAllImage, deleteImages, deleteServerImages };