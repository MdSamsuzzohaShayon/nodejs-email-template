// USING THE RIGHT CODE FOR RIGHT PAGE THIS IS VERY IMPORTANT 
const findPath = window.location.pathname.toString().split('/');
const currentPath = findPath[2];
const editPage = "edit", previewPage = "preview", editorPage = "editor", templateIndex = findPath[1];




const templateBuilder = document.getElementById('template-builder');

// EDITOR PAGE VARIABLES START 
const submitSpinner = document.getElementById('submit-spinner');
// TITLE 
const inputTitle = document.getElementById('title');
const saveButton = document.getElementById('save-btn');
const cancelButton = document.getElementById('cancel-btn');

// HEADER IMAGE 
const headerImgInput = document.getElementById('header-img-input');
const headerImage = document.getElementById('header-img');
const headerImgPreview = document.getElementById('header-img-preview');

// TEMPLATE COLOR 
const templateWrapper = document.querySelector('.template-wrapper');
const templateBGColorInput = document.getElementById('t-bg-color');
const templateLinkColorInput = document.getElementById('t-link-color');
const links = document.getElementsByTagName('a');

// DRAG AND DROP COLUMN ELEMENT 
const draggableColumn = document.querySelectorAll('.block-col');
const dropColumnZone = document.getElementById('drop-zone');

// DRAGABLE CONTENT BLOCK 
const contentBlockCol = document.querySelectorAll('.content-block-col');

// WHOLE RIGHT BAR 
const rightBar = document.querySelector('.right-bar');
const rightBarContent = document.getElementById('br-content');

const deleteHeaderImg = document.getElementById('delete-header-img');

// RIGHT BAR ELEMENT TO SHOW AND HIDE 
const propertiesBar = document.getElementById('rb-props');
const blockElementBar = document.getElementById('rb-block');
// SELECTING ALL ELEMENT AT ALL 
const allProperties = document.querySelectorAll('.props');



// ROW PROPS 
const rowProps = document.querySelector('.row-props');
const rowMoveUp = document.getElementById('row-move-up'),
    rowMoveDown = document.getElementById('row-move-down'),
    rowDelete = document.getElementById('row-delete');

// TEXT PROPS 
const txtProps = document.querySelector('.txt-props');
const alignBtn = document.querySelectorAll('.txt-align-btn');
const txtFontFamily = document.getElementById('txt-font-family');
const txtFontSize = document.getElementById('txt-font-size');
const txtStyle = document.querySelectorAll('.txt-btn-style');
const txtHyperlink = document.getElementById('txt-link');
const txtNewTab = document.getElementById('txt-new-tab');


// BUTTON PROPS 
const btnProps = document.querySelector('.btn-props');
const btnBGColorInput = document.getElementById('btn-color'),
    btnTxtColorInput = document.getElementById('btn-font-color'),
    btnFontFamilyInput = document.getElementById('btn-font-family'),
    btnFontSizeInput = document.getElementById('btn-font-size'),
    btnTextContentInput = document.getElementById('btn-text'),
    btnHyperlinkInput = document.getElementById('btn-hyperlink'),
    btnShapeInput = document.getElementById('btn-shape'),
    btnNewTabInput = document.getElementById('btn-new-tab');
const btnAlignElement = document.querySelectorAll('.btn-align');

// SOCIAL PROPS 
const socialProps = document.querySelector('.social-props');
const fbLinkInput = document.getElementById('fb-link'),
    twitterLinkInput = document.getElementById("twitter-link"),
    instagramLinkInput = document.getElementById("instagram-link");

// SPACE PROPS 
const spxProps = document.querySelector('.spx-props');
const spxHeightInput = document.getElementById('spx-height');



// SELECT ELEMENT FOR IMAGE UPLOAD AND PREVIEW HANDLER 
const imgProps = document.querySelector('.img-props');
const inputImg = document.getElementById('img-input'),
    previewImg = document.getElementById('img-preview'),
    imgLink = document.getElementById('img-link'),
    imgNewTab = document.getElementById('img-new-tab');



// WEBSITE DEFAULT URL OPERATION 
let websiteDomain = "http://" + window.location.host, defaultFbLink = 'fb.com/md.shayon.148', defaultTwitterLink = 'twitter.com/shayon_md', defaultInstaLink = 'https://www.instagram.com/md_shayon/';

// DATABASE DESIGN START 
// THIS SOULD BE ADD TO THE DATABASE - COUNT ROW AND COLUMNS 
// TITLE OF THE TEMPLATE 
let title = "Untitle";
let submitted = false;
// THIS ROW LIST WOULD BE ANOTHER DATABASE TABLE 
let rowList = []; // THIS IS FOR TRACKING ROW DETAIL - FOR EXAMPLE - FIRST ROW WITH 3 COLUMN, 2ND ROW WITH ONE COLUMN, 3RD COLUMN WITH 2 COLUMN
let rowID = 1; // AUTO INCREMENT
let rowWithColumn;  // WHICH ROW IS SELECTING , 1 COLUMN ROW , 2 COLUMN ROW OR 3 COLUMN ROW
let positionElement = [];   // THIS IS FOR TRACKING WHICH WHICH BLOCK ELEMENT IS HOLDING WHICH POSITION - FOR EXAMPLE IMAGE HOLDER IS TAKING ROW-2 AND COLUMN 2
let siblingButtonList = new Array();
let imgRowCng = new Array();

// FORM DATA 
const formData = new FormData();
// DATABASE DESIGN ENDS 

// TEMPORARY GLOBAL VARIABLES 
// WHEN SOMEONE CLICK ON BLOCK ELEMENT IT CAN ASSIGNED WITH ROW NUMBER AND COL NUMBER 
let selectedRow = null;
let selectedCol = null;
let templateSelected = true;
let selectedAfterRow = null;

// IMAGE 
let imgDefaultUrl = "/icon/picture.png";
let imageBlockElment = null;

//TEXT
let text = null;
// let txtBlockElement = null;

// BUTTON 
let btnDefaultTxt = "Preview";
let btnBlockElement = null;

//SOCIAL
let fb_icon = '/icon/facebook.png';
let twitter_icon = '/icon/twitter.png';
let instagram_icon = '/icon/instagram.png';
let iconLink = '#';
let iconBlockElement = null;
let currentUploadedImageUrl = null;
// EDITOR PAGE VARIABLES ENDS 








// DYNAMIC STYLING START
let increaseDZHeight = 200;
// DYNAMIC STYLING ENDS 





// EXTRA HELPING FUNCTIONS START
// HELPING FUNCTION 2
const imgUploadHandler = (imgFile, imgSrcUrl) => {


    // if (selectedRow !== null && selectedCol !== null && !templateSelected) {
    // FOR ANY IMAGES INSIDE TEMPLATE 
    if (imgFile) {
        // //console.log("Imge file: ", imgFile);
        // //console.log("rc: ", selectedRow, selectedCol);
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
                        // //console.log("target: ", le.target);
                        imgSrcUrl.forEach((isu, i) => setAttributes(isu, { 'src': le.target.result }));
                        positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { pl.blockElement.imgUrl = le.target.result; } });
                    });
                    reader.readAsDataURL(imgFile);
                    // //console.log("img-" + selectedRow + '-' + selectedCol);
                    formData.append("img-" + selectedRow + '-' + selectedCol, imgFile);
                    // formData.append("img-1-1", imgFile);
                } else {
                    headerImgPreview.style.display = 'inline-block';
                    deleteHeaderImg.style.display = 'inline-block';
                    headerImage.style.display = "block";
                    // FOR SHOWING HEADER IMAGE ON RIGHT PREVIEW BAR 
                    reader.addEventListener('load', function (le) {
                        imgSrcUrl.forEach((isu, i) => setAttributes(isu, { 'src': le.target.result }));
                    });
                    reader.readAsDataURL(imgFile);
                    //console.log("img-" + selectedRow + '-' + selectedCol);
                    formData.append("headerImg", imgFile);
                }
            } else {
                alert('Use a supported image file (.png / .jpeg / .gff / .jpg )');
            }
        }
    } else {
        //console.log('no img');
    }
    // } else {
    //     // FOR HEADER IMAGES  
    //     if (imgFile) {
    //         // //console.log("rc: ", selectedRow, selectedCol);
    //         if (imgFile.type == "image/jpeg" || imgFile.type == "image/jpg" || imgFile.type == "image/png" || imgFile.type == "image/gif") {
    //             const reader = new FileReader();
    //             reader.addEventListener('load', function (le) {
    //                 imgSrcUrl.forEach((isu, i) => setAttributes(isu, { 'src': le.target.result }));
    //             });
    //             reader.readAsDataURL(imgFile);
    //             //console.log("img-" + selectedRow + '-' + selectedCol);
    //             formData.append("header-img", imgFile);
    //         } else {
    //             alert('Use a supported image file (.png / .jpeg / .gff / .jpg )');
    //         }
    //     } else {
    //         //console.log('no img');
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
        //console.log(i);
        currentIcon = `<img src="${iconList[i]}">`;
        iconBlockElement.innerHTML = currentIcon;
        outerElement.innerHTML = iconBlockElement;
    }
}

// HELPING FUNCTION 5
function convertRowIdToNumber(rowElementId) {
    const findRowNum = rowElementId.toString().split('-');
    let rowNumber = parseInt(findRowNum[1]);
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


// HELPING FUNCTION 10 
function invalidToValidHtml(invalidString) {
    let blockElementString = invalidString.toString();
    let newHtmlBlock = blockElementString.replace(/~_/g, '"');
    let validString = newHtmlBlock.replace(/_~/g, "'");
    let validHTML = validString.replace(/-_/g, "?");
    return validHTML;
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
    if (pvProtocol === "http://" || pvProtocol === "https:/") {
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



// HELPING FUNCTION 18
const pasteAndFormatText = (docElement, txtBlockElement) => {
    // CHANGING TEXT EVENT 
    docElement.addEventListener('input', e => {
        if (e.inputType.toString() === "insertFromPaste") {
            const selector = e.target.querySelectorAll('[style]');
            selector.forEach((se, i) => {
                se.style.height = "100%";
                se.style.width = "100%";
                se.style.background = "transparent";
                se.style.overflow = "hidden";
                se.style.padding = "auto 0";
                se.style.margin = "auto 0";
            });
        }

        txtBlockElement = e.target.outerHTML;
        positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].blockElement.blockHtml = txtBlockElement; } });
    });
}



// HELPING FUNCTIONS 19 
const getAllParentNode = (targetedElement) => {
    let a = targetedElement;
    let els = [];
    while (a) {
        els.unshift(a);
        a = a.parentNode;
    }
    return els;
}



