const express = require('express');
const path = require('path');
const cloudinary = require('../config/cloudinary-config');
const { promises: fsPromise } = require('fs');
const { invalidToValidStr, getAllImage, deleteImages, deleteServerImages } = require('../utils/helper');
const { uploadMultipleFile } = require('../config/upload-file-config');
const db = require('../models');
const { temptab } = db;

const router = express.Router();


const DEFAULT_HEADER_IMAGE = "default-header.jpg";
const uploadOptions = {
    folder: process.env.CLOUDINARY_API_FOLDER,
    eager: [
        { width: 400, height: 300, crop: "pad" },
        { width: 260, height: 200, crop: "crop", gravity: "north" }]
};

router.get('/', async (req, res, next) => {
    /**
     * render: Review all template
     * @return index page with Id and title as result
     */
    const temps = await temptab.findAll();
    res.render('template/index', { docs: temps });
});



router.get('/preview/:id', async (req, res, next) => {
    /**
     * render: Preview a single template
     * @return preview page with single temp and headerImg
     */
    const findTemp = await temptab.findOne({ where: { id: req.params.id } });
    if (!findTemp) return res.redirect('/template');
    res.render('template/template-preview', { docs: findTemp, headerImg: findTemp.dataValues.bg_img });
});

router.get('/editor', (req, res, next) => {
    /**
     * render: Open main editor
     * @return editor page
     */
    res.render('template/email-template');
});


router.post('/add', uploadMultipleFile, async (req, res, next) => {
    /**
     * @validate data to save into the database
     * Add a templete to the database
     * @redirect to index page
     */

    const { title, bgColor, linkColor, layout, element, sibling } = req.body;
    let bgImg = DEFAULT_HEADER_IMAGE;

    const uploadImgs = [],
        deleteImgs = [];

    if (req.files['headerImg']) {
        deleteImgs.push(req.files['headerImg'][0].filename);
        const uploadBgImg = await cloudinary.uploader.upload(__dirname + `/../uploads/${req.files['headerImg'][0].filename}`, uploadOptions);
        bgImg = `${uploadBgImg.public_id}.${uploadBgImg.format}`;
    }
    let elementObject = JSON.parse(element);


    // CHANGE IMAGE URL / IMAGE UPLOAD / IMAGE DELETE FROM SERVER
    elementObject.forEach((eo, index) => {
        // CHANGING HTML AS VALID HTML 
        eo.blockElement.blockHtml = invalidToValidStr(eo.blockElement.blockHtml);
        if (eo.blockElement.name === "imgBlockContent") {
            const findImg = req.files[`img-${eo.rowNumber}-${eo.columnNumber}`];
            if (findImg && findImg.length > 0) {
                if (findImg[0].fieldname === `img-${eo.rowNumber}-${eo.columnNumber}`) {
                    eo.blockElement.imgUrl = findImg[0].filename;
                    // Upload image to cloudinary
                    uploadImgs.push(cloudinary.uploader.upload(__dirname + `/../uploads/${findImg[0].filename}`, uploadOptions));
                    // Delete from server
                    deleteImgs.push(findImg[0].filename);
                }
            }
        }
    });


    try {
        // Upload all images at once
        const uploadImgRes = await Promise.all(uploadImgs);

        for (const ui of uploadImgRes) {
            const uploadedFileName = `${ui.public_id}.${ui.format}`;
            const fileOrginalName = ui.original_filename + '.' + ui.format;
            const fileOrginalNameJPEG = ui.original_filename + '.jpeg';



            // CHANGE IMAGE URL 
            elementObject.forEach((eo, index) => {
                if (eo.blockElement.name === "imgBlockContent" && (fileOrginalName === eo.blockElement.imgUrl || eo.blockElement.imgUrl === fileOrginalNameJPEG)) {
                    eo.blockElement.imgUrl = uploadedFileName;
                }
            });
        }

        const delTempImg = await deleteServerImages(deleteImgs);

        const newTemp = await temptab.create({
            title,
            bg_color: bgColor,
            bg_img: bgImg,
            link_color: linkColor,
            layout,
            content: JSON.stringify(elementObject),
            sibling
        });
        res.redirect('/template');
    } catch (error) {
        console.log(error);
    }

});



router.get('/edit/:id', async (req, res, next) => {
    /**
     * Find one template by id
     * render: edit page
     * @return edit page with a result and template id
     */
    const findTemp = await temptab.findOne({ where: { id: req.params.id } });
    res.render('template/edit-template', { docs: findTemp, templateID: req.params.id });
});



