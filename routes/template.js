const express = require('express');
const conn = require('../config/mysql-config');
// const multer = require('multer');
const path = require('path');
const Jimp = require('jimp');
const fs = require('fs');
const util = require('util');
const s3 = require('../config/s3');
const unlinkFile = util.promisify(fs.unlink);
const { uploadFileToS3, uploadMultipleFileToS3, deleteImages, getImage } = require('../config/file-upload-config-s3');

const router = express.Router();


// HELPING FUNCTION 1
function invalidToValidStr(invalidString) {
    let blockElementString = invalidString.toString();
    let newHtmlBlock = blockElementString.replace(/"/g, "~_");
    let validString = newHtmlBlock;
    return validString;
}


const bufferToImage = (bufferFile) => {
    const imageUrl = Buffer.from(bufferFile).toString("base64");
    return imageUrl;
}


// HELPING FUNCTION 2 
// const loopAllImageAndAddToList = (blockContent) => {
//     console.log("Data fetching please wait");
//     let imgList = new Array();
//     return new Promise((resolve, reject) => {
//         blockContent.forEach(async (bc, bcIdx, arrNum) => {
//             console.log("index: " + bcIdx + " Array Length: ", arrNum.length);
//             if (bcIdx === arrNum.length) {
//                 reject("There is not item left");
//             } else {
//                 if (bc.blockElement.name === "imgBlockContent") {
//                     const tempImage = await getImage(bc.blockElement.imgUrl);
//                     // console.log("Temp image: ", tempImage);
//                     imgList.push({ key: bc.blockElement.imgUrl, binaryImg: tempImage.Body });
//                     // resolve(imgList);
//                 }
//                 resolve(imgList);
//             }
//         });
//     });
// }



// PREVIEW ALL TEMPLATE 
router.get('/', (req, res, next) => {
    const sql = `SELECT id, title FROM nodejs_story`;

    // const values = [title, bgImg, bgColor, linkColor, layoutObj, elementObject];
    conn.query(sql, [req.params.id], (err, result, fields) => {
        if (err) throw err;
        // console.log("The result is: ", result[0].layout);
        // res.render('template/template-preview', { docs: result[0] });
        // console.log(result);
        res.render('template/index', { docs: result });
        // conn.end();
    });
});




// PREVIEW SINGLE TEMPLATE 
router.get('/preview/:id', (req, res, next) => {
    // SELECT `id`, `title`, `bg_img`, `bg_color`, `link_color`, `layout`, `content` FROM `nodejs_story` WHERE 1
    const sql = `SELECT id, title, bg_img, bg_color, link_color, layout, content, sibling FROM nodejs_story WHERE id=?`;

    // let imgList = new Array();

    // const values = [title, bgImg, bgColor, linkColor, layoutObj, elementObject];
    conn.query(sql, [req.params.id], async (err, result, fields) => {
        if (err) throw err;
        // console.log("The result is: ", result);
        const blockContent = await JSON.parse(result[0].content);


        try {
            // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property
            // console.log("Blcok content: ", blockContent);
            // const headerImage = await getImage(result[0].bg_img);
            // console.log("Temp image: ", tempImage);
            // blockElement: { name: 'imgBlockContent'}
            // loopAllImageAndAddToList(blockContent)
            //     .then(result => {
            //         console.log("Image List: ", result);
            //         res.render('template/example-preview', { imgList: result });
            //         // res.render('template/template-preview', { docs: result[0], imgList: result, headerImage });
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });

            res.render('template/template-preview', { docs: result[0] });


            // conn.end();
        } catch (readFileErr) {
            console.log("Read file error: ".red, readFileErr);
        }

    });
});





// EDITOR VIEWS 
router.get('/editor', (req, res, next) => {
    // conn.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    //     if (error) throw error;
    //     console.log('The solution is: ', results[0].solution);
    // });

    // conn.end();
    res.render('template/email-template');
});













