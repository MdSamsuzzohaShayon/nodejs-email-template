const express = require('express');
const path = require('path');
const fs = require('fs');
const { invalidToValidStr, getAllImage, deleteImages, deleteHeaderImage, deleteTemplateImages } = require('../utils/helper');
const {uploadMultipleFile} = require('../config/upload-file-config');
const db = require('../models');
const { temptab } = db;

const router = express.Router();



router.get('/', async (req, res, next) => {
    /**
     * render: Review all template
     * @return index page with Id and title as result
     */
    const temps = await temptab.findAll();
    res.render('template/index', { docs: [] });
});



router.get('/preview/:id', async (req, res, next) => {
    /**
     * render: Preview a single template
     * @return preview page with single temp and headerImg
     */
    const findTemp = await temptab.findOne({where: {id: req.params.id}});
    res.render('template/template-preview', { docs: 'result[0]', headerImg: 'result[0].bg_img' });
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
    let bgImg = "default-header.jpg";
    if (req.files['headerImg']) {
        bgImg = req.files['headerImg'][0].filename;
    }
    let elementObject = JSON.parse(element);

    // CHANGE IMAGE URL 
    elementObject.forEach((eo, index) => {
        // CHANGING HTML AS VALID HTML 
        eo.blockElement.blockHtml = invalidToValidStr(eo.blockElement.blockHtml);
        if (eo.blockElement.name === "imgBlockContent") {
            const findImg = req.files[`img-${eo.rowNumber}-${eo.columnNumber}`];
            if (findImg) {
                findImg.forEach((img, idx) => {
                    if (img.fieldname === `img-${eo.rowNumber}-${eo.columnNumber}`) {
                        eo.blockElement.imgUrl = img.filename;
                    }
                });
            }
        }
    });
    try {
        const newTemp = await temptab.create({
            title,
            bg_color: bgColor,
            bg_img: bgImg,
            link_color: linkColor,
            layout,
            content: JSON.stringify(elementObject),
            sibling
        });
        console.log({newTemp});
        res.redirect('/template');
    } catch (error) {
        console.log(error);
    }

});



router.get('/edit/:id', (req, res, next) => {
    /**
     * Find one template by id
     * render: edit page
     * @return edit page with a result and template id
     */
    res.render('template/edit-template', { docs: 'result[0]', templateID: req.params.id });
});



router.put('/edit/:id', uploadMultipleFile, async (req, res, next) => {
    /**
     * Find one template by id and update in the database
     * @validate data to save into the database
     * @return edit page with a result and template id
     */

    const { title, bgColor, linkColor, layout, element, sibling } = req.body;

    try {
        // DELETE PREVIOUS HEADER IMAGE 
        if (req.files['headerImg']) {
            updatedBgImg = req.files['headerImg'][0].key;
            if (findResult[0].bg_img !== "default-header.jpg") {
                const deletedH = await deleteHeaderImage(findResult[0].bg_img);
            }
        } else if (req.body.headerImg === "header-deleted") {
            // IF HEADER IS BEED DELETED 
            updatedBgImg = null;
            if (findResult[0].bg_img !== "default-header.jpg") {
                const deletedH = await deleteHeaderImage(findResult[0].bg_img);
            }
        } else {
            // IF HEADER IS NOT UPDATED 
            updatedBgImg = findResult[0].bg_img;
        }

        const delImgList = [];
        let elementObject = JSON.parse(element);
        elementObject.forEach((eo, eoI) => {
            // STRINGIFYING BUTTON ELEMENT 
            eo.blockElement.blockHtml = invalidToValidStr(eo.blockElement.blockHtml);
            // DELETE PREVIOUS FILE AND UPLOAD CURRENT ONE 
            if (eo.blockElement.name === "imgBlockContent") {
                const foundContent = JSON.parse(findResult[0].content);
                // CHECK IF THERE IS ANY IMAGE UPDATED
                const findImg = req.files[`img-${eo.rowNumber}-${eo.columnNumber}`];
                if (findImg !== undefined && findImg) {
                    const deleteImg = foundContent.filter((fc, fcI) => fc.rowNumber === eo.rowNumber && fc.columnNumber === eo.columnNumber);
                    delImgList.push({ Key: deleteImg[0].blockElement.imgUrl });
                    eo.blockElement.imgUrl = findImg[0].key;
                }
                if (!findImg) {
                    // UPDATE CONTENT 
                    const findResultContent = JSON.parse(findResult[0].content);
                    findResultContent.forEach((frc, frcI) => {
                        if (eo.rowNumber === frc.rowNumber && eo.columnNumber === frc.columnNumber) {
                            eo.blockElement.imgUrl = frc.blockElement.imgUrl;
                        }
                    });
                }
            }

        });

        // Delete previous images
        if (delImgList.length !== 0) {
            const delTempImg = await deleteTemplateImages(delImgList);
        }

        res.redirect('/template');
    } catch (err) {
        console.log(err);
    }
});

router.delete('/delete/:id', async (req, res, next) => {
    /**
     * Find one template by id and delete
     * @redirect to index page
    */
    //    const blockContent = JSON.parse(findResult[0].content);
    //    const deletedImage = await deleteImages(findResult[0].bg_img, blockContent);
    res.redirect('/template');
});























module.exports = router;