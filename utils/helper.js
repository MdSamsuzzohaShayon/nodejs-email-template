const s3 = require('../config/s3');

// HELPING FUNCTION 1
function invalidToValidStr(invalidString) {
    let blockElementString = invalidString.toString();
    let newHtmlBlock = blockElementString.replace(/"/g, "~_");
    let validString = newHtmlBlock;
    return validString;
}







// HELPIING FUNCTION 2 
const getImage = async (imgKay) => {
    let tempImage = null;
    if (imgKay !== "default-header.jpg") {
        tempImage = await s3.getObject({ Key: imgKay, Bucket: process.env.AWS_BUCKET_NAME }).promise();
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





module.exports = { invalidToValidStr, getAllImage };