// HELPING FUNCTION 20 
const createColWithRow = (dropableColumn, rowNum, newRow) => {
    switch (dropableColumn) {
        case 'col-1-grid':
            // ADD 1 COLUMN INSIDE A DIV
            const oneColumnDiv = document.createElement('div');
            setAttributes(oneColumnDiv, { "class": "one-column-div", "id": `one-col-0-${rowNum}` });
            setAttributes(newRow, { "class": "drop-row", "id": `row-${rowNum}` });
            newRow.appendChild(oneColumnDiv);
            rowWithColumn = 1;
            return { newRow, rowWithColumn };
        case 'col-2-grid':
            // ADD 2 COLUMN INSIDE A DIV 
            for (let i = 0; i < 2; i++) {
                const twoColumnDiv = document.createElement('div');
                setAttributes(twoColumnDiv, { "class": "two-column-div", "id": `two-col-${i}-${rowNum}` });
                setAttributes(newRow, { "class": "drop-row", "id": `row-${rowNum}` });
                newRow.appendChild(twoColumnDiv);
                rowWithColumn = 2;
            }
            return { newRow, rowWithColumn };
        case 'col-3-grid':
            // ADD 3 COULMN INSIDE A DIV
            for (let i = 0; i < 3; i++) {
                rowWithColumn = 3;
                const threeColumnDiv = document.createElement('div');
                setAttributes(threeColumnDiv, { "class": "three-column-div", "id": `three-col-${i}-${rowNum}` });
                setAttributes(newRow, { "class": "drop-row", "id": `row-${rowNum}` });
                newRow.appendChild(threeColumnDiv);
            }
            return { newRow, rowWithColumn };

        default:
            dropableColumn = null;
            break;
    };

}




// HELPING FUNCTIONS 21 
const dropBelowOrAbove = (highlightedElement, event) => {
    let insertAfter;
    elementHeight = highlightedElement.offsetHeight;
    // GETTING ELEMENT HEIGHT 
    let rect = highlightedElement.getBoundingClientRect();
    const y = event.clientY - rect.top;
    let middleOfY = elementHeight / 2;
    if (y > middleOfY) {
        insertAfter = true;
    }
    if (y < middleOfY) {
        insertAfter = false;
    }
    return insertAfter;
}



// HELPING FUNCTION 22
function changeBlockID(cBlockEle, cIndex, cRowNum, cSelectedRow) {
    if (cBlockEle.tagName.toString().toLowerCase() === "a") {
        // img-3-2
        let contentId = cBlockEle.childNodes[0].id.toString();
        // console.log("content id - ", contentId);
        const gotImgCol = stringIdToIdNum(contentId, 1);
        contentId = contentId.substring(0, cIndex) + cRowNum + contentId.substring(cIndex + 1);
        cBlockEle.childNodes[0].setAttribute("id", contentId);

        /*
        // REFERANCE FOR TRACKING IMAGE 
        if (imgRowCng.length === 0) {
            imgRowCng.push({ imgRow: cRowNum, imgCol: gotImgCol, cngImg: false });
        } else {
            imgRowCng.forEach((irc, ircI) => {
                if (irc.imgRow === cSelectedRow) {
                    return irc.imgRow = cRowNum;
                } else {
                    return imgRowCng.push({ imgRow: cRowNum, imgCol: gotImgCol, cngImg: false });
                }
            });
        }
        */
    } else {
        let contentId = cBlockEle.id.toString();
        if (cBlockEle.classList[1] === "icon-content-block") cIndex++;
        contentId = contentId.substring(0, cIndex) + cRowNum + contentId.substring(cIndex + 1);
        cBlockEle.setAttribute("id", contentId);
    }
}


// HELPING FUNCTION 23 
const changeAllNextElementAttribute = (cTargetedRowElement, cRowNum, cSelectedRow) => {
    const cNextEles = getNextAllElement(cTargetedRowElement);
    const cAllNextEles = [cTargetedRowElement, ...cNextEles];
    cAllNextEles.forEach((ane, i) => {
        cRowNum++;
        setAttributes(ane, { "id": `row-${cRowNum}` });
        if (ane.hasChildNodes()) {
            ane.childNodes.forEach((anec, ic) => {
                if (anec.hasChildNodes()) {
                    anec.childNodes.forEach((anecc, cci) => {
                        let idIdx = 4;
                        changeBlockID(anecc, idIdx, cRowNum, cSelectedRow);
                    });
                }
            });
        }
    });
}

// HELPING FUNCTION 24 
function cngDbForInsert(cRowNum, cRowWithColumn, cRowID) {
    rowList.forEach((nrl, nIdx) => {
        if (nrl.rowID > cRowNum) {
            nrl.rowID = nrl.rowID + 1;
        };
    });
    rowList.splice(cRowNum, 0, { rowID: cRowNum + 1, rowWithColumn: cRowWithColumn });
    positionElement.forEach((npe, npeI) => {
        if (npe.rowNumber > cRowNum) {
            npe.rowNumber = npe.rowNumber + 1;
        }
    });
    cRowID++;
}




// EXTRA HELPING FUNCTIONS ENDS










// HELPING CLASS 
const resizeObserver = new ResizeObserver(e => {
    // console.log("E- Height - ", e[0].contentRect.height);
    const dropRows = dropColumnZone.querySelectorAll('.drop-row');
    if (dropRows) {
        let allRowHeight = 0;
        dropRows.forEach((dr, i) => {
            // console.log(`Drop row height -${i}- ${dr.clientHeight}`);
            allRowHeight += dr.clientHeight;
        });
        // console.log("all row height - ", allRowHeight);
        let diferanceHeight = e[0].contentRect.height - allRowHeight;
        // console.log("diferance height - ", diferanceHeight);
        if (diferanceHeight < 127) {
            // console.log("ele that need to change height - ", dropColumnZone);
            let newHeight = allRowHeight + 127;
            // console.log("New height - ", newHeight);
            dropColumnZone.style.minHeight = newHeight + "px";
            // dropColumnZone.style.minHeight = allRowHeight + (127 - diferanceHeight);
        }
    }
    try {
        if (e[0].contentRect.height > 172) {
            // console.log("Height - ", e[0].contentRect.height );
            e[0].target.parentElement.parentElement.style.height = `fit-content`;
        }
    } catch (err) {
        console.log(err);
    }

});

// // console.log(templateWrapper.clientHeight);

// // console.log(dropColumnZone.clientHeight); // 798 = 50em // 1em = 15.96 // row height = 8em




























// MAIN FUNCTION 1
function columnDragAndDrop() {
    let dropableColumn = null;
    let colDragging = false;

    // DRAG COLUMN 
    draggableColumn.forEach((column, index) => {
        column.addEventListener('dragstart', (e) => {
            colDragging = true;
            if (colDragging) {
                switch (e.toElement.classList[1].toString()) {
                    case 'col-1-grid':
                        dropableColumn = "col-1-grid";
                        break;
                    case 'col-2-grid':
                        dropableColumn = "col-2-grid";
                        break;
                    case 'col-3-grid':
                        dropableColumn = "col-3-grid";
                        break;
                    default:
                        dropableColumn = null;
                        break;
                };
            }
        });
    });

    // DRAG SPACE 
    contentBlockCol.forEach((blockCol, index) => {
        // DRAGABLE BLOCK
        blockCol.addEventListener('dragstart', (e) => {
            if (e.toElement.classList[1] === "spx-holder") {
                dropableColumn = "space-row-grid";
            }
        });
    });

    // DROPZONE EVENTS START 
    // dropColumnZone.addEventListener("dragover", function (e) {
    //     // dropColumnZone
    //     if (e.toElement.className === "drop-wrapper") {
    //         // e.toElement.classList.add('add-border'); // ADD BORDER
    //     }
    //     e.preventDefault();
    // }, false);


    dropColumnZone.addEventListener('drop', e => {
        // e.target.className === "drop-row" || e.target.parentElement.className === 'drop-row' || e.target.parentElement.parentElement.className === "drop-row" || e.target.parentElement.parentElement.parentElement.className === "drop-row"
        let newDiv = document.createElement('div');
        // COLUMN ARE ONLY ABLE TO DROP INTO DROP ZONE (ID)
        if (colDragging) {

            // PREVENT TO ADD MORE THAN 9 ROW 
            if (rowID <= 9) {
                // INCREASE HEIGHT OF WHOLE DROP ZONE 
                // if (rowList.length >= 2) {
                //     dropColumnZone.style.minHeight = `${dropColumnZone.clientHeight + increaseDZHeight}px`;
                // }
                // dropColumnZone.style.height = "100%"; // IN PREVIEW
                if (dropableColumn === "col-1-grid" || dropableColumn === "col-2-grid" || dropableColumn === "col-3-grid") {



                    // ADD BELOW OR ABOVE ANODER DIV START

                    // console.log("targeted element - ", e.target);
                    let targetedRowElement = null;

                    for (let f of getAllParentNode(e.target)) {
                        if (f.className !== undefined) {
                            // if (f.className === "drop-wrapper") {
                            //     console.log("parent element - ", f);
                            // }
                            if (f.className === "drop-row") {
                                // console.log("targeted row - ", f);
                                targetedRowElement = f;
                            }

                        }
                    }



                    if (targetedRowElement !== null) {
                        elementHeight = targetedRowElement.offsetHeight;
                        // GETTING ELEMENT HEIGHT 
                        let rect = targetedRowElement.getBoundingClientRect();
                        const y = e.clientY - rect.top;
                        let middleOfY = elementHeight / 2;
                        let rowNum = stringIdToIdNum(targetedRowElement.id, 1);
                        if (y > middleOfY) {

                            // console.log("After - Y - " + y + " MiddleOfY -" + middleOfY);
                            const { newRow, rowWithColumn } = createColWithRow(dropableColumn, rowNum, newDiv);
                            // console.log("No of col - ", rowWithColumn);
                            // console.log("row - ", newRow);
                            targetedRowElement.after(newRow);
                            const changeRowAttr = rowNum - 1;
                            changeAllNextElementAttribute(targetedRowElement, changeRowAttr, selectedRow);
                            // rowList, positionElement, sibling
                            // const months = ['Jan', 'March', 'April', 'June'];
                            // months.splice(1, 0, 'Feb');
                            // splice(start, deleteCount, item1)
                            // const nextRowList = rowList.filter((nrl, ni) => nrl.rowID > rowNum);
                            cngDbForInsert(rowNum, rowWithColumn, rowID);
                        }
                        if (y < middleOfY) {
                            // console.log("Before - Y - " + y + " MiddleOfY -" + middleOfY + " Row with col - ");
                            const { newRow, rowWithColumn } = createColWithRow(dropableColumn, rowNum, newDiv);
                            // console.log("No of col - ", rowWithColumn);
                            // console.log("row - ", newRow);
                            dropColumnZone.insertBefore(newRow, targetedRowElement);
                            // CHANGE ATTRIBUTES FOR NEXT ELEMENTS 
                            const changeRowAttr = rowNum;
                            changeAllNextElementAttribute(targetedRowElement, changeRowAttr, selectedRow);
                            let cngRowDb = changeRowAttr - 1;
                            cngDbForInsert(cngRowDb, rowWithColumn, rowID);

                        }
                        rowNum = null;
                    } else {
                        const { newRow, rowWithColumn } = createColWithRow(dropableColumn, rowID, newDiv);
                        // console.log("No of col - ", rowWithColumn);
                        // console.log("row - ", newRow);







                        dropColumnZone.appendChild(newRow);
                        rowList.push({ rowID, rowWithColumn });
                        // EVERYTIME WHEN WE ADD A ROW WE WILL ADD 1
                        rowID++;

                        // MAKE DROPABLE COLUMN NULL ONCE AGAIN SO IT WILL CHECK THE NEXT ITEM 
                        dropableColumn = null;
                        targetedRowElement = null;
                        // ADD BELOW OR ABOVE ANODER DIV  END
                    }


                }

            } else {
                alert("You can't add more than 9 row");
            }





        }
        // DROP SPACE 
        if (dropableColumn === 'space-row-grid') {
            // DROP SPACE BLOCK ELEMET INTO DROPZONE OR AFTER ROW
            if (e.toElement.id === 'drop-zone') {
                // DROPPING THE ELEMENT INTO A CURRECT POSITION 
                let spxID = rowID - 1;
                setAttributes(newDiv, { "id": "spx-" + spxID + '-' + 'after' });   //  "txt-" + rowNumber + '-' + columnNumber 
                newDiv.className = 'space space-row-grid';
                dropColumnZone.appendChild(newDiv);
                rowList.push({ afterRow: spxID, spaceRow: 12 });
            }

            // DROP INTO WHETHER BELOW OR ABOVE THE CURRENT ROW 
            if (e.target.className === "drop-row" || e.target.parentElement.className === 'drop-row' || e.target.parentElement.parentElement.className === "drop-row" || e.target.parentElement.parentElement.parentElement.className === "drop-row") {
                let selectedElement = null;
                if (e.target.className === "drop-row") {
                    // DROP OVER ROW ELEMENT 
                    selectedElement = e.target;
                } else if (e.target.parentElement.className === 'drop-row') {
                    // DROP OVER COLUMN ELEMENT 
                    selectedElement = e.target.parentElement;
                } else if (e.target.parentElement.parentElement.parentElement.className === "drop-row") {
                    // DROP OVER IMAGE ELEMENT 
                    selectedElement = e.target.parentElement.parentElement.parentElement;
                } else if (e.target.parentElement.parentElement.className === "drop-row") {
                    // DROP OVER TEXT ELEMENT 
                    selectedElement = e.target.parentElement.parentElement;
                }

                newDiv.className = 'space space-row-grid';
                let rowNum = stringIdToIdNum(selectedElement.id, 1);


                const insert = dropBelowOrAbove(selectedElement, e);
                // console.log("Insert after - ", insert);
                if (insert === true) {
                    // GETTING ROW NUMBER AND COLUMN NUMBER 
                    setAttributes(newDiv, { "id": "spx-" + rowNum + '-' + 'after' });   //  "txt-" + rowNumber + '-' + columnNumber 
                    selectedElement.after(newDiv);
                    rowList.push({ afterRow: rowNum, spaceRow: 12 });
                }
                if (insert === false) {
                    // INSERT BEFORE 
                    rowNum--;
                    setAttributes(newDiv, { "id": "spx-" + rowNum + '-' + 'after' });   //  "txt-" + rowNumber + '-' + columnNumber 
                    selectedElement.previousSibling.after(newDiv);
                    rowList.push({ afterRow: rowNum, spaceRow: 12 });
                }
            }
        }




        dropableColumn = null;
        newDiv = null;
        colDragging = false;
        // console.log("Row list - ", rowList);
    });
    // DROPZONE EVENTS ENDS
}