// ADD A TEMPLATE TO DATABASE 
router.post('/add', uploadMultipleFileToS3, (req, res, next) => {


    const { title, bgColor, linkColor, layout, element, sibling } = req.body;
    let bgImg = "default-header.jpg";
    console.log("Required files: ".blue, req.files);
    if (req.files['header-img']) {
        bgImg = req.files['header-img'][0].key;
    }







    // console.log("Element object Before parse: ", element);



    // let layoutObj = JSON.parse(layout);
    let elementObject = JSON.parse(element);
    // let siblingObject = JSON.parse(sibling);




    // console.log("Element object(Before): ", elementObject);
    // console.log("Sibling object(Before): ", siblingObject);



    // {
    //     fieldname: 'header-img',
    //     originalname: 'bayern.png',
    //     encoding: '7bit',
    //     mimetype: 'image/png',
    //     size: 15616,
    //     bucket: 'email-template-nodejs',
    //     key: 'header-img-bayern.png-41-n.png',
    //     acl: 'private',
    //     contentType: 'application/octet-stream',
    //     contentDisposition: null,
    //     storageClass: 'STANDARD',
    //     serverSideEncryption: null,
    //     metadata: [Object],
    //     location: 'https://email-template-nodejs.s3.ca-central-1.amazonaws.com/header-img-bayern.png-41-n.png',
    //     etag: '"b94e2fded8e5e7d548a1674daa866dd1"',
    //     versionId: undefined
    //   }






    // CHANGE IMAGE URL 
    elementObject.forEach((eo, index) => {
        // CHANGING HTML AS VALID HTML 
        eo.blockElement.blockHtml = invalidToValidStr(eo.blockElement.blockHtml);
        // STRINGIFYING BUTTON ELEMENT 
        // if (eo.blockElement.name === "imgBlockContent" || eo.blockElement.name === "txtBlockContent") {
        //     if (eo.blockElement.siblingButton !== null) {
        //         eo.blockElement.siblingButton = JSON.stringify(invalidToValidStr(eo.blockElement.siblingButton));
        //     }
        // }
        // eo.blockElement.imgHyperlink = null;

        if (eo.blockElement.name === "imgBlockContent") {
            const findImg = req.files[`img-${eo.rowNumber}-${eo.columnNumber}`];
            if (findImg) {
                findImg.forEach((img, idx) => {
                    if (img.fieldname === `img-${eo.rowNumber}-${eo.columnNumber}`) {
                        eo.blockElement.imgUrl = img.key;
                    }
                });
            }
        }
    });


    // console.log(elementObject);



    // console.log("Element object: ", elementObject);
    // console.log("Sibling object: ", siblingObject);


    // HERE MAKE A LOOP OF ALL FILE AND UPLOAD IT TO AWS S3 




    // https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp
    // INSERT INTO `nodejs_story`(`id`, `title`, `make_id`, `created_at`, `updated_at`, `created_by`, `updated_by`, `active_date`, `publish_date`, `embargo_date`, `status`, `bg_img`, `bg_color`, `link_color`, `layout`, `content`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]','[value-6]','[value-7]','[value-8]','[value-9]','[value-10]','[value-11]','[value-12]','[value-13]','[value-14]','[value-15]','[value-16]')




    console.log("All block Details: ", JSON.stringify(elementObject));



    const sql = `INSERT INTO nodejs_story (title,  bg_img, bg_color, link_color, layout, content, sibling) VALUES ('${title}', '${bgImg}', '${bgColor}', '${linkColor}', '${layout}', '${JSON.stringify(elementObject)}', '${sibling}')`;
    // const sql = `INSERT INTO nodejs_story (title,  bg_img, bg_color, link_color, layout, content, sibling) VALUES ('?', '?', '?', '?', '?', '?', '?')`;

    // const values = [title, bgImg, bgColor, linkColor, layoutObj, elementObject];
    conn.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log("The result is: ", result);
        res.redirect('/template');
    });
    //conn.end();
});





