


// EXTRA HELPING FUNCTIONS START
// HELPING FUNCTION 2
const imgUploadHandler = (imgFile, imgSrcUrl) => {


    // if (selectedRow !== null && selectedCol !== null && !templateSelected) {
    // FOR ANY IMAGES INSIDE TEMPLATE 
    if (imgFile) {
        // console.log("Imge file: ", imgFile);
        // console.log("rc: ", selectedRow, selectedCol);
        if (imgFile.size > 2097152) { // 2 MiB for bytes.
            alert("File size must under 2MiB!");
            return;
        } else {
            if (imgFile.type == "image/jpeg" || imgFile.type == "image/jpg" || imgFile.type == "image/png" || imgFile.type == "image/gif") {
                const reader = new FileReader();
                // FOR SHOWING TEMPLATE IMAGE ON RIGHT PREVIEW BAR 
                if (selectedRow !== null && selectedCol !== null && !templateSelected) {
                    // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
                    reader.addEventListener('load', function (le) {
                        // console.log("target: ", le.target);
                        imgSrcUrl.forEach((isu, i) => setAttributes(isu, { 'src': le.target.result }));
                        positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { pl.blockElement.imgUrl = le.target.result; } });
                    });
                    reader.readAsDataURL(imgFile);
                    // console.log("img-" + selectedRow + '-' + selectedCol);
                    formData.append("img-" + selectedRow + '-' + selectedCol, imgFile);
                    // formData.append("img-1-1", imgFile);
                } else {
                    // FOR SHOWING HEADER IMAGE ON RIGHT PREVIEW BAR 
                    reader.addEventListener('load', function (le) {
                        imgSrcUrl.forEach((isu, i) => setAttributes(isu, { 'src': le.target.result }));
                    });
                    reader.readAsDataURL(imgFile);
                    console.log("img-" + selectedRow + '-' + selectedCol);
                    formData.append("header-img", imgFile);
                }
            } else {
                alert('Use a supported image file (.png / .jpeg / .gff / .jpg )');
            }
        }
    } else {
        console.log('no img');
    }
    // } else {
    //     // FOR HEADER IMAGES  
    //     if (imgFile) {
    //         // console.log("rc: ", selectedRow, selectedCol);
    //         if (imgFile.type == "image/jpeg" || imgFile.type == "image/jpg" || imgFile.type == "image/png" || imgFile.type == "image/gif") {
    //             const reader = new FileReader();
    //             reader.addEventListener('load', function (le) {
    //                 imgSrcUrl.forEach((isu, i) => setAttributes(isu, { 'src': le.target.result }));
    //             });
    //             reader.readAsDataURL(imgFile);
    //             console.log("img-" + selectedRow + '-' + selectedCol);
    //             formData.append("header-img", imgFile);
    //         } else {
    //             alert('Use a supported image file (.png / .jpeg / .gff / .jpg )');
    //         }
    //     } else {
    //         console.log('no img');
    //     }
    // }
}