// MAIN FUNCTION 2
function blockDragAndDrop() {
    let dropableBlock = null;
    let rowNumber;
    let columnNumber;
    // let blockElement = null;
    let txtBlockElement = null;
    let blockDragging = false;

    // DRAGSTART - SET VARIABLE TO BE SURE WHICH ELEMENT IS DRAGGING 
    contentBlockCol.forEach((blockCol, index) => {
        // DRAGABLE BLOCK
        blockCol.addEventListener('dragstart', (e) => {
            blockDragging = true;
            // CHECK WHICH BLOCK WE ARE DRAGGING AND DROPPING 
            const blockContent = e.toElement.classList[0];
            if (blockContent) {
                // //console.log("Block content: ", blockContent);
                switch (e.toElement.classList[1].toString()) {
                    case 'img-holder':
                        dropableBlock = "img-holder";
                        break;
                    case 'txt-holder':
                        dropableBlock = "txt-holder";
                        break;
                    case 'social-holder':
                        dropableBlock = "social-holder";
                        break;
                    case 'btn-holder':
                        dropableBlock = "btn-holder";
                        break;
                    case 'spx-holder':
                        dropableBlock = "spx-holder";
                        break;
                    default:
                        dropableBlock = null;
                        break;
                };
            }

        });
    });
    templateBuilder.addEventListener('dragover', e => {
        if (e.target.className === "two-column-div" || e.target.className === "one-column-div" || e.target.className === "three-column-div") {
            e.target.style.backgroundColor = "rgb(139, 139, 139)";
        }
        e.preventDefault();

    });


    templateBuilder.addEventListener("dragleave", function (e) {
        // reset background of potential drop target when the draggable element leaves it
        if (e.target.className === "two-column-div" || e.target.className === "one-column-div" || e.target.className === "three-column-div") {
            e.target.style.backgroundColor = "transparent";
        }

    }, false);
    templateBuilder.addEventListener('drop', (e) => {
        if (blockDragging) {
            // console.log("Dropable block - ",dropableBlock);
            if (e.target.className === "two-column-div" || e.target.className === "one-column-div" || e.target.className === "three-column-div") {
                // e.target.classList.add('add-bg');
                e.target.style.backgroundColor = "transparent";
            }
            // ONLY COLLUMNS ARE VALID TO DROP INTO DROP ZONE 
            if (e.toElement.id !== 'drop-zone' && dropableBlock !== 'spx-holder') {
                // //console.log(e.toElement.id);
                let dropableColumn = e.target.className;
                let dropInsideImgTxt = e.target.classList[1];
                try {

                    // PREVENT TO ADD MORE THAN 2 BLOCK IN A ROW 
                    if (e.target.children.length >= 2) {
                        alert("Add another row to insert content");
                    } else {
                        // ONLY DROP WHEN DROPABLE ELEMENT IS COLUMN 
                        if (dropableColumn === "one-column-div" || dropableColumn === "two-column-div" || dropableColumn === "three-column-div" || e.target.classList[1] == "img-content-block" || e.target.classList[1] == "txt-content-block") {

                            // CHECK FOR WHICH COLUMN WE ARE DROPING THE BLOCK ELEMENT 
                            if (dropableBlock === "img-holder") {
                                if (dropableColumn === "one-column-div" || dropableColumn === "two-column-div" || dropableColumn === "three-column-div") {
                                    // PREVENT TO DROP MULTIPLE IMG OR TXT BLOCK INTO ONE BLOCK 
                                    if (e.target.children[0] !== undefined && e.target.children[0] !== null) {
                                        if (e.target.children[0].classList[1] === "img-content-block" || e.target.classList[1] === "img-content-block") {
                                            alert("You can't add multiple image block in a column");
                                        }
                                    } else {
                                        rowNumber = stringIdToIdNum(e.toElement.parentElement.id, 1);
                                        let tempColNum = stringIdToIdNum(e.toElement.id, 2);
                                        columnNumber = tempColNum + 1;
                                        // CREATING IMAGE 
                                        let imgID = `img-${rowNumber + '-' + columnNumber}`;
                                        const imgLink = document.createElement('a');
                                        setAttributes(imgLink, { class: "img-block-href", href: "#" });
                                        imageBlockElment = document.createElement("img");
                                        setAttributes(imageBlockElment, { alt: "Image", id: imgID, src: imgDefaultUrl });
                                        imageBlockElment.className = "content img-content-block";
                                        imgLink.append(imageBlockElment)
                                        e.toElement.appendChild(imgLink);
                                        // DATABASE AND VARIABLE 
                                        blockElement = dropableBlock;
                                        positionElement.push({ rowNumber, columnNumber, blockElement: { name: "imgBlockContent", blockHtml: "<a><img /></a>", imgHyperlink: websiteDomain, imgNewTab: false, imgUrl: '/img/empty-image.png' } });
                                    }
                                }
                            } else if (dropableBlock === "txt-holder") {
                                if (dropableColumn === "one-column-div" || dropableColumn === "two-column-div" || dropableColumn === "three-column-div") {
                                    // PREVENT TO DROP MULTIPLE IMG OR TXT BLOCK INTO ONE BLOCK 
                                    if (e.target.children[0] !== undefined && e.target.children[0] !== null) {
                                        if (e.target.children[0].classList[1] === "txt-content-block" || e.target.classList[1] === "txt-content-block") {
                                            alert("You can't add multiple text block in a column");
                                        }
                                    } else {
                                        // CREATING REXT 
                                        rowNumber = stringIdToIdNum(e.toElement.parentElement.id, 1);
                                        let tempColNum = stringIdToIdNum(e.toElement.id, 2);
                                        columnNumber = tempColNum + 1;
                                        const newBlockCol = document.createElement('div');
                                        setAttributes(newBlockCol, { "id": "txt-" + rowNumber + '-' + columnNumber, contenteditable: true });   //  "txt-" + rowNumber + '-' + columnNumber 
                                        newBlockCol.className = 'content txt-content-block';
                                        newBlockCol.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil corrupti natus eos in a voluptas incidunt porro quis autem quo!';
                                        // CHANGING TEXT EVENT 
                                        // pasteAndFormatText(newBlockCol);
                                        e.toElement.appendChild(newBlockCol);
                                        // THIS IS ONLY FOR DATABASE 
                                        text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil corrupti natus eos in a voluptas incidunt porro quis autem quo!";
                                        txtBlockElement = `<div class="content txt-content-block" onclick="txtChangeHandler" contenteditable="true" id="txt-${rowNumber + '-' + columnNumber}">${text}</div>`;
                                        blockElement = dropableBlock;
                                        positionElement.push({ rowNumber, columnNumber, blockElement: { name: "txtBlockContent", blockHtml: txtBlockElement } });
                                    }
                                }
                            } else if (dropableBlock === "btn-holder") {

                                function insertButtonElement(getColID, getRowID) {
                                    // //console.log(e);
                                    const newBlockCol = document.createElement('button');
                                    rowNumber = stringIdToIdNum(getRowID, 1);
                                    let tempColNum = stringIdToIdNum(getColID, 2); // let tempColNum = stringIdToIdNum(e.toElement.id, 2);
                                    columnNumber = tempColNum + 1;
                                    setAttributes(newBlockCol, { "id": "btn-" + rowNumber + '-' + columnNumber });   //  "txt-" + rowNumber + '-' + columnNumber 
                                    newBlockCol.className = "content btn-content-block";

                                    const newBtnLink = document.createElement('a');
                                    setAttributes(newBtnLink, { "class": "btn-content-link", 'href': "#" })
                                    newBtnLink.textContent = btnDefaultTxt;
                                    newBlockCol.append(newBtnLink);

                                    return newBlockCol;
                                }

                                // THIS BUTTON SHOULD ONLY INSERT INTO IMAGE OR TEXT
                                if (e.toElement.classList[1] === "txt-content-block" || e.toElement.classList[1] === "img-content-block") {
                                    if (e.target.classList[1] === "txt-content-block") {
                                        e.target.after(insertButtonElement(e.target.parentElement.id, e.target.parentElement.parentElement.id))
                                    }
                                    if (e.toElement.classList[1] === "img-content-block") {
                                        e.target.parentElement.after(insertButtonElement(e.target.parentElement.parentElement.id, e.target.parentElement.parentElement.parentElement.id))
                                    }
                                    btnBlockElement = "<a >button</a>";
                                    siblingButtonList.push({ rowNum: rowNumber, colNum: columnNumber, btnBgColor: "rgb(70, 133, 192)", btnTextColor: "rgb(15, 48, 80)", btnHyperlink: websiteDomain, btnOpenNewTab: false, btnRound: false, btnAlign: "inherit", btnContent: "Preview", btnFontFamily: "Helvetica", btnFontSize: 12 });
                                } else {
                                    if (e.target.hasChildNodes()) {
                                        if (e.target.childNodes[0].classList[1] === "txt-content-block" || e.target.childNodes[0].className === "img-block-href") {
                                            e.target.appendChild(insertButtonElement(e.target.id, e.target.parentElement.id));
                                            btnBlockElement = `<a >button</a>`;
                                            siblingButtonList.push({ rowNum: rowNumber, colNum: columnNumber, btnBgColor: "rgb(70, 133, 192)", btnTextColor: "rgb(15, 48, 80)", btnHyperlink: websiteDomain, btnOpenNewTab: false, btnRound: false, btnAlign: null, btnContent: "Preview", btnFontFamily: "Helvetica", btnFontSize: 12 });
                                        }
                                    } else {
                                        alert("Add  a text or image block to add button");
                                    }

                                }


                            } else if (dropableBlock === "social-holder") {
                                if (e.target.children[0] !== undefined && e.target.children[0] !== null) {
                                    if (e.target.children[0].classList[1] === "icon-content-block" || e.target.classList[1] === "icon-content-block") {
                                        alert("You can't add multiple social icon block in a column");
                                    }
                                } else {
                                    // The Social Media Icons can only be dragged to a one - column or a two - column layout
                                    if (dropableColumn === "one-column-div" || dropableColumn === "two-column-div") {
                                        rowNumber = stringIdToIdNum(e.toElement.parentElement.id, 1);
                                        let tempColNum = stringIdToIdNum(e.toElement.id, 2);
                                        columnNumber = tempColNum + 1;
                                        const iconContainer = document.createElement("div");
                                        setAttributes(iconContainer, { "id": `icon-${rowNumber}-${columnNumber}` });
                                        iconContainer.className = "content icon-content-block";
                                        const iconHolder = createSocialIcons(iconContainer, iconLink, iconLink, iconLink);
                                        e.toElement.appendChild(iconHolder);
                                        // CHANGING HEIGHT OF ROW 
                                        if (dropableColumn === "one-column-div") e.target.parentElement.style.height = "8em";
                                        blockElement = dropableBlock;
                                        positionElement.push({ rowNumber, columnNumber, blockElement: { name: "socialBlockContent", blockHtml: "<div>social</div>", socialFbHyperlink: defaultFbLink, socialTwitterHyperlink: defaultTwitterLink, socialInstagramHyperlink: defaultInstaLink } });
                                    } else {
                                        alert("Social icon can't drop into three column!");
                                    }
                                }
                            }
                        } else {
                        }
                    }
                } catch (err) {
                    console.log(err);
                }
            };
        }

        dropableBlock = null;
        txtBlockElement = null;
        blockDragging = false;
    });
    pasteAndFormatText(dropColumnZone, txtBlockElement);
}