// EDIT A TEMPLATE 
router.get('/edit/:id', (req, res, next) => {
    // SELECT `id`, `title`, `bg_img`, `bg_color`, `link_color`, `layout`, `content` FROM `nodejs_story` WHERE 1
    // const sql = `SELECT id, title, bg_img, bg_color, link_color, layout, content FROM nodejs_story WHERE id=?`;

    // // const values = [title, bgImg, bgColor, linkColor, layoutObj, elementObject];
    // conn.query(sql, [req.params.id], (err, result, fields) => {
    //     if (err) throw err;
    //     console.log("The result is: ", result[0].layout);
    //     res.status(200).json(result[0]);
    //     res.render('template-preview', { docs: result[0] });
    //     conn.end();
    // });

    const sql = `SELECT id, title, bg_img, bg_color, link_color, layout, content, sibling FROM nodejs_story WHERE id=?`;

    // const values = [title, bgImg, bgColor, linkColor, layoutObj, elementObject];
    conn.query(sql, [req.params.id], (err, result, fields) => {
        if (err) throw err;
        console.log("The result is: ", JSON.parse(result[0].layout));
        res.render('template/edit-template', { docs: result[0], templateID: req.params.id });
        // conn.end();
    });
});



router.put('/edit/:id', uploadMultipleFileToS3, (req, res, next) => {
    // console.log("Req id: ".yellow, req.params.id);
    // console.log("Request body: ".yellow, req.body);
    // console.log("Request Files: ".yellow, req.files);

    const { title, bgColor, linkColor, layout, element, sibling } = req.body;





    try {
        const findSql = `SELECT id, title, bg_img, bg_color, link_color, layout, content, sibling FROM nodejs_story WHERE id=?`;

        // FIND THE EMPLATE BY USING ID 
        conn.query(findSql, [req.params.id], (findErr, findResult, findFields) => {
            if (findErr) throw findErr;
            // console.log("find result content: ", findResult[0]);
            let updatedBgImg = null;

            if (req.files['header-img']) {
                // console.log("Update image: ", updatedBgImg);
                // DELETE PREVIOUS HEADER IMAGE 
                if (req.files['header-img']) {
                    updatedBgImg = req.files['header-img'][0].filename;
                    // console.log("Header image: ".white, req.files['header-img'][0].filename);
                    if (fs.existsSync(path.join(__dirname, "../uploads/" + findResult[0].bg_img)) && req.files['header-img'][0].filename !== "default-header.jpg") {
                        // console.log("File exist".red);
                        // console.log(path.join(__dirname, "../uploads/" + findResult[0].bg_img ));
                        fs.unlinkSync(path.join(__dirname, "../uploads/" + findResult[0].bg_img));
                    }
                }
            }

            else {
                // IF HEADER IS NOT UPDATED 
                updatedBgImg = findResult[0].bg_img;
                // console.log("Update bg image: ", updatedBgImg);
            }




            // const updateSql = `UPDATE `nodejs_story` SET `id`='[value-1]',`title`='[value-2]',`updated_at`='[value-5]',`bg_img`='[value-12]',`bg_color`='[value-13]',`link_color`='[value-14]',`layout`='[value-15]',`content`='[value-16]',`sibling`='[value-17]' WHERE id=?`;

            // title,  bg_img, bg_color, link_color, layout, content, sibling

            // console.log("Req.Body.Element- Updated: ".blue, JSON.parse(element));
            let elementObject = JSON.parse(element);
            elementObject.forEach((eo, eoI) => {
                // STRINGIFYING BUTTON ELEMENT 
                eo.blockElement.blockHtml = invalidToValidStr(eo.blockElement.blockHtml);



                // console.log("Element object: ".maganta, eo);



                if (eo.blockElement.name === "imgBlockContent") {
                    const foundContent = JSON.parse(findResult[0].content);

                    const findImg = req.files[`img-${eo.rowNumber}-${eo.columnNumber}`];
                    if (findImg !== undefined && findImg) {
                        // console.log("all non updated img element: ".white, eo);
                        // MATCH ROW NUMBER ANC COL NUMBER 
                        // console.log("Uploaded files: ".green, req.files[`img-${eo.rowNumber}-${eo.columnNumber}`]);
                        // DELETE PREVIOUS IMAGE 
                        // console.log("Upload image url: ".white, findImg[0].filename);
                        // console.log("Element: ".white, eo);
                        // console.log(`Element num ${eoI} - row number: ${eo.rowNumber} and col number: ${eo.rowNumber}`.yellow);
                        const deleteImg = foundContent.filter((fc, fcI) => fc.rowNumber === eo.rowNumber && fc.columnNumber === eo.columnNumber);
                        // console.log("Deletable previous image: ".red, deleteImg[0]);
                        // Deletable item:  img-3-2-158502216-53-o.jpg

                        if (fs.existsSync(path.join(__dirname, `../uploads/${deleteImg[0].blockElement.imgUrl}`))) {
                            console.log("File exist".red, deleteImg[0].blockElement.imgUrl);
                            fs.unlinkSync(path.join(__dirname, "../uploads/" + deleteImg[0].blockElement.imgUrl));
                        }

                        eo.blockElement.imgUrl = findImg[0].filename;
                        // console.log("Imge urls: ".blue, eo.blockElement.imgUrl);

                        // console.log("Element after updating image: ".blue, eo);
                    }
                    if (!findImg) {

                        const deleteImg = foundContent.filter((fc, fcI) => fc.rowNumber !== eo.rowNumber && fc.columnNumber !== eo.columnNumber); // DON'T NEED TO FILTER
                        // console.log("all non updated img element: ".white, eo);
                        const findResultContent = JSON.parse(findResult[0].content);
                        findResultContent.forEach((frc, frcI) => {
                            // console.log(`Element num ${eoI} - row number: ${eo.rowNumber} and col number: ${eo.rowNumber}`.yellow);

                            if (eo.rowNumber === frc.rowNumber && eo.columnNumber === frc.columnNumber) {

                                eo.blockElement.imgUrl = frc.blockElement.imgUrl;
                                console.log("frc.blockElement.imgUrl: ", frc.blockElement.imgUrl);
                            }
                        });
                        // if (findResult[0].content.blockElement.name === "imgBlockContent") {
                        //     eo.blockElement.imgUrl = findResult[0].content.blockElement;
                        // }
                    }



                }

            });
            // console.log("Element object: ", elementObject);


            // const updateSql = `UPDATE nodejs_story SET title='${title}', bg_img='${updatedBgImg}', bg_color='${bgColor}', link_color='${linkColor}', layout='${layout}', content='${JSON.stringify(elementObject)}', sibling='${sibling}' WHERE id=?`;
            const updateSql = `UPDATE nodejs_story SET title='${title}', bg_img='${updatedBgImg}', bg_color='${bgColor}', link_color='${linkColor}', layout='${layout}', content='${JSON.stringify(elementObject)}', sibling='${sibling}' WHERE id=?`;

            conn.query(updateSql, [req.params.id], (updateErr, updateResult, updateFields) => {
                if (updateErr) throw updateErr;
                console.log("Update result: ".green, updateResult);
                // DELETE PREVIOUS HEADER IMAGE 
            });




        });


        // console.log("The result is: ", JSON.parse(result[0].layout));
        // CHECK THERE IS ANY UPDATED HEADER IMAGE 
        // if (req.files['header-img']) {
        //     let updatedBgImg = req.files['header-img'][0].filename;
        //     console.log("Update header image name: ", updatedBgImg);
        //     console.log("Previous Header image name(Delete this image): ", result[0].bg_img);




        //     // const updateSql = `UPDATE `nodejs_story` SET `id`='[value-1]',`title`='[value-2]',`updated_at`='[value-5]',`bg_img`='[value-12]',`bg_color`='[value-13]',`link_color`='[value-14]',`layout`='[value-15]',`content`='[value-16]',`sibling`='[value-17]' WHERE id=?`;
        //     const updateSql = `UPDATE nodejs_story SET title=${req.body.title}, bg_img=${updatedBgImg}`;
        //     conn.query(updateSql, [req.params.id], (updateErr, updateResult, updateFields) => {
        //         console.log("Update result: ", updateResult);
        //         // DELETE PREVIOUS HEADER IMAGE 
        //         // if (updatedBgImg !== result[0].bg_img) {
        //         //     if (fs.existsSync(path.join(__dirname, "../uploads/" + updateResult[0].bg_img)) || fs.existsSync(path.join(__dirname, "../aws/" + updateResult[0].bg_img))) {
        //         //         // console.log(path.join(__dirname, "../uploads/" + updateResult[0].bg_img ));
        //         //         fs.unlinkSync(path.join(__dirname, "../uploads/" + updateResult[0].bg_img));
        //         //     }
        //         // }
        //     });
        // }
    } catch (err) {
        console.log(err);
    }


});