// HELPING FUNCTION 3
function setAttributes(el, attrs) {
    for (let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}




// HELPING FUNCTION 4
function createAllIcon(outerElement) {
    for (let i = 0; i < 3; i++) {
        console.log(i);
        currentIcon = `<img src="${iconList[i]}">`;
        iconBlockElement.innerHTML = currentIcon;
        outerElement.innerHTML = iconBlockElement;
    }
}

// HELPING FUNCTION 5
function convertRowIdToNumber(rowElementId) {
    const findRowNum = rowElementId.toString().split('-');
    let rowNumber = parseInt(findRowNum[1]);
    // console.log("Row number: ", rowNumber);
    // switch (rowElementId) {
    //     case 'row-1':
    //         rowNumber = 1;
    //         break;
    //     case 'row-2':
    //         rowNumber = 2;
    //         break;
    //     case 'row-3':
    //         rowNumber = 3;
    //         break;
    //     default:
    //         break;
    // }
    return rowNumber;
}
// HELPING FUNCTION 6
function convertColIdToNumber(colElementId) {
    switch (colElementId) {
        case 'one-col-0':
            columnNumber = 1;
            break;
        case 'two-col-0':
            columnNumber = 1;
            break;
        case 'two-col-1':
            columnNumber = 2;
            break;
        case 'three-col-0':
            columnNumber = 1;
            break;
        case 'three-col-1':
            columnNumber = 2;
            break;
        case 'three-col-2':
            columnNumber = 3;
            break;

        default:
            break;
    }
    return columnNumber;
}




// HELPING FUNCTION 8 
const stringIdToIdNum = (stringText, arrNum) => {
    let rowNumString = stringText.toString();
    let findFromArr = rowNumString.split('-');
    // console.log("Finding from array: ", findFromArr);
    let numVal = parseInt(findFromArr[arrNum]);
    return numVal;
}

// HELPING FUNCTION 9 
const getNextAllElement = element => {
    const nextAllFound = [];
    const getAll = element => {
        if (element !== null) {
            nextAllFound.push(element);
            const nextFound = element.nextElementSibling;
            if (nextFound !== null) {
                getAll(nextFound);
            }
        }
    };
    getAll(element.nextElementSibling);
    return nextAllFound;
};





// HELPING CLASS 
const resizeObserver = new ResizeObserver(e => {
    // console.log("E: ", e);
    // console.log("target: ", e[0].target);
    // console.log("target.parentElement.parentElement : ", e[0].target.parentElement.parentElement);
    // console.log("Content Reactangle: ", e[0].contentRect);
    try {
        if (e[0].contentRect.height > 172) {
            e[0].target.parentElement.parentElement.style.height = `fit-content`;
        }
        // if (e[0].target.classList[1] === "icon-content-block") {
        //     e[0].target.parentElement.parentElement.style.height = '8em';
        // }

        // icon-content-block
    } catch (err) {
        console.log(err);
    }

});






// HELPING FUNCTION 10 
function invalidToValidHtml(invalidString) {
    let blockElementString = invalidString.toString();
    let newHtmlBlock = blockElementString.replace(/~_/g, "'");
    let validString = newHtmlBlock;
    return validString;
}
// HELPING FUNCTION 11
function rowIdToNum(rowId) {
    // 'two-col-0'
    let rowIdNum = null;
    const findId = rowId.split('-');
    switch (findId[0]) {
        case 'one':
            rowIdNum = 1;
            break;
        case 'two':
            rowIdNum = 2;
            break;
        case 'three':
            rowIdNum = 3;
            break;

        default:
            break;
    }
    return rowIdNum;
}



// HELPING FUNCTION 12
function rowNumToStr(rowIdInNum) {
    // 'two-col-0'
    let rowIdStr = null;
    switch (rowIdInNum) {
        case 1:
            rowIdStr = 'one';
            break;
        case 2:
            rowIdStr = 'two';
            break;
        case 3:
            rowIdStr = 'three';
            break;

        default:
            break;
    }
    return rowIdStr;
}


// HELPING FUNCTION 13 
const stringToNodes = html => new DOMParser().parseFromString(html, 'text/html').body.childNodes[0];


// HELPING FUNCTION 14 
// PROTOCAL VALIDATE 
const protocalValidate = (hyperlink) => {
    let validatedLink = null;
    const pvProtocol = hyperlink.toString().trim().substring(0, 7);
    if (pvProtocol === "http://" || pvProtocol === "https://") {
        validatedLink = hyperlink;
    } else {
        validatedLink = "http://" + hyperlink;
    }
    return validatedLink;
}








// HELPING FUNCTIONS 16
const createSocialIcons = (pvIcons, socialFbHyperlink, socialTwitterHyperlink, socialInstagramHyperlink) => {
    const iconLinkList = [socialFbHyperlink, socialTwitterHyperlink, socialInstagramHyperlink];
    const srcList = new Array("/icon/facebook.png", "/icon/twitter.png", "/icon/instagram.png");
    for (let i = 0; i < 3; i++) {
        const pvFbLink = document.createElement('a');
        setAttributes(pvFbLink, { "class": "social-icon-content", "href": `${iconLinkList[i]}` });
        const pvFbIconImg = document.createElement('img');
        setAttributes(pvFbIconImg, { "class": "social-icon-img", "src": `${srcList[i]}` });
        pvFbLink.appendChild(pvFbIconImg);
        pvIcons.appendChild(pvFbLink);
    }
    /*
    const pvFbLink = document.createElement('a');
    setAttributes(pvFbLink, { "class": "social-icon-content", "href": `${socialFbHyperlink}` });
    const pvFbIconImg = document.createElement('img');
    setAttributes(pvFbIconImg, { "class": "social-icon-img", "src": "/icon/facebook.png" });
    pvFbLink.appendChild(pvFbIconImg);
    pvIcons.appendChild(pvFbLink);

    const pvTwiterLink = document.createElement('a');
    setAttributes(pvTwiterLink, { "class": "social-icon-content", "href": `${socialTwitterHyperlink}` });
    const pvTwitterIconImg = document.createElement('img');
    setAttributes(pvTwitterIconImg, { "class": "social-icon-img", "src": "/icon/twitter.png" });
    pvTwiterLink.appendChild(pvTwitterIconImg);
    pvIcons.appendChild(pvTwiterLink);


    const pvInstaLink = document.createElement('a');
    setAttributes(pvInstaLink, { "class": "social-icon-content", "href": `${socialInstagramHyperlink}` });
    const pvInstaIconImg = document.createElement('img');
    setAttributes(pvInstaIconImg, { "class": "social-icon-img", "src": "/icon/instagram.png" });
    pvInstaLink.appendChild(pvInstaIconImg);
    pvIcons.appendChild(pvInstaLink);
    */
    return pvIcons;
}
// HELPING FUNCTION 17
function replaceAt(str, index, newChar) {
    function replacer(origChar, strIndex) {
        if (strIndex === index)
            return newChar;
        else
            return origChar;
    }
    return str.replace(/./g, replacer);
}



// HELPING FUNCTION 17
const imgKeyToLink = imgKey => `https://email-template-nodejs.s3.ca-central-1.amazonaws.com/${imgKey}`;
// EXTRA HELPING FUNCTIONS ENDS



export {
    resizeObserver, // class
    imgUploadHandler,
    setAttributes,
    createAllIcon,
    convertRowIdToNumber,
    convertColIdToNumber,
    stringIdToIdNum,
    getNextAllElement,
    invalidToValidHtml,
    rowIdToNum,
    rowNumToStr,
    stringToNodes,
    protocalValidate,
    createSocialIcons,
    replaceAt,
    imgKeyToLink
}