// MAIN FUNCTION 3
function rightBarElementShowHidePreset() {




    templateBuilder.addEventListener('click', e => {
        try {
            // CLEAN UP DEFAULT VALUE FOR ALL INPUT FIELD 
            let idString = null;
            // IF SOMEONE CLICK ON ANY BLOCK THE PROPERTY BAR WILL OPEN (ALL BLOCK EXCEPT SPACE BLOCK)
            if (e.toElement.parentElement.parentElement.classList[1] === 'txt-content-block' || e.toElement.parentElement.classList[0] === 'content' || e.toElement.classList[0] === 'content' || e.toElement.className === 'social-icon-content' || e.toElement.className === 'social-icon-img' || e.toElement.className === "btn-content-link") {
                templateSelected = false;
                if (e.toElement.parentElement.parentElement.classList[1] === 'txt-content-block' || e.toElement.parentElement.classList[1] === 'txt-content-block' || e.toElement.className === 'social-icon-content' || e.toElement.className === 'social-icon-img' || e.toElement.className === "btn-content-link") {
                    if (e.toElement.className === 'social-icon-img' || e.toElement.parentElement.parentElement.classList[1] === 'txt-content-block') {
                        idString = e.toElement.parentElement.parentElement.id;
                    } else if (e.toElement.className === 'social-icon-content' || e.toElement.className === "btn-content-link" || e.toElement.parentElement.classList[1] === 'txt-content-block') {
                        idString = e.toElement.parentElement.id;
                    }

                } else {
                    idString = e.toElement.id.toString();
                }
                let findRowCol = idString.split('-');
                selectedRow = parseInt(findRowCol[1]);
                selectedCol = parseInt(findRowCol[2]);

                propertiesBar.style.display = 'block';
                blockElementBar.style.display = 'none';
                if (e.toElement.classList[1] === "img-content-block") {
                    e.preventDefault();
                    allProperties.forEach(ap => { ap.style.display = 'none'; });
                    imgProps.style.display = 'block';
                    const previousProps = positionElement.filter((pEl, pelIxd) => pEl.rowNumber === selectedRow && pEl.columnNumber === selectedCol);

                    imgLink.value = previousProps[0].blockElement.imgHyperlink;  // WORKING
                    imgNewTab.checked = previousProps[0].blockElement.imgNewTab;
                    // console.log("preview img - ", previousProps[0].blockElement.imgUrl);
                    currentPath === editPage && previousProps[0].blockElement.imgUrl.trim() !== "/img/empty-image.png" ? previewImg.src = imgKeyToLink(previousProps[0].blockElement.imgUrl.trim()) : previewImg.src = previousProps[0].blockElement.imgUrl;
                } else if (e.toElement.classList[1] === "txt-content-block" || e.toElement.parentElement.parentElement.classList[1] === 'txt-content-block') {
                    // const selectedTextContent = document.getElementById(`txt-${selectedRow}-${selectedCol}`);
                    // resizeObserver.observe(selectedTextContent);
                    allProperties.forEach(ap => { ap.style.display = 'none' });
                    txtProps.style.display = 'block';

                } else if (e.toElement.className === 'social-icon-content' || e.toElement.className === 'social-icon-img' || e.toElement.classList[1] === "icon-content-block") {
                    e.preventDefault();
                    allProperties.forEach(ap => { ap.style.display = 'none' });
                    socialProps.style.display = 'block';
                    const previousProps = positionElement.filter((pEl, pelIxd) => pEl.rowNumber === selectedRow && pEl.columnNumber === selectedCol);

                    fbLinkInput.value = previousProps[0].blockElement.socialFbHyperlink;
                    twitterLinkInput.value = previousProps[0].blockElement.socialTwitterHyperlink;
                    instagramLinkInput.value = previousProps[0].blockElement.socialInstagramHyperlink;
                } else if (e.toElement.classList[1] === "btn-content-block" || e.toElement.className === "btn-content-link") {
                    e.preventDefault();
                    allProperties.forEach(ap => { ap.style.display = 'none' });
                    btnProps.style.display = 'block';
                    const previousProps = siblingButtonList.filter((sBl, sblIxd) => sBl.rowNum === selectedRow && sBl.colNum === selectedCol);
                    btnFontSizeInput.value = previousProps[0].btnFontSize;
                    btnFontFamilyInput.value = previousProps[0].btnFontFamily;
                    btnBGColorInput.value = previousProps[0].btnBgColor;
                    btnTxtColorInput.value = previousProps[0].btnTextColor;
                    btnTextContentInput.value = previousProps[0].btnContent;
                    btnHyperlinkInput.value = previousProps[0].btnHyperlink;
                    btnNewTabInput.checked = previousProps[0].btnOpenNewTab;
                    btnShapeInput.checked = previousProps[0].btnRound;

                } else {
                    allProperties.forEach(ap => { ap.style.display = 'none' });
                }
            }

            // IF SOMEONE CLICK ON SPACE HE WILL BE ABLE TO CHANGE SPACE PROPS 
            if (e.toElement.classList[1] === "space-row-grid") {
                propertiesBar.style.display = 'block';
                blockElementBar.style.display = 'none';
                allProperties.forEach(ap => { ap.style.display = 'none' });
                spxProps.style.display = 'block';
                selectedAfterRow = stringIdToIdNum(e.toElement.id, 1);
                const selectedSpace = rowList.filter((ss, i) => ss.afterRow === selectedAfterRow);
                spxHeightInput.value = `${selectedSpace[0].spaceRow}`;
            }
            // IF SOMEONE CLICK ON ROW HE WILL BE ABLE TO CHANGE ROW PROPS 
            if (e.target.className === 'drop-row' || e.target.className === "img-block-href" || e.toElement.parentElement.className === "drop-row") {
                selectedCol = null;
                propertiesBar.style.display = 'block';
                blockElementBar.style.display = 'none';
                allProperties.forEach(ap => { ap.style.display = 'none' });
                rowProps.style.display = 'block';
                if (e.target.className === 'drop-row') {
                    selectedRow = stringIdToIdNum(e.toElement.id, 1);
                } else if (e.target.className === "img-block-href") {
                    selectedRow = stringIdToIdNum(e.toElement.parentElement.parentElement.id, 1);
                } else if (e.toElement.parentElement.className === "drop-row") {
                    selectedRow = stringIdToIdNum(e.toElement.parentElement.id, 1);
                }
            }



            // IF SOMEONE CLICK  OUT OF THE BLOCK THE PROPERTY BAR WILL CLOSE 
            if (e.target.className === 'template-wrapper' || e.target.className === 'header-image' || e.target.classList[0] === 'col') {
                templateSelected = true;
                allProperties.forEach(ap => { ap.style.display = 'none' });
                propertiesBar.style.display = 'none';
                blockElementBar.style.display = 'block';
                selectedAfterRow = null;
                selectedRow = null;
                selectedCol = null;
            }

        } catch (err) {
            console.log("Error from show hide: ", err);
        }
    });

    // SHOW AND HIDE RIGHT BAR FOR HILIGHTED TEXT 
    document.addEventListener('selectionchange', (e) => {
        // console.log(txt);
        // console.log("E- ", e.target);
        // console.log("Archor node - ", window.getSelection().anchorNode.parentElement);
        try {
            let selectedTxtElement = document.getSelection().anchorNode.parentElement;
            let els = [];
            while (selectedTxtElement) {
                if (selectedTxtElement.className !== null || selectedTxtElement.className !== "" || selectedTxtElement.className !== undefined) {
                    try {
                        if (selectedTxtElement.classList[1] === "txt-content-block") {
                            // console.log("Element - ", selectedTxtElement);
                            const idString = selectedTxtElement.id.toString().trim();
                            let findRowCol = idString.split('-');
                            selectedRow = parseInt(findRowCol[1]);
                            selectedCol = parseInt(findRowCol[2]);

                            propertiesBar.style.display = 'block';
                            blockElementBar.style.display = 'none';
                            allProperties.forEach(ap => { ap.style.display = 'none' });
                            txtProps.style.display = 'block';
                        }
                    } catch (noIndexErr) {
                        // console.log(noIndexErr);
                    }
                    // console.log("Classes - ", selectedTxtElement.className);
                }
                els.unshift(selectedTxtElement);
                selectedTxtElement = selectedTxtElement.parentNode;
            }
        } catch (pEleErr) {
            console.log(pEleErr);
        }

        // console.log("All element - ", els);
    });



    // HOVER EFFECT 
    try {
        dropColumnZone.addEventListener('mouseover', e => {
            // console.log("selected Col - ", selectedCol);
            // console.log("selected Row - ", selectedRow);
            if (e.toElement.classList[0] !== "content") {
                if (e.toElement.className === "three-column-div" || e.toElement.className === "one-column-div" || e.toElement.className === "two-column-div") {
                    e.target.parentElement.style.border = "1px solid rgb(15, 48, 80)";
                } else if (e.toElement.className === "drop-row") {
                    e.target.style.border = "1px solid rgb(15, 48, 80)";
                } else if (e.toElement.classList[0] == "space") {
                    e.target.style.border = "1px solid rgb(15, 48, 80)";
                }
            }
        });
        // MOUSE OUT IS NOT WORKING PROPERLY 
        dropColumnZone.addEventListener('mouseout', e => {
            const row = document.querySelectorAll('.drop-row');
            row.forEach((r, i) => r.style.border = "none");
            row.forEach((r, i) => r.style.borderBottom = "0.01em solid rgb(230, 225, 225)");
            const space = document.querySelectorAll('.space');
            space.forEach((r, i) => r.style.border = "none");
            space.forEach((r, i) => r.style.borderBottom = "0.01em solid rgb(230, 225, 225)");
        });
    } catch (hErr) {
        console.log(hErr);
    }

}