router.put('/edit/:id', uploadMultipleFile, async (req, res, next) => {
    /**
     * Find one template by id and update in the database
     * @validate data to save into the database
     * @return edit page with a result and template id
     */

    const findTemp = await temptab.findOne({ where: { id: req.params.id } });
    if (!findTemp) return res.redirect('/template');
    const copyTemp = structuredClone(findTemp.dataValues);

    const { title, bgColor, linkColor, layout, element, sibling } = req.body;
    let updatedBgImg = null

    try {
        const deleteImgs = [],
            deleteServerImgs = [],
            uploadImgs = [];
        // DELETE PREVIOUS HEADER IMAGE 
        if (req.files['headerImg']) {
            const uploadBgImg = await cloudinary.uploader.upload(__dirname + `/../uploads/${req.files['headerImg'][0].filename}`, uploadOptions);
            updatedBgImg = `${uploadBgImg.public_id}.${uploadBgImg.format}`;
            deleteServerImgs.push(req.files['headerImg'][0].filename);
            if (copyTemp.bg_img !== DEFAULT_HEADER_IMAGE) {
                deleteImgs.push(copyTemp.bg_img.split('.')[0]);
            }
        } else if (req.body.headerImg === "header-deleted") {
            // IF HEADER IS BEED DELETED 
            if (findTemp.bg_img !== DEFAULT_HEADER_IMAGE) {
                deleteImgs.push(copyTemp.bg_img.split('.')[0]);
            }
        } else {
            // IF HEADER IS NOT UPDATED 
            updatedBgImg = findTemp.bg_img;
        }

        let elementObject = JSON.parse(element);
        elementObject.forEach((eo, eoI) => {
            // STRINGIFYING BUTTON ELEMENT 
            eo.blockElement.blockHtml = invalidToValidStr(eo.blockElement.blockHtml);
            // DELETE PREVIOUS FILE AND UPLOAD CURRENT ONE 
            const findResultContent = JSON.parse(copyTemp.content);
            if (eo.blockElement.name === "imgBlockContent") {
                // CHECK IF THERE IS ANY IMAGE UPDATED
                const findImg = req.files[`img-${eo.rowNumber}-${eo.columnNumber}`];
                if (findImg !== undefined && findImg) {
                    eo.blockElement.imgUrl = findImg[0].filename;
                    // FIND PREVIOUS IMAGE AND DELETE
                    const deleteBlockImages = findResultContent.map((fc, fcI) => { if (fc.rowNumber === eo.rowNumber && fc.columnNumber === eo.columnNumber) return fc.blockElement.imgUrl.split('.')[0] });
                    // UPLOAD NEW IMAGE AND SAVE FILE NAME
                    uploadImgs.push(cloudinary.uploader.upload(__dirname + `/../uploads/${findImg[0].filename}`, uploadOptions));
                    deleteImgs.push(deleteBlockImages[0]);
                    deleteServerImgs.push(findImg[0].filename);
                }
                if (!findImg) {
                    // UPDATE CONTENT 
                    findResultContent.forEach((frc, frcI) => {
                        if (eo.rowNumber === frc.rowNumber && eo.columnNumber === frc.columnNumber) {
                            eo.blockElement.imgUrl = frc.blockElement.imgUrl;
                        }
                    });
                }
            }

        });

        // Upload all images at once
        const uploadImgRes = await Promise.all(uploadImgs);
        for (const ui of uploadImgRes) {
            const uploadedFileName = `${ui.public_id}.${ui.format}`;
            const fileOrginalName = ui.original_filename + '.' + ui.format;
            const fileOrginalNameJPEG = ui.original_filename + '.jpeg';

            // CHANGE IMAGE URL 
            elementObject.forEach((eo, index) => {
                if (eo.blockElement.name === "imgBlockContent" && (fileOrginalName === eo.blockElement.imgUrl || eo.blockElement.imgUrl === fileOrginalNameJPEG)) {
                    eo.blockElement.imgUrl = uploadedFileName;
                }
            });
        }

        // delete previous images from cloudinary 
        if (deleteImgs.length > 0) {
            const deletedImage = await deleteImages(deleteImgs);
        }

        // Delete server images
        if (deleteServerImgs.length !== 0) {
            const delTempImg = await deleteServerImages(deleteServerImgs);
        }

        // Update
        await findTemp.update({ title, bgColor, bg_img: updatedBgImg, linkColor, layout, content: JSON.stringify(elementObject), sibling });

        res.redirect('/template');
    } catch (err) {
        console.log(err);
    }
});

router.delete('/delete/:id', async (req, res, next) => {
    /**
     * Find one template by id and delete
     * Delete images from cloudinary as well
     * @redirect to index page
    */
    const findTemp = await temptab.findOne({ where: { id: req.params.id } });
    if (!findTemp) return res.redirect('/template');

    const blockContent = JSON.parse(findTemp.content);
    const imgUrlList = blockContent.map((block) => { if (block.blockElement.name === 'imgBlockContent') return block.blockElement.imgUrl.split('.')[0] });
    const newImgUrlList = [...imgUrlList];
    if (findTemp.dataValues.bg_img !== DEFAULT_HEADER_IMAGE) newImgUrlList.push(findTemp.dataValues.bg_img.split('.')[0]);
    const deletedImage = await deleteImages(newImgUrlList);

    await findTemp.destroy();
    res.redirect('/template');
});























module.exports = router;