// DELETE FROM `nodejs_story` WHERE 0
router.delete('/delete/:id', (req, res, next) => {
    console.log("Delete request is called - ID: ".info + req.params.id);
    // FIND FOR IMAGES AND DELETE IMAGES
    // const findSql = "SELECT bg_img, content from nodejs_story WHERE id=?";
    //     const findImgResult = await conn.query(findSql, [req.params.id]);
    //     const blockContent = JSON.parse(findImgResult[0].content);
    const findSql = "SELECT bg_img, content from nodejs_story WHERE id=?";
    conn.query(findSql, [req.params.id], (findErr, findResult, findFields) => {
        if (findErr) throw findErr;
        const blockContent = JSON.parse(findResult[0].content);
        // console.log(findResult);
        // blockElement: {
        //     name: 'imgBlockContent',
        //     imgUrl: 'img-1-2-151979801-.jpeg'
        //   } 
        /*
        // DELETE BACKGROUND IMAGE  
        if (findResult[0].bg_img !== "default-header.jpg") {
            if (fs.existsSync(path.join(__dirname, "../uploads/" + findResult[0].bg_img))) {
                // console.log(path.join(__dirname, "../uploads/" + findResult[0].bg_img ));
                fs.unlinkSync(path.join(__dirname, "../uploads/" + findResult[0].bg_img));
            }
        }



        // console.log(blockContent);
        // DELETE IMAGES 
        blockContent.forEach((bCt, bctIdx) => {
            if (bCt.blockElement.name === "imgBlockContent" && bCt.blockElement.imgUrl !== "empty-image.png") {
                if (fs.existsSync(path.join(__dirname, "../uploads/" + bCt.blockElement.imgUrl))) {
                    // console.log(path.join(__dirname, "../uploads/" + bCt.blockElement.imgUrl));
                    fs.unlinkSync(path.join(__dirname, "../uploads/" + bCt.blockElement.imgUrl));
                }
                // else {
                //     console.log("file doesn't exist".red, path.join(__dirname, "../uploads"));
                // }
                // console.log(bCt);
            }
        });
        */
        deleteImages(findResult[0].bg_img, blockContent);
        // // DELETE FROM DATABASE 
        const sql = "DELETE FROM nodejs_story WHERE id=?";
        conn.query(sql, [req.params.id], (err, result, fields) => {
            if (err) throw err;
            console.log("A record is beed deleted successfully".white, result);
            res.redirect('/template');
        });
    });



});