// MAIN FUNCTION 4
function rightBarPropsUpdate() {

    // DROP ZONE HEIGHT UPDATE 
    resizeObserver.observe(dropColumnZone);

    // SUB FUNCTION 1
    function imgPropertiesUpdate() {
        inputImg.addEventListener('change', e => {
            const templateImgPreview = document.getElementById(`img-${selectedRow}-${selectedCol}`);
            templateImgPreview.style.width = "96%";
            templateImgPreview.style.height = "auto";
            imgUploadHandler(e.target.files[0], [previewImg, templateImgPreview]);  // Working but need to save in db
        });
        imgLink.addEventListener('change', (e) => {
            // BY USING SELECTED ROW AND COL SEARCH ITEM FROM POSITION ELEMENT AND UPDATE 
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].blockElement.imgHyperlink = e.target.value; } });
        });
        imgNewTab.addEventListener('change', async e => {
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].blockElement.imgNewTab = e.target.checked; } });
        });
    }
    imgPropertiesUpdate();

    // SUB FINCTION 2
    function txtPropertiesUpdate() {
        alignBtn.forEach(btn => {
            btn.addEventListener('click', e => {
                let cmd = btn.dataset['align'];
                document.execCommand(cmd, false, null);
                const text = document.getElementById(`txt-${selectedRow}-${selectedCol}`);
                textBlockElement = text.outerHTML.toString().trim();
                positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].blockElement.blockHtml = textBlockElement; } });
            });
        });
        txtStyle.forEach(btn => {
            btn.addEventListener('click', e => {
                let cmd = btn.dataset['style'];
                document.execCommand(cmd, false, null);
                const text = document.getElementById(`txt-${selectedRow}-${selectedCol}`);
                textBlockElement = text.outerHTML.toString().trim();
                positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].blockElement.blockHtml = textBlockElement; } });
            });
        });
        txtFontFamily.addEventListener('change', e => {
            let fontName = e.target.value;
            document.execCommand("fontName", false, fontName);
            const text = document.getElementById(`txt-${selectedRow}-${selectedCol}`);
            textBlockElement = text.outerHTML.toString().trim();
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].blockElement.blockHtml = textBlockElement; } });
        });
        txtFontSize.addEventListener('change', e => {
            let fontSize = e.target.value;
            document.execCommand("fontSize", false, fontSize);
            const text = document.getElementById(`txt-${selectedRow}-${selectedCol}`);
            textBlockElement = text.outerHTML.toString().trim();
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].blockElement.blockHtml = textBlockElement; } });
        });

        txtHyperlink.addEventListener('change', e => {
            let url = e.target.value;
            // console.log(url);
            document.execCommand("createLink", false, url);
            const text = document.getElementById(`txt-${selectedRow}-${selectedCol}`);
            textBlockElement = text.outerHTML.toString().trim();
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].blockElement.blockHtml = textBlockElement; } });
        });
    }
    txtPropertiesUpdate();

    // SUB FUNCTION  3 
    function btnPropertiesUpdate() {
        // BUTTON PROPERTIES 

        btnFontSizeInput.addEventListener('change', e => {
            const cngBtn = document.getElementById(`btn-${selectedRow}-${selectedCol}`);
            cngBtn.style.fontSize = e.target.value + 'px';
            siblingButtonList.forEach((sBl, sIdx) => { if (sBl.rowNum === selectedRow && sBl.colNum === selectedCol) { sBl.btnFontSize = e.target.value } });
        });
        btnFontFamilyInput.addEventListener('change', e => {
            const cngBtn = document.getElementById(`btn-${selectedRow}-${selectedCol}`);
            cngBtn.style.fontFamily = e.target.value;
            siblingButtonList.forEach((sBl, sIdx) => { if (sBl.rowNum === selectedRow && sBl.colNum === selectedCol) { sBl.btnFontFamily = e.target.value } });
        });
        btnBGColorInput.addEventListener('change', e => {
            const cngBtn = document.getElementById(`btn-${selectedRow}-${selectedCol}`);
            cngBtn.style.backgroundColor = e.target.value;
            siblingButtonList.forEach((sBl, sIdx) => { if (sBl.rowNum === selectedRow && sBl.colNum === selectedCol) { sBl.btnBgColor = e.target.value } });
        });
        btnTxtColorInput.addEventListener('change', e => {
            const cngBtn = document.getElementById(`btn-${selectedRow}-${selectedCol}`);
            cngBtn.childNodes[0].style.color = e.target.value;
            siblingButtonList.forEach((sBl, sIdx) => { if (sBl.rowNum === selectedRow && sBl.colNum === selectedCol) { sBl.btnTextColor = e.target.value } });
        });
        btnTextContentInput.addEventListener('change', e => {
            const cngBtn = document.getElementById(`btn-${selectedRow}-${selectedCol}`);
            cngBtn.textContent = e.target.value;
            siblingButtonList.forEach((sBl, sIdx) => { if (sBl.rowNum === selectedRow && sBl.colNum === selectedCol) { sBl.btnContent = e.target.value } });
        });
        btnHyperlinkInput.addEventListener('change', e => {
            siblingButtonList.forEach((sBl, sIdx) => { if (sBl.rowNum === selectedRow && sBl.colNum === selectedCol) { sBl.btnHyperlink = e.target.value } });
        });
        btnNewTabInput.addEventListener('change', e => {
            siblingButtonList.forEach((sBl, sIdx) => { if (sBl.rowNum === selectedRow && sBl.colNum === selectedCol) { sBl.btnOpenNewTab = e.target.checked } });
        });
        btnShapeInput.addEventListener('change', e => {
            const cngBtn = document.getElementById(`btn-${selectedRow}-${selectedCol}`);
            if (e.target.checked === true) {
                cngBtn.style.borderRadius = '8px';
            }
            if (e.target.checked === false) {
                cngBtn.style.borderRadius = '0';
            }
            siblingButtonList.forEach((sBl, sIdx) => { if (sBl.rowNum === selectedRow && sBl.colNum === selectedCol) { sBl.btnRound = e.target.checked } });
        });
        btnAlignElement.forEach((bae, i) => {
            bae.addEventListener('click', e => {
                const cngBtn = document.getElementById(`btn-${selectedRow}-${selectedCol}`);
                let alignBtn = null;
                switch (e.target.parentElement.id) {
                    case "btn-align-left":
                        alignBtn = "left";
                        break;
                    case "btn-align-right":
                        alignBtn = "right";
                        break;
                    case "btn-align-center":
                        alignBtn = "inherit";
                        break;
                }
                cngBtn.style.float = `${alignBtn}`;
                siblingButtonList.forEach((sBl, sIdx) => { if (sBl.rowNum === selectedRow && sBl.colNum === selectedCol) { sBl.btnAlign = alignBtn } });
            });
        });
    }
    btnPropertiesUpdate();

    // SUB FINCTION 4
    function socialPropertiesUpdate() {
        // SOCIAL PROPERTIES 
        fbLinkInput.addEventListener('change', (e) => {
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].blockElement.socialFbHyperlink = e.target.value; } });
        });
        twitterLinkInput.addEventListener('change', (e) => {
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].blockElement.socialTwitterHyperlink = e.target.value; } });
        });
        instagramLinkInput.addEventListener('change', (e) => {
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].blockElement.socialInstagramHyperlink = e.target.value; } });
        });
    }
    socialPropertiesUpdate();

    // SUB FINCTION 5
    function spaceBtnRowUpdate() {
        // rowList.push({ afterRow: spxID, spaceRow: 12 });
        spxHeightInput.addEventListener('change', e => {
            rowList.forEach((rl, i) => {
                if (rl.afterRow === selectedAfterRow) { rowList[i].spaceRow = parseInt(e.target.value) }
                document.getElementById("spx-" + selectedAfterRow + "-after").style.height = e.target.value + "px";
            });
        });
    }
    spaceBtnRowUpdate();



    // SUB FUNCTION 6
    // NEED TO CHANGE DB PROPERTIES OF SIBLING BUTTON 
    function rowUpDownDelete() {


        // DELETE AN ROW 
        rowDelete.addEventListener('click', e => {
            const selectedRowElement = document.getElementById('row-' + selectedRow);
            const allNextEl = getNextAllElement(selectedRowElement);
            const allRowEl = document.querySelectorAll('.drop-row');
            try {

                // DELETE FROM DOW LIST 
                const rowIdx = rowList.findIndex(rl => rl.rowID === selectedRow);
                rowList.splice(rowIdx, 1);
                // UPDATING DATABASE 
                rowList.forEach((rl, i) => {
                    if (rl.rowID > rowIdx) {
                        if (rl.rowID > 1) {
                            rl.rowID--;
                        }
                        // CHANGE THE ID OF NEXT SIBLINGS 
                    }
                });



                positionElement = positionElement.filter((pEl, elIdx, arr) => pEl.rowNumber !== selectedRow);
                positionElement.forEach((pEl, pIdx) => { if (pEl.rowNumber > selectedRow) { pEl.rowNumber--; } });


                // WORK WITH BUTTONS
                siblingButtonList = siblingButtonList.filter((sBL, sIdx) => sBL.rowNum !== selectedRow);
                siblingButtonList.forEach((sEl, sIdx) => { if (sEl.rowNum > selectedRow) { sEl.rowNum--; } });

                selectedRowElement.remove();
                let newSelectedRow = selectedRow;
                if (allNextEl.length > 0) {
                    allNextEl.forEach((ane, aneI) => {
                        ane.setAttribute('id', `row-${newSelectedRow}`);
                        if (ane.hasChildNodes()) {
                            ane.childNodes.forEach((anec, anecI) => {
                                anec.setAttribute("id", anec.id.toString().replace(/.$/, newSelectedRow));
                                if (anec.hasChildNodes()) {
                                    // anec.forEach((anecc, aneccI)=>{
                                    //     console.log("anecc - ", anecc);
                                    // });
                                    // console.log("child element length - ", anec.children.length);
                                    if (anec.children.length > 1) {
                                        anec.childNodes.forEach((anecc, ineccI) => changeBlockID(anecc, 4, newSelectedRow, selectedRow));
                                    } else {
                                        changeBlockID(anec.childNodes[0], 4, newSelectedRow, selectedRow);
                                    }
                                }
                            });
                            newSelectedRow++;

                        }
                    });
                }

                // // SETTING ROW ID DYNAMICALLY 
                // let idNum = selectedRow;
                // let i = 0;
                // while (i < allNextEl.length) {
                //     allNextEl[i].setAttribute('id', `row-${idNum}`);
                //     // CHANGE ALL CHILD ELEMENT ID AND CLASS 
                //     if (allNextEl[i].hasChildNodes()) {
                //         allNextEl[i].childNodes.forEach((ncEl, ncIdx) => {
                //             console.log(ncEl);
                //             // selectedRowElement.childNodes.forEach((sre, sreI) => sre.setAttribute("id", sre.id.toString().replace(/.$/, selectedRow - 1)));
                //             // selectedRowElement.nextSibling.childNodes.forEach((sre, sreI) => sre.setAttribute("id", sre.id.toString().replace(/.$/, selectedRow)));
                //             ncEl.forEach((ncElc, ncElI) => {
                //                 // console.log("ncelc - ", ncElc);
                //                 ncElc.setAttribute()
                //             });
                //             if (ncEl.hasChildNodes()) {
                //                 ncEl.childNodes.forEach((nccEl, nccIdx) => {
                //                     if (nccEl.classList[1] === "icon-content-block") {
                //                         nccEl.id = replaceAt(nccEl.id, 5, idNum);
                //                     } else {
                //                         nccEl.id = replaceAt(nccEl.id, 4, idNum);   // replace a charecter of index 4
                //                     }
                //                 });
                //             }
                //         });
                //     }
                //     idNum++;
                //     i++
                // }



                propertiesBar.style.display = 'none';
                blockElementBar.style.display = 'block';

            } catch (err) {
                //console.log(err);
            }

            // EVERYTIME WE DELETE A ROW WE SHOULD SUBSTRACT ROW ID BY ONE 
            rowID--;
            selectedRow = null;
        });


        // ROW MOVE UP 
        rowMoveUp.addEventListener('click', (e) => {
            const selectedRowElement = document.getElementById(`row-${selectedRow}`);
            // CHECK IF THE SELECTED ELEMENT IS FIRST ELEMENT OR LAST ELEMENT 
            if (dropColumnZone.firstChild.id === selectedRowElement.id) {
                alert("First row can't be move up")
            } else {
                try {
                    // SKIPPING SPACE 
                    if (selectedRowElement.previousSibling.classList[0] === 'space') {
                        // THIS IS FOR SKIPPING SPACE 
                        dropColumnZone.insertBefore(selectedRowElement, selectedRowElement.previousSibling.previousSibling);
                    } else {
                        // THERE IS NO SPACE IN NEXT SIBLING 
                        dropColumnZone.insertBefore(selectedRowElement, selectedRowElement.previousSibling);
                    }
                    if (selectedRowElement.id !== 'row-1') {
                        // CHANGING CURRENT ELEMENT ROW NUMBER IN ID 
                        selectedRowElement.setAttribute('id', `row-${selectedRow - 1}`);
                        selectedRowElement.nextSibling.setAttribute('id', `row-${selectedRow}`);
                        // CHANGING COLUMN ELEMENT ROW NUMBER IN ID 
                        selectedRowElement.childNodes.forEach((sre, sreI) => sre.setAttribute("id", sre.id.toString().replace(/.$/, selectedRow - 1)));
                        selectedRowElement.nextSibling.childNodes.forEach((sre, sreI) => sre.setAttribute("id", sre.id.toString().replace(/.$/, selectedRow)));
                    }

                    if (selectedRowElement.hasChildNodes()) {
                        // CHANGING ID OF CURRENT ELEMENT'S CHILDS - COLUMN
                        selectedRowElement.childNodes.forEach((acn, acnIdx) => {
                            if (acn.hasChildNodes()) {
                                const newSelectedRow = selectedRow - 1;
                                // ALL CHILD OF CHILD NODES 
                                acn.childNodes.forEach((acocn, acocnIdx) => {
                                    changeBlockID(acocn, 4, newSelectedRow, selectedRow)
                                });
                            }
                        });
                        // CHANGING ID OF NEXT ELEMENT'S CHILDS 
                        selectedRowElement.nextSibling.childNodes.forEach((acn, acnIdx) => {
                            if (acn.hasChildNodes()) {
                                const newSelectedRow = selectedRow;
                                // ALL CHILD OF CHILD NODES 
                                acn.childNodes.forEach((acocn, acocnIdx) => {
                                    changeBlockID(acocn, 4, newSelectedRow, selectedRow);
                                });
                            }
                        });
                    }




                    // WORKING WITH DATABASE 
                    let previousRow = selectedRow - 1;
                    positionElement.forEach((pEl, index) => {
                        if (pEl.rowNumber === previousRow) {
                            pEl.rowNumber = `${selectedRow}`.toString();
                        } else if (pEl.rowNumber === selectedRow) {
                            // //console.log('match');
                            pEl.rowNumber = `${previousRow}`.toString();
                        }
                        pEl.rowNumber = parseInt(pEl.rowNumber);
                    });


                    siblingButtonList.forEach((bEl, blIdx) => {
                        if (bEl.rowNum === previousRow) {
                            bEl.rowNum = `${selectedRow}`.toString();
                        } else if (bEl.rowNum === selectedRow) {
                            bEl.rowNum = `${previousRow}`.toString();
                        }
                        bEl.rowNum = parseInt(bEl.rowNum);
                    });

                    rowList.forEach((rl, rlIdx) => {
                        if (!rl.hasOwnProperty("afterRow")) {
                            if (rl.rowID === previousRow) {
                                rl.rowID = `${selectedRow}`.toString();
                            } else if (rl.rowID === selectedRow) {
                                rl.rowID = `${previousRow}`.toString();
                            }
                            rl.rowID = parseInt(rl.rowID);
                        } else {
                            if (rl.afterRow === previousRow) {
                                rl.afterRow++;
                            }
                        }
                    });



                    propertiesBar.style.display = 'none';
                    blockElementBar.style.display = 'block';
                    selectedRow = null;

                } catch (err) {
                    console.log(err);
                }


            }
        });

        // ROW MOVE DOWN 
        rowMoveDown.addEventListener('click', (e) => {
            const selectedRowElement = document.getElementById(`row-${selectedRow}`);
            if (dropColumnZone.lastChild.id === selectedRowElement.id) {
                alert("Last row can't be move down")
            } else {
                try {

                    if (selectedRowElement.nextSibling.classList[0] === 'space') {
                        selectedRowElement.nextSibling.nextSibling.after(selectedRowElement)
                    } else {
                        // THERE IS NO SPACE IN NEXT SIBLING 
                        selectedRowElement.nextSibling.after(selectedRowElement);
                    }
                    selectedRowElement.setAttribute('id', `row-${selectedRow + 1}`);
                    selectedRowElement.previousSibling.setAttribute('id', `row-${selectedRow}`);
                    // CHANGING COLUMN ELEMENT ROW NUMBER IN ID 
                    selectedRowElement.childNodes.forEach((sre, sreI) => sre.setAttribute("id", sre.id.toString().replace(/.$/, selectedRow + 1)));
                    selectedRowElement.previousSibling.childNodes.forEach((sre, sreI) => sre.setAttribute("id", sre.id.toString().replace(/.$/, selectedRow)));



                    // CHANGING ID OF CHILDS 
                    if (selectedRowElement.hasChildNodes()) {
                        selectedRowElement.childNodes.forEach((acn, acnIdx) => {
                            if (acn.hasChildNodes()) {
                                // ALL CHILD OF CHILD NODES 
                                acn.childNodes.forEach((acocn, acocnIdx) => {
                                    const newSelectedRow = selectedRow + 1;
                                    changeBlockID(acocn, 4, newSelectedRow, selectedRow);
                                });
                            }
                        });
                        selectedRowElement.previousSibling.childNodes.forEach((acn, acnIdx) => {
                            if (acn.hasChildNodes()) {
                                // ALL CHILD OF CHILD NODES 
                                acn.childNodes.forEach((acocn, acocnIdx) => {
                                    changeBlockID(acocn, 4, selectedRow, selectedRow);
                                });
                            }
                        });

                    }

                    // CHANGE ID OF SPACE DIV 




                    // WORKING WITH DATABASE 
                    let nextRow = selectedRow + 1;
                    positionElement.forEach((pEl, index) => {
                        if (pEl.rowNumber === nextRow) {
                            pEl.rowNumber = `${selectedRow}`.toString();
                        } else if (pEl.rowNumber === selectedRow) {
                            // //console.log('match');
                            pEl.rowNumber = `${nextRow}`.toString();
                        }
                        pEl.rowNumber = parseInt(pEl.rowNumber);
                    });


                    siblingButtonList.forEach((bEl, blIdx) => {
                        if (bEl.rowNum === nextRow) {
                            bEl.rowNum = `${selectedRow}`.toString();
                        } else if (bEl.rowNum === selectedRow) {
                            bEl.rowNum = `${nextRow}`.toString();
                        }
                        bEl.rowNum = parseInt(bEl.rowNum);
                    });

                    rowList.forEach((rl, rlIdx) => {
                        if (!rl.hasOwnProperty("afterRow")) {
                            if (rl.rowID === nextRow) {
                                rl.rowID = `${selectedRow}`.toString();
                            } else if (rl.rowID === selectedRow) {
                                rl.rowID = `${nextRow}`.toString();
                            }
                            rl.rowID = parseInt(rl.rowID);
                        } else {
                            if (rl.afterRow === nextRow) {
                                rl.afterRow--;
                            }
                        }
                    });
                    propertiesBar.style.display = 'none';
                    blockElementBar.style.display = 'block';
                    selectedRow = null;
                } catch (err) {
                    console.log(err);
                }
            }
        });
    }
    rowUpDownDelete();
}






// MAIN FUNCTION 5
function templatePropsCng() {
    // HEADER IMAGE CHANGE
    headerImgInput.addEventListener('change', e => {
        imgUploadHandler(e.target.files[0], [headerImage, headerImgPreview]);
    });



    // TEMPLATE COLOR CHANGE 
    templateBGColorInput.addEventListener('change', (e) => {
        templateWrapper.style.background = e.target.value;
    });

    // LINKS COLOR CHANGE 
    templateLinkColorInput.addEventListener('change', (e) => {
        for (let link of links) {
            link => style.color = e.target.value
        }
    });


    // HEADER IMAGE DELETE 
    deleteHeaderImg.addEventListener('click', e => {
        headerImgPreview.style.display = 'none';
        // deleteHeaderImg.style.display = 'none !important';
        deleteHeaderImg.style.display = 'none';
        headerImage.style.display = "none";
        formData.set('headerImg', "header-deleted");
    });

}




// MAIN FUNCTION 6
function backendAndDataBase(reqUrl, method) {
    cancelButton.addEventListener('click', e => {
        window.location.replace(websiteDomain + "/template");
    });


    saveButton.addEventListener('click', async e => {
        e.preventDefault();
        if (inputTitle.value === null || inputTitle.value === "") {
            alert("Please fill newslatter title field");
        } else {
            rightBar.style.zIndex = '-1';
            submitSpinner.classList.remove("d-none");

            try {
                const selectedTextContent = document.getElementById(`txt-${selectedRow}-${selectedCol}`);

                // FOR CHANGING TEXT CONTENT 
                await positionElement.forEach(pEl => {
                    if (pEl.blockElement.name === "txtBlockContent") {
                        pEl.blockElement.blockHtml = document.getElementById(`txt-${pEl.rowNumber}-${pEl.columnNumber}`).outerHTML;
                    }
                    if (pEl.blockElement.name === "imgBlockContent") {
                        pEl.blockElement.imgUrl = "/img/empty-image.png";
                        // SET DEFAULT IMAGE URL - FROM SERVER CHENGE RIGHT URL FOR RIGHT IMAGE  
                    }
                });

                // CHANGING TITLE 
                await formData.append("title", inputTitle.value);
                await formData.append('bgColor', templateBGColorInput.value);
                await formData.append('linkColor', templateLinkColorInput.value);

                await formData.append('layout', JSON.stringify(rowList));
                await formData.append('element', JSON.stringify(positionElement));
                await formData.append('sibling', JSON.stringify(siblingButtonList));




                // //SUBMITTING DATA TO THE SERVER 
                const response = await fetch(reqUrl, {
                    // method: "POST",
                    method: method,
                    body: formData,
                });
                // console.log(response);
                // for (let pair of formData.entries()) {
                //     console.log(pair[0] + ', ' + pair[1]);
                // }

                // //console.log("Sibling Button: ", siblingButtonList);
                // //console.log("Row list: ", rowList);
                // //console.log("Elements: ", positionElement);



                // IF SUBMITTED SUCCESSFULLY WI WILL REDIRECT SUCCESSFULLY 
                // submitted = true;
                submitSpinner.classList.add("d-none");
                window.location.replace(websiteDomain + "/template");
            } catch (err) {
                console.log(err);
            }
        }



    });
}