/*
// THIS IS FOR EXPIREMENT 
// Convert from Buffer to base64.
// Convert from Buffer into an actual image.
router.get('/get-image', async (req, res, next) => {

    // BY THIS METHOD WE ARE DWONLOADING IMAGE AND SHOWING IT 
    const tempImage = await getImage("header-img-Screensho-31-1.png");


    // console.log("TempImage: ", tempImage);
    // fs.writeFile("./uploads/header.jpg", tempImage.Body, function (writeFileerr) {
    //     if (writeFileerr) throw writeFileerr;
    // });
    // res.render("file-upload", {src: "default-header.jpg"});




    // RENDERING FILE AND SENDING IMAGE TO THE CLIENT - IT'S WORKING PERFECTLY
    // // Convert base64 to buffer => <Buffer ff d8 ff db 00 43 00 ...
    // const imageUrl = Buffer.from(tempImage.Body).toString("base64"); 
    // console.log("Image url : ", imageUrl);
    // // console.log("Read stream : ",readStream);
    // let src = `data:image/png;base64,${imageUrl}` ; 
    // res.render("file-upload", { src });




    // ANOTHER WAY BY SENDING HTML AS RESPINSE - AND IT'S WORKING PERFECTLY 
    // let buf = Buffer.from(tempImage.Body);
    // let base64 = buf.toString('base64');
    // res.status(200).json({ request: 'Success' });
    // let image = "<img src='data:image/jpeg;base64," + base64 + "'" + "/>";
    // let startHTML = "<html><body></body>";
    // let endHTML = "</body></html>";
    // let html = startHTML + image + endHTML;
    // res.send(html);

});
*/















module.exports = router;