// MAIN FUNCTION 7
function previewDropZoneTemplate() {


    // PREVIEW PAGE VARIABLES START 
    // let layout = '<%- docs.layout %>';
    // let content = '<%- docs.content %>';
    // let img = '<%- docs.bg_img %>';
    // let sibling = '<%- docs.sibling %>';



    // console.log(content);
    // THIS IS COMMING FROM DATABASE TABLE 
    const layoutArray = JSON.parse(layout);
    const pvBlockElement = JSON.parse(content);
    const pvSibling = JSON.parse(sibling);
    // console.log("Sibling - ",pvSibling); 
    // console.log("pvBlockElement - ", pvBlockElement);
    //console.log("Layout - ",layoutArray);
    // //console.log("Header img: ", headerImg);


    const previewDropZone = document.getElementById('drop-zone');
    const pvTemplateWrapper = document.querySelector('.template-wrapper')
    const pvTemplateLinks = document.getElementsByTagName('a');
    // PREVIEW PAGE VARIABLES START 
    // BG COLOR 
    pvTemplateWrapper.style.background = pvBgColor;
    try {
        // LINK COLOR CHANGE 
        for (let pvTL of pvTemplateLinks) {
            pvTL.style.color = pvlinkColors;
        }
    } catch (err) {
        //console.log(err);
    }




    // APPENDING ALL BLOCK INTO RIGHT COL AND DIV
    // SORT ALL ELEMENT IN ASSENDING ORDER BY COLUMN NUMBER
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    const assendingBlockCol = pvBlockElement.sort((a, b) => a.columnNumber - b.columnNumber);
    const assendingSibling = pvSibling.sort((a, b) => a.colNum - b.colNum);
    const assendingLayout = layoutArray.sort((a, b) => a.rowID - b.rowID);
    // //console.log("Sibling - ",assendingSibling); //console.log("pvBlockElement - ",assendingBlockCol); //console.log("Layout - ",assendingLayout);
    // console.log(assendingLayout);

    try {
        assendingLayout.forEach((lAr, rIdx) => {
            // MAKING ROW 
            if (lAr.rowID) {
                const pvRowDiv = document.createElement('div');
                setAttributes(pvRowDiv, { 'class': 'drop-row', "id": `row-${rowID}` });
                for (let i = 0; i < lAr.rowWithColumn; i++) {
                    const pvColDiv = document.createElement('div');
                    switch (lAr.rowWithColumn) {
                        case 1:
                            setAttributes(pvColDiv, { 'class': 'one-column-div', 'id': `one-col-${i}-${lAr.rowID}` });
                            break;
                        case 2:
                            setAttributes(pvColDiv, { 'class': 'two-column-div', 'id': `two-col-${i}-${lAr.rowID}` });
                            break;
                        case 3:
                            setAttributes(pvColDiv, { 'class': 'three-column-div', 'id': `three-col-${i}-${lAr.rowID}` });
                            break;
                        default:
                            pvColDiv.setAttribute('class', 'one-column-div');
                            break;
                    }
                    // MAKING COLUMN 
                    pvRowDiv.appendChild(pvColDiv);

                }
                rowID++;
                // MAKING ROW 
                previewDropZone.appendChild(pvRowDiv);
                // console.log("row - ", pvRowDiv);
            }


            // ADD  SPACE 
            if (lAr.afterRow) {
                // ADDING SPACE 
                const pvSpaceDiv = document.createElement('div');
                const pvPreviousRow = document.getElementById(`row-${lAr.afterRow}`);

                setAttributes(pvSpaceDiv, { "id": `spx-${lAr.afterRow}-after` });
                pvSpaceDiv.className = 'space space-row-grid';
                pvSpaceDiv.style.height = `${lAr.spaceRow}px`;
                pvPreviousRow.after(pvSpaceDiv);
            }







            // ADDING BUTTON AND ELEMENT 
            // //console.log("Row Id: ", lAr.rowID);
            // CHECK IT THERE IS NO SPACE 
            if (!lAr.afterRow) {
                assendingBlockCol.forEach((bEl, belIdx) => {
                    if (lAr.rowID === bEl.rowNumber) {
                        // ROW IS LOOPING PERFECTLY 
                        let pvSelectedElement = document.getElementById(`${rowNumToStr(lAr.rowWithColumn)}-col-${bEl.columnNumber - 1}-${bEl.rowNumber}`);
                        if (bEl.blockElement.name === "txtBlockContent") {
                            pvSelectedElement.innerHTML = invalidToValidHtml(bEl.blockElement.blockHtml);
                        } else if (bEl.blockElement.name === "imgBlockContent") {
                            // //console.log(pvSelectedElement);


                            const pvImgHyerLink = document.createElement('a');
                            let openNewTab = null;
                            bEl.blockElement.imgNewTab === true ? openNewTab = "_blink" : openNewTab = "_self";
                            setAttributes(pvImgHyerLink, { "href": `${protocalValidate(bEl.blockElement.imgHyperlink)}`, "target": openNewTab });

                            const pvImgElement = document.createElement('img');
                            let defaultImg = `https://email-template-nodejs.s3.ca-central-1.amazonaws.com/${bEl.blockElement.imgUrl}`;
                            if (bEl.blockElement.imgUrl === undefined || bEl.blockElement.imgUrl === null || bEl.blockElement.imgUrl === "/img/empty-image.png") {
                                defaultImg = "/img/empty-image.png"
                            }

                            const inlineHW = "height:auto; width: 96%;";

                            setAttributes(pvImgElement, { "id": `img-${bEl.rowNumber}-${bEl.columnNumber}`, "src": `${defaultImg}`, "style": inlineHW });
                            pvImgElement.className = "content img-content-block";
                            pvImgHyerLink.append(pvImgElement);
                            pvSelectedElement.append(pvImgHyerLink);

                        } else if (bEl.blockElement.name === "socialBlockContent") {
                            const pvIcons = document.createElement("div");
                            setAttributes(pvIcons, { "id": `icon-${bEl.rowNumber}-${bEl.columnNumber}` });
                            pvIcons.className = "content icon-content-block";
                            const iconHolder = createSocialIcons(pvIcons, `${protocalValidate(bEl.blockElement.socialFbHyperlink)}`, `${protocalValidate(bEl.blockElement.socialTwitterHyperlink)}`, `${protocalValidate(bEl.blockElement.socialInstagramHyperlink)}`);
                            pvSelectedElement.append(iconHolder);
                            if (lAr.rowWithColumn === 1) {
                                pvSelectedElement.style.height = "8em";
                            }


                        }
                    }
                });





                // ADDING BUTTON 
                // MATCHING ROW ID 
                assendingSibling.forEach((sEl, bIdx) => {

                    if (lAr.rowID === sEl.rowNum) {
                        let pvSelectedElement = document.getElementById(`${rowNumToStr(lAr.rowWithColumn)}-col-${sEl.colNum - 1}-${sEl.rowNum}`);
                        let pvSBtnRound;
                        sEl.btnRound == true ? pvSBtnRound = "8px" : pvSBtnRound = "0";
                        // ON CLICK EVENT FOR JAVASCRIPT
                        let pvCorrectHyperlink = null;
                        sEl.btnHyperlink !== null ? pvCorrectHyperlink = protocalValidate(sEl.btnHyperlink) : pvCorrectHyperlink = "#";

                        let pvOnClickEvent = null;
                        sEl.btnOpenNewTab === true ? pvOnClickEvent = "_blink" : pvOnClickEvent = "_self";



                        const pvSiblingBtn = document.createElement('button');
                        setAttributes(pvSiblingBtn, { "id": `btn-${sEl.rowNum}-${sEl.colNum}` });
                        pvSiblingBtn.className = "content btn-content-block";
                        pvSiblingBtn.style.backgroundColor = sEl.btnBgColor;
                        pvSiblingBtn.style.fontFamily = sEl.btnFontFamily;
                        pvSiblingBtn.style.fontSize = sEl.btnFontSize;
                        pvSiblingBtn.style.borderRadius = pvSBtnRound;
                        pvSiblingBtn.style.float = sEl.btnAlign;
                        pvSiblingBtn.style.width = "fit-content";

                        const pvSiblingBtnLink = document.createElement('a');
                        setAttributes(pvSiblingBtnLink, { "href": pvCorrectHyperlink, "target": pvOnClickEvent, "class": "btn-content-link" });
                        pvSiblingBtnLink.textContent = sEl.btnContent;
                        pvSiblingBtnLink.style.color = sEl.btnTextColor;


                        pvSiblingBtn.append(pvSiblingBtnLink);

                        pvSelectedElement.appendChild(pvSiblingBtn);
                    }

                });





            }



        });
        // let headerImgUrl = `https://email-template-nodejs.s3.ca-central-1.amazonaws.com/${headerImg}`;
        // headerImage.setAttribute("src", headerImgUrl);
        if (headerImg === null || headerImg === "null") {
            console.log("Header img: ", headerImg);
            headerImgPreview.setAttribute('src', "/img/header.png");
            headerImgPreview.style.display = 'none';
            // deleteHeaderImg.style.display = 'none !important';
            deleteHeaderImg.style.display = 'none';
            headerImage.style.display = "none";
            headerImage.setAttribute('src', "/img/header.png");
        } else {
            headerImg === "default-header.jpg" ? headerImage.src = "/img/header.png" : headerImage.src = imgKeyToLink(headerImg);
        }
        // //console.log(headerImage);
    } catch (err) {
        //console.log(err);
    }



    try {
        // STYLING ELEMENTS INSIDE DROP ZONE 
        // TEXT CONTENT EXIT FALSE FOR PREVIEW 
        // const pvTextContent = document.querySelectorAll('.txt-content-block');
        const droppedRow = document.querySelectorAll('.drop-row');
        droppedRow.forEach((dr, dri) => dr.style.height = "fit-content");
        // //console.log(dropColumnZone.translate);
        // dropColumnZone.style.height = "500px";
        // height: 50em;
        const oneColDiv = document.querySelectorAll('.one-column-div');
        const twoColDiv = document.querySelectorAll('.two-column-div');
        const threeColDiv = document.querySelectorAll('.three-column-div');
        oneColDiv.forEach((ocd, ocdI) => {
            // NOT FOR SOCIAL CONTENT 
            if (ocd.hasChildNodes()) {
                // //console.log(ocd.childNodes[0].className);
                if (ocd.childNodes[0].classList[1] !== "icon-content-block") {
                    ocd.style.height = "fit-content";
                    // ocd.style.height = "45px";
                }
            }
        });
        twoColDiv.forEach((tcd, tcdI) => tcd.style.height = "fit-content");
        threeColDiv.forEach((trcd, trcdI) => {
            if (trcd.hasChildNodes()) {
                trcd.childNodes[0].parentElement.style.height = "fit-content";
                // //console.log(trcd.childNodes[0].parentElement);
                // trcd.childNodes.forEach((trcdc, trcdcI) => {
                //     //console.log(trcdc.parentElement);
                //     trcdc.parentElement.style.height = "fit-content";
                // });
                // if (trcd.childNodes[0].hasChildNodes()) {
                //     //console.log(trcd.childNodes[0]);
                // }

                // trcd.childNodes[0].style.height = "fit-content";

            } else {
                trcd.style.height = "fit-content"

            }
        });
        // //console.log(oneColDiv);

        // droppedRow.style.height = "fit-content";
        // const twoCols = document.querySelectorAll(".two-column-div");
        // twoCols.forEach((tc, tci) => tc.style.height = "100%");

        // pvTextContent.forEach(txtCnt => {
        //     txtCnt.setAttribute("contenteditable", false);
        //     // if (txtCnt.getBoundingClientRect().height > 172) {
        //     //     droppedRow.style.height = "fit-content"; // IN PREVIEW
        //     // }
        // });

    } catch (styleErr) {
        //console.log(styleErr);
    }

}




// MAIN FUNCTIONS 8
function previewDefaultStyling() {
    dropColumnZone.style.minHeight = "100%"; // IN PREVIEW
    // dropColumnZone.style.border = "1px solid rgb(15, 48, 80)"; // IN PREVIEW
    templateWrapper.style.border = "1px solid rgb(15, 48, 80)";





    // REMOVING BORDER STYLES 
    // dropColumnZone.style.border = "none";
    // dropColumnZone.style.height = "100%"; // IN PREVIEW
    const droppedRow = document.querySelectorAll('.drop-row');
    droppedRow.forEach((sd, sdi) => sd.style.border = "none");
    const spaceDiv = document.querySelectorAll('.space');
    spaceDiv.forEach((sd, sdi) => sd.style.background = "none");
    const oneCol = document.querySelectorAll('.one-column-div');
    oneCol.forEach((sd, sdi) => sd.style.border = "none");
    const twoCol = document.querySelectorAll('.two-column-div');
    twoCol.forEach((sd, sdi) => sd.style.border = "none");
    const threeCol = document.querySelectorAll('.three-column-div');
    threeCol.forEach((sd, sdi) => sd.style.border = "none");
    const pvTextContent = document.querySelectorAll('.txt-content-block');
    pvTextContent.forEach(txtCnt => txtCnt.setAttribute("contenteditable", false));
}



// MAIN FUNCTIONS 9
function editPagePreset() {
    inputTitle.value = templateTitle;
    // CONVERT STRING TO JSON 
    const newRowList = JSON.parse(layout);
    const newPositionElement = JSON.parse(content);
    const newBtnSibling = JSON.parse(sibling);

    const droppedRow = document.querySelectorAll('.drop-row');
    droppedRow.forEach((dr, dri) => dr.style.height = "fit-content");
    // SET HEADER IMAGE 
    try {
        // PRESET FROM DATABASE

        if (headerImg === "default-header.jpg") {
            headerImage.setAttribute("src", "/img/header.png");
            headerImgPreview.setAttribute("src", "/img/header.png");
        } else if (headerImg === null || headerImg === "null") {
            console.log("Header img: ", headerImg);
            headerImgPreview.setAttribute('src', "/img/header.png");
            headerImgPreview.style.display = 'none';
            // deleteHeaderImg.style.display = 'none !important';
            deleteHeaderImg.style.display = 'none';
            headerImage.style.display = "none";
            headerImage.setAttribute('src', "/img/header.png");
        } else {
            headerImage.setAttribute("src", imgKeyToLink(headerImg));
            headerImgPreview.setAttribute("src", imgKeyToLink(headerImg));
        }


        typeof templateTitle !== 'undefined' ? inputTitle.value = templateTitle : inputTitle.value = title;
        templateBGColorInput.value = pvBgColor;
    } catch (pageErr) {
        //console.log(pageErr)
    }

    // COPY FROM DATABASE AND ASSIGN TO EXISTING ARRAY OF THIS FILE 
    rowList = newRowList.slice(0);
    positionElement = newPositionElement.slice(0);
    siblingButtonList = newBtnSibling.slice(0);


    // const allLinks = document.querySelector('.wrapper').getElementsByTagName('a');

    // for (link of allLinks) {
    //     setAttributes(link, { "href": "#", "target": "" });
    // }
}




















// PREVIEW PAGE 
if (currentPath === previewPage && window.location.pathname !== "/template") {
    //console.log("Preview page");
    previewDropZoneTemplate();
    previewDefaultStyling();



    // EDITOR PAGE 
} else if (currentPath === editorPage) {
    //console.log("Editor page");
    columnDragAndDrop();
    blockDragAndDrop();
    rightBarElementShowHidePreset();
    rightBarPropsUpdate();
    templatePropsCng();
    backendAndDataBase(`${websiteDomain}/template/add`, "POST");
    // if (submitted === false) {
    //     // PREVENT TO SET 
    //     window.addEventListener('beforeunload', function (e) {
    //         // Cancel the event
    //         e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    //         // Chrome requires returnValue to be set
    //         e.returnValue = 'Save it and leave otherwise it can be undone';
    //     });
    // }


    // EDIT PAGE 
} else if (currentPath === editPage) {
    previewDropZoneTemplate();
    editPagePreset();
    columnDragAndDrop();
    blockDragAndDrop();
    rightBarElementShowHidePreset();
    rightBarPropsUpdate();
    templatePropsCng();
    // /template/delete/<%- template.id %>?_method=DELETE"
    backendAndDataBase(`${websiteDomain}/template/edit/${templateID}/?_method=PUT`, "PUT");
    // //console.log("EDIT");
} else if (currentPath === templateIndex) {
    console.log("index");
} else {
    console.log("Not a template ");
}







// if (document.querySelectorAll('.txt-content-block').clientHeight > 262) {
//     //console.log(document.querySelectorAll('.txt-content-block'));
// }



