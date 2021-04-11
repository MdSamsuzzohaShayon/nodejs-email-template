// USING THE RIGHT CODE FOR RIGHT PAGE THIS IS VERY IMPORTANT 
const findPath = window.location.pathname.toString().split('/');
const currentPath = findPath[2];



// EDITOR PAGE VARIABLES START 
// TITLE 
const inputTitle = document.getElementById('title');
const saveButton = document.getElementById('save-btn');
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
let websiteDomain = "http://localhost:4000", defaultFbLink = 'fb.com/md.shayon.148', defaultTwitterLink = 'twitter.com/shayon_md', defaultInstaLink = 'https://www.instagram.com/md_shayon/';

// DATABASE DESIGN START 
// THIS SOULD BE ADD TO THE DATABASE - COUNT ROW AND COLUMNS 
// TITLE OF THE TEMPLATE 
let title = null;
let submitted = false;
// THIS ROW LIST WOULD BE ANOTHER DATABASE TABLE 
let rowList = []; // THIS IS FOR TRACKING ROW DETAIL - FOR EXAMPLE - FIRST ROW WITH 3 COLUMN, 2ND ROW WITH ONE COLUMN, 3RD COLUMN WITH 2 COLUMN
let rowID = 1; // AUTO INCREMENT
let rowWithColumn;  // WHICH ROW IS SELECTING , 1 COLUMN ROW , 2 COLUMN ROW OR 3 COLUMN ROW
let positionElement = [];   // THIS IS FOR TRACKING WHICH WHICH BLOCK ELEMENT IS HOLDING WHICH POSITION - FOR EXAMPLE IMAGE HOLDER IS TAKING ROW-2 AND COLUMN 2
let siblingButtonList = new Array();

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
let txtBlockElement = null;

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







/*
// DECLARING VARIABLES FOR DIFFRENT PAGE 
if (currentPath === "preview") {

} else if (currentPath === "editor") {

} else if (currentPath === "edit") {
    console.log("EDIT");
} else {
    console.log("Not a template ");
}
*/



// EXTRA HELPING FUNCTIONS START
// HELPING FUNCTION 2
const imgUploadHandler = (imgFile, imgSrcUrl) => {
    if (selectedRow !== null && selectedCol !== null && !templateSelected) {
        if (imgFile) {
            // console.log("rc: ", selectedRow, selectedCol);
            if (imgFile.type == "image/jpeg" || imgFile.type == "image/jpg" || imgFile.type == "image/png" || imgFile.type == "image/gif") {
                // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
                const reader = new FileReader();
                reader.addEventListener('load', function (le) {
                    imgSrcUrl.forEach((isu, i) => setAttributes(isu, { 'src': le.target.result }));
                    positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].blockElement.imgUrl = "le.target.result"; } });
                });
                reader.readAsDataURL(imgFile);
                formData.append("img-" + selectedRow + '-' + selectedCol, imgFile);
                // formData.append("img-1-1", imgFile);
            } else {
                alert('Use a supported image file (.png / .jpeg / .gff / .jpg )');
            }
        } else {
            console.log('no img');
        }
    } else {
        if (imgFile) {
            // console.log("rc: ", selectedRow, selectedCol);
            if (imgFile.type == "image/jpeg" || imgFile.type == "image/jpg" || imgFile.type == "image/png" || imgFile.type == "image/gif") {
                const reader = new FileReader();
                reader.addEventListener('load', function (le) {
                    imgSrcUrl.forEach((isu, i) => setAttributes(isu, { 'src': le.target.result }));
                });
                reader.readAsDataURL(imgFile);
                formData.append("header-img", imgFile);
            } else {
                alert('Use a supported image file (.png / .jpeg / .gff / .jpg )');
            }
        } else {
            console.log('no img');
        }
    }
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
    switch (rowElementId) {
        case 'row-1':
            rowNumber = 1;
            break;
        case 'row-2':
            rowNumber = 2;
            break;
        case 'row-3':
            rowNumber = 3;
            break;
        default:
            break;
    }
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
// EXTRA HELPING FUNCTIONS ENDS



























// MAIN FUNCTION 1
function columnDragAndDrop() {
    let dropableColumn = null;

    draggableColumn.forEach((column, index) => {
        column.addEventListener('dragstart', (e) => {
            const blockCol = e.toElement.classList[0];
            if (blockCol) {
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
    contentBlockCol.forEach((blockCol, index) => {
        // DRAGABLE BLOCK
        blockCol.addEventListener('dragstart', (e) => {
            if (e.toElement.classList[1] === "spx-holder") {
                dropableColumn = "space-row-grid";
            }
        });
    });

    // DROPZONE EVENTS START 
    dropColumnZone.addEventListener("dragover", function (e) {
        e.preventDefault();
    }, false);
    dropColumnZone.addEventListener('drop', e => {
        let newDiv = document.createElement('div');
        // COLUMN ARE ONLY ABLE TO DROP INTO DROP ZONE (ID)
        if (e.toElement.id === 'drop-zone' && dropableColumn !== "space-row-grid") {
            // PREVENT TO ADD MORE THAN 3 ROW 
            if (rowList.length < 5) {
                if (dropableColumn === "col-1-grid" || dropableColumn === "col-2-grid" || dropableColumn === "col-3-grid" || dropableColumn === "space-row-grid") {
                    setAttributes(newDiv, { "class": "drop-row", "id": `row-${rowID}` });
                    // ADD DEFFERENT TYPE OF STYLING FOR DEFFERENT TYPE OF COLUMN ELEMENT 
                    switch (dropableColumn) {
                        case 'col-1-grid':
                            // ADD 1 COLUMN INSIDE A DIV
                            const oneColumnDiv = document.createElement('div');
                            setAttributes(oneColumnDiv, { "class": "one-column-div", "id": 'one-col-0' });
                            newDiv.appendChild(oneColumnDiv);
                            rowWithColumn = 1;
                            break;
                        case 'col-2-grid':
                            // ADD 2 COLUMN INSIDE A DIV 
                            for (let i = 0; i < 2; i++) {
                                const twoColumnDiv = document.createElement('div');
                                setAttributes(twoColumnDiv, { "class": "two-column-div", "id": `two-col-${i}` });
                                newDiv.appendChild(twoColumnDiv);
                                rowWithColumn = 2;
                            }
                            break;
                        case 'col-3-grid':
                            // ADD 3 COULMN INSIDE A DIV
                            for (let i = 0; i < 3; i++) {
                                rowWithColumn = 3;
                                const threeColumnDiv = document.createElement('div');
                                setAttributes(threeColumnDiv, { "class": "three-column-div", "id": `three-col-${i}` });
                                newDiv.appendChild(threeColumnDiv);
                            }
                            break;

                        default:
                            dropableColumn = null;
                            break;
                    };


                    dropColumnZone.appendChild(newDiv);
                    rowList.push({ rowID, rowWithColumn });
                    // EVERYTIME WHEN WE ADD A ROW WE WILL ADD 1
                    rowID++;

                    // MAKE DROPABLE COLUMN NULL ONCE AGAIN SO IT WILL CHECK THE NEXT ITEM 
                    dropableColumn = null;
                }
            }
        } else {
            console.log("outside of drop zone");
        }
        // DROP SPACE BLOCK ELEMET INTO DROPZONE OR AFTER ROW
        if (e.toElement.id === 'drop-zone' && dropableColumn === 'space-row-grid') {
            // DROPPING THE ELEMENT INTO A CURRECT POSITION 
            let spxID = rowID - 1;
            setAttributes(newDiv, { "id": "spx-" + spxID + '-' + 'after' });   //  "txt-" + rowNumber + '-' + columnNumber 
            newDiv.className = 'space space-row-grid';
            dropColumnZone.appendChild(newDiv);
            rowList.push({ afterRow: spxID, spaceRow: 12 });
        }
        if (e.target.parentElement.className === 'drop-row' && dropableColumn === 'space-row-grid') {
            // GETTING ELEMENT HEIGHT 
            let elementHeight = e.target.parentElement.offsetHeight;
            let rect = e.target.parentElement.getBoundingClientRect();
            const y = e.clientY - rect.top;
            newDiv.className = 'space space-row-grid';
            let middleOfY = elementHeight / 2;
            let rowNum = stringIdToIdNum(e.target.parentElement.id, 1);
            if (y > middleOfY) {
                // GETTING ROW NUMBER AND COLUMN NUMBER 
                setAttributes(newDiv, { "id": "spx-" + rowNum + '-' + 'after' });   //  "txt-" + rowNumber + '-' + columnNumber 
                e.target.parentElement.after(newDiv);
                rowList.push({ afterRow: rowNum, spaceRow: 12 });
            }
            if (y < middleOfY) {
                // INSERT BEFORE 
                rowNum--;
                setAttributes(newDiv, { "id": "spx-" + rowNum + '-' + 'after' });   //  "txt-" + rowNumber + '-' + columnNumber 
                e.target.parentElement.previousSibling.after(newDiv);
                rowList.push({ afterRow: rowNum, spaceRow: 12 });
            }
        }
        dropableColumn = null;
    });
    // DROPZONE EVENTS ENDS
}



// MAIN FUNCTION 2
function blockDragAndDrop() {
    let dropableBlock = null;
    let rowNumber;
    let columnNumber;
    let blockElement = null;

    contentBlockCol.forEach((blockCol, index) => {
        // DRAGABLE BLOCK
        blockCol.addEventListener('dragstart', (e) => {
            // CHECK WHICH BLOCK WE ARE DRAGGING AND DROPPING 
            const blockContent = e.toElement.classList[0];
            if (blockContent) {
                // console.log("Block content: ", blockContent);
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
    document.addEventListener('dragover', e => {
        // console.log(e.target);
        e.preventDefault();
    });
    document.addEventListener('drop', (e) => {
        // ONLY COLLUMNS ARE VALID TO DROP INTO DROP ZONE 
        if (e.toElement.id !== 'drop-zone' && dropableBlock !== 'spx-holder') {
            // console.log(e.toElement.id);
            let dropableColumn = e.target.className;
            let dropInsideImgTxt = e.target.classList[1];
            try {
                // ONLY DROP WHEN DROPABLE ELEMENT IS COLUMN 
                if (dropableColumn === "one-column-div" || dropableColumn === "two-column-div" || dropableColumn === "three-column-div" || dropInsideImgTxt == "img-content-block" || dropInsideImgTxt == "txt-content-block") {
                    // CHECK FOR WHICH COLUMN WE ARE DROPING THE BLOCK ELEMENT 
                    if (dropableBlock === "img-holder") {
                        if (dropableColumn === "one-column-div" || dropableColumn === "two-column-div" || dropableColumn === "three-column-div") {
                            //VARIABLE
                            rowNumber = convertRowIdToNumber(e.path[1].id);
                            columnNumber = convertColIdToNumber(e.toElement.id);
                            // CREATING IMAGE 
                            let imgID = `"img-${rowNumber + '-' + columnNumber}"`;
                            imageBlockElment = `<img src="${imgDefaultUrl}" class="content img-content-block" alt="Image" id=${imgID}>`;
                            e.toElement.innerHTML = imageBlockElment;
                            // DATABASE AND VARIABLE 
                            blockElement = dropableBlock;
                            positionElement.push({ rowNumber, columnNumber, blockElement: { name: "imgBlockContent", blockHtml: imageBlockElment, imgHyperlink: websiteDomain, imgNewTab: false } });
                        }
                    } else if (dropableBlock === "txt-holder") {
                        if (dropableColumn === "one-column-div" || dropableColumn === "two-column-div" || dropableColumn === "three-column-div") {
                            // CREATING REXT 
                            rowNumber = convertRowIdToNumber(e.path[1].id);
                            columnNumber = convertColIdToNumber(e.toElement.id);
                            let txtBlockElement = null;
                            const newBlockCol = document.createElement('div');
                            setAttributes(newBlockCol, { "id": "txt-" + rowNumber + '-' + columnNumber, contenteditable: true });   //  "txt-" + rowNumber + '-' + columnNumber 
                            newBlockCol.className = 'content txt-content-block';
                            newBlockCol.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil corrupti natus eos in a voluptas incidunt porro quis autem quo!';
                            // CHANGING TEXT EVENT 
                            newBlockCol.addEventListener('input', e => {
                                txtBlockElement = e.target.outerHTML;
                                positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].blockElement.blockHtml = txtBlockElement; } });
                            });
                            e.toElement.appendChild(newBlockCol);
                            // THIS IS ONLY FOR DATABASE 
                            text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil corrupti natus eos in a voluptas incidunt porro quis autem quo!";
                            txtBlockElement = `<div class="content txt-content-block" onclick="txtChangeHandler" contenteditable="true" id="txt-${rowNumber + '-' + columnNumber}">${text}</div>`;
                            blockElement = dropableBlock;
                            positionElement.push({ rowNumber, columnNumber, blockElement: { name: "txtBlockContent", blockHtml: txtBlockElement } });
                        }
                    } else if (dropableBlock === "btn-holder") {
                        // THIS BUTTON SHOULD ONLY INSERT INTO IMAGE OR TEXT
                        if (dropInsideImgTxt === "img-content-block" || dropInsideImgTxt === "txt-content-block" || e.toElement.children[0].classList[1] === "img-content-block" || e.toElement.children[0].classList[1] === "txt-content-block") {
                            // INSERT A SIBLING AFTER 
                            const newBlockCol = document.createElement('button');
                            rowNumber = convertRowIdToNumber(e.path[1].id);
                            columnNumber = convertColIdToNumber(e.toElement.id);

                            function insertButtonElement(elementAfter) {
                                if (e.target.parentElement.className === 'one-column-div' || dropableColumn === "one-column-div") {
                                    // LEFT POSITION ELEMENT FROM HERE 
                                    setAttributes(newBlockCol, { "id": "btn-" + rowNumber + '-' + columnNumber });   //  "txt-" + rowNumber + '-' + columnNumber 
                                    newBlockCol.className = "content btn-content-block";
                                    newBlockCol.textContent = btnDefaultTxt;
                                    elementAfter.after(newBlockCol)
                                } else if (e.target.parentElement.className === 'two-column-div' || dropableColumn === "two-column-div") {
                                    // RIGHT POSITION ELEMENT FROM HERE 
                                    setAttributes(newBlockCol, { "id": "btn-" + rowNumber + '-' + columnNumber });   //  "txt-" + rowNumber + '-' + columnNumber 
                                    newBlockCol.textContent = btnDefaultTxt;
                                    newBlockCol.className = "content btn-content-block";
                                    elementAfter.after(newBlockCol)
                                } else if (e.target.parentElement.className === 'three-column-div' || dropableColumn === "three-column-div") {
                                    // CENTER POSITION ELEMENT FROM HERE  
                                    setAttributes(newBlockCol, { "id": "btn-" + rowNumber + '-' + columnNumber });   //  "txt-" + rowNumber + '-' + columnNumber 
                                    newBlockCol.textContent = btnDefaultTxt;
                                    newBlockCol.className = "content btn-content-block";
                                    elementAfter.after(newBlockCol)
                                } else {
                                    console.log(e.target);
                                }
                            }
                            if (dropInsideImgTxt === "img-content-block" || dropInsideImgTxt === "txt-content-block") {
                                insertButtonElement(e.toElement);
                            } else {
                                insertButtonElement(e.toElement.childNodes[0]);
                            }
                            btnBlockElement = `<button class="content btn-content-block" id="btn-${rowNumber + '-' + columnNumber}" >${btnDefaultTxt}</button>`;
                            siblingButtonList.push({ rowNum: rowNumber, colNum: columnNumber, btnBgColor: "rgb(70, 133, 192)", btnTextColor: "rgb(15, 48, 80)", btnHyperlink: websiteDomain, btnOpenNewTab: false, btnRound: false, btnAlign: null, btnContent: "Preview", btnFontFamily: "Helvetica", btnFontSize: 12 });
                            // THIS WOULD NOT BE PUSH - THIS WOULD BE UPDATE WITH NEW
                        } else {
                            alert('this button is not dropable here');
                        }

                    } else if (dropableBlock === "social-holder") {
                        // The Social Media Icons can only be dragged to a one - column or a two - column layout
                        if (dropableColumn === "one-column-div" || dropableColumn === "two-column-div") {
                            rowNumber = convertRowIdToNumber(e.path[1].id);
                            columnNumber = convertColIdToNumber(e.toElement.id);
                            // CREATING THREE SOCIAL ICON 
                            iconBlockElement = `<div class="content icon-content-block" id="icon-${rowNumber + '-' + columnNumber}" ><a href="${iconLink}" class="social-icon-content"><img class="social-icon-img" src="${fb_icon}" ></a><a href="${iconLink}" class="social-icon-content"><img class="social-icon-img" src="${twitter_icon}" ></a><a href="${iconLink}" class="social-icon-content"><img class="social-icon-img" src="${instagram_icon}" ></a><div />`;
                            e.toElement.innerHTML = (iconBlockElement);
                            blockElement = dropableBlock;
                            positionElement.push({ rowNumber, columnNumber, blockElement: { name: "socialBlockContent", blockHtml: iconBlockElement, socialFbHyperlink: defaultFbLink, socialTwitterHyperlink: defaultTwitterLink, socialInstagramHyperlink: defaultInstaLink } });
                        } else {
                            alert("Social icon can't drop into three column!");
                        }
                    } else {
                        console.log('Not creating CONTENT element');
                    }
                } else {
                    console.log("Not dropable column");
                }
            } catch (err) {
                console.log(err);
            }
        };
    });
}



// MAIN FUNCTION 3
function rightBarElementShowHide() {
    document.addEventListener('click', e => {
        let idString = null;
        // IF SOMEONE CLICK ON ANY BLOCK THE PROPERTY BAR WILL OPEN (ALL BLOCK EXCEPT SPACE BLOCK)
        if (e.toElement.classList[0] === 'content' || e.toElement.className === 'social-icon-content' || e.toElement.className === 'social-icon-img') {
            templateSelected = false;
            if (e.toElement.className === 'social-icon-content' || e.toElement.className === 'social-icon-img') {
                if (e.toElement.className === 'social-icon-img') {
                    idString = e.toElement.parentElement.parentElement.id;
                }
                if (e.toElement.className === 'social-icon-content') {
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
                allProperties.forEach(ap => { ap.style.display = 'none' });
                imgProps.style.display = 'block';
                // txt-content-block
            } else if (e.toElement.classList[1] === "txt-content-block") {
                allProperties.forEach(ap => { ap.style.display = 'none' });
                txtProps.style.display = 'block';
            } else if (e.toElement.className === 'social-icon-content' || e.toElement.className === 'social-icon-img') {
                allProperties.forEach(ap => { ap.style.display = 'none' });
                socialProps.style.display = 'block';
            } else if (e.toElement.classList[1] === "btn-content-block") {
                allProperties.forEach(ap => { ap.style.display = 'none' });
                btnProps.style.display = 'block';
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
        }

        // IF SOMEONE CLICK ON ROW HE WILL BE ABLE TO CHANGE ROW PROPS 
        if (e.target.className === 'drop-row') {
            propertiesBar.style.display = 'block';
            blockElementBar.style.display = 'none';
            allProperties.forEach(ap => { ap.style.display = 'none' });
            rowProps.style.display = 'block';
            selectedRow = stringIdToIdNum(e.toElement.id, 1);
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
    });

}


// MAIN FUNCTION 4
function rightBarProps() {

    // SUB FUNCTION 1
    function imgPropertiesUpdate() {
        inputImg.addEventListener('change', e => {
            // const previewTempImg = document.querySelector('.img-content-block');
            const templateImgPreview = document.getElementById(`img-${selectedRow}-${selectedCol}`);
            imgUploadHandler(e.target.files[0], [previewImg, templateImgPreview]);  // Working but need to save in db
        });
        let setImgNewTab = false;
        imgLink.addEventListener('change', (e) => {
            // BY USING SELECTED ROW AND COL SEARCH ITEM FROM POSITION ELEMENT AND UPDATE 
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].blockElement.imgHyperlink = e.target.value; } });
        });
        imgNewTab.addEventListener('change', async e => {
            if (e.target.value == 'on') setImgNewTab = true;
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].blockElement.imgNewTab = setImgNewTab; } });
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
        // let btnBGColor = 'green', btnFontSize = 12;
        let btnNewTab = false, btnRoundShape = false;

        btnFontSizeInput.addEventListener('change', e => {
            const cngBtn = document.getElementById(`btn-${selectedRow}-${selectedCol}`);
            cngBtn.style.fontSize = e.target.value + 'px';

            // const siblingBtnObj = JSON.parse(positionElement[index].blockElement.siblingButton);
            // siblingBtnObj.btnFontSize = e.target.value 
            siblingButtonList.forEach((sBl, sIdx) => { if (sBl.rowNum === selectedRow) { sBl.btnFontSize = e.target.value } });
        });
        btnFontFamilyInput.addEventListener('change', e => {
            const cngBtn = document.getElementById(`btn-${selectedRow}-${selectedCol}`);
            cngBtn.style.fontFamily = e.target.value;
            siblingButtonList.forEach((sBl, sIdx) => { if (sBl.rowNum === selectedRow) { sBl.btnFontFamily = e.target.value } });
        });
        btnBGColorInput.addEventListener('change', e => {
            const cngBtn = document.getElementById(`btn-${selectedRow}-${selectedCol}`);
            cngBtn.style.backgroundColor = e.target.value;
            siblingButtonList.forEach((sBl, sIdx) => { if (sBl.rowNum === selectedRow) { sBl.btnBgColor = e.target.value } });
        });
        btnTxtColorInput.addEventListener('change', e => {
            const cngBtn = document.getElementById(`btn-${selectedRow}-${selectedCol}`);
            cngBtn.style.color = e.target.value;
            siblingButtonList.forEach((sBl, sIdx) => { if (sBl.rowNum === selectedRow) { sBl.btnTextColor = e.target.value } });
        });
        btnTextContentInput.addEventListener('change', e => {
            const cngBtn = document.getElementById(`btn-${selectedRow}-${selectedCol}`);
            cngBtn.textContent = e.target.value;
            siblingButtonList.forEach((sBl, sIdx) => { if (sBl.rowNum === selectedRow) { sBl.btnContent = e.target.value } });
        });
        btnHyperlinkInput.addEventListener('change', e => {
            siblingButtonList.forEach((sBl, sIdx) => { if (sBl.rowNum === selectedRow) { sBl.btnHyperlink = e.target.value } });
        });
        btnNewTabInput.addEventListener('change', e => {
            if (e.target.value == 'on') btnNewTab = true;
            siblingButtonList.forEach((sBl, sIdx) => { if (sBl.rowNum === selectedRow) { sBl.btnOpenNewTab = btnNewTab } });
        });
        btnShapeInput.addEventListener('change', e => {
            if (e.target.value === 'on') btnRoundShape = true;
            const cngBtn = document.getElementById(`btn-${selectedRow}-${selectedCol}`);
            if (btnRoundShape === true) {
                cngBtn.style.borderRadius = '8px';
            }
            siblingButtonList.forEach((sBl, sIdx) => { if (sBl.rowNum === selectedRow) { sBl.btnRound = btnRoundShape } });
        });
        btnAlignElement.forEach((bae, i) => {
            bae.addEventListener('click', e => {
                const cngBtn = document.getElementById(`btn-${selectedRow}-${selectedCol}`);
                cngBtn.style.float = e.target.value + 'px';
                siblingButtonList.forEach((sBl, sIdx) => { if (sBl.rowNum === selectedRow) { sBl.btnAlign = e.target.value } });
                // positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].blockElement.siblingButton.btnAlign = e.target.outerText.toLowerCase().trim(); } });
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



    // NEED TO CHANGE DB PROPERTIES OF SIBLING BUTTON 
    function rowUpDownDelete() {
        // DELETE AN ROW 
        rowDelete.addEventListener('click', e => {
            const selectedRowElement = document.getElementById('row-' + selectedRow);
            const allNextEl = getNextAllElement(selectedRowElement);
            const allRowEl = document.querySelectorAll('.drop-row');
            try {
                const rowIdx = rowList.findIndex(rl => rl.rowID === selectedRow);
                rowList.splice(rowIdx, 1);
                // UPDATING DATABASE 
                rowList.forEach((rl, i) => {
                    if (rl.rowID > rowIdx) {
                        if (rl.rowID > 1) {
                            rl.rowID = rl.rowID - 1;
                        }
                        // CHANGE THE ID OF NEXT SIBLINGS 
                    }
                });
                selectedRowElement.remove();

                // SETTING ROW ID DYNAMICALLY 
                let idNum = selectedRow;
                // console.log("ID number: ", idNum);
                let i = 0;
                while (i < allNextEl.length) {
                    allNextEl[i].setAttribute('id', `row-${idNum}`);
                    idNum++;
                    i++
                }
            } catch (err) {
                console.log(err);
            }

            // EVERYTIME WE DELETE A ROW WE SHOULD SUBSTRACT ROW ID BY ONE 
            rowID--;
        });


        // ROW MOVE UP 
        rowMoveUp.addEventListener('click', (e) => {
            const selectedRowElement = document.getElementById(`row-${selectedRow}`);
            // CHECK IF THE SELECTED ELEMENT IS FIRST ELEMENT OR LAST ELEMENT 
            if (dropColumnZone.firstChild.id === selectedRowElement.id) {
                alert("First row can't be move up")
            } else {
                try {
                    if (selectedRowElement.previousSibling.classList[0] === 'space') {
                        // THIS IS FOR SKIPPING SPACE 
                        dropColumnZone.insertBefore(selectedRowElement, selectedRowElement.previousSibling.previousSibling);
                    } else {
                        // THERE IS NO SPACE IN NEXT SIBLING 
                        dropColumnZone.insertBefore(selectedRowElement, selectedRowElement.previousSibling);
                    }
                    if (selectedRowElement.id !== 'row-1') {
                        selectedRowElement.setAttribute('id', `row-${selectedRow - 1}`);
                        selectedRowElement.nextSibling.setAttribute('id', `row-${selectedRow}`);
                    }
                    // CHANGING ID 
                    if (selectedRowElement.hasChildNodes()) {
                        let i = 0;
                        let colNum = 1;
                        while (selectedRowElement.children.length > i) {
                            if (selectedRowElement.children[i].hasChildNodes()) {
                                selectedRowElement.children[i].childNodes.forEach((be, idx) => {
                                    let contentId = be.id.toString().substring(0, 3);
                                    if (contentId === 'ico') contentId = 'icon';
                                    be.setAttribute('id', `${contentId}-${selectedRow - 1}-${colNum}`);
                                });
                                selectedRowElement.nextSibling.children[i].childNodes.forEach((nbe, idx) => {
                                    let contentId = nbe.id.toString().substring(0, 3);
                                    if (contentId === 'ico') contentId = 'icon';
                                    nbe.setAttribute('id', `${contentId}-${selectedRow}-${colNum}`);
                                });
                                colNum++;
                                i++;
                            }
                        }
                    }
                } catch (err) {
                    console.log(err);
                }
                let previousRow = selectedRow - 1;
                positionElement.forEach((pl, index) => {
                    if (pl.rowNumber === previousRow) {
                        positionElement[index].rowNumber = selectedRow;
                    } else if (pl.rowNumber === selectedRow) {
                        console.log('match');
                        positionElement[index].rowNumber = selectedRow - 1;
                    }
                });
            }
        });

        // ROW MOVE DOWN 
        rowMoveDown.addEventListener('click', (e) => {
            const selectedRowElement = document.getElementById(`row-${selectedRow}`);
            if (dropColumnZone.lastChild.id === selectedRowElement.id) {
                alert("Last row can't be move down")
            } else {
                try {
                    console.log(selectedRowElement.id);
                    if (selectedRowElement.nextSibling.classList[0] === 'space') {
                        selectedRowElement.nextSibling.nextSibling.after(selectedRowElement);
                    } else {
                        selectedRowElement.nextSibling.after(selectedRowElement);
                    }
                    if (selectedRowElement.id !== dropColumnZone.lastChild.id) {
                        console.log("Selected id: ", selectedRow);
                        selectedRowElement.setAttribute('id', `row-${selectedRow + 1}`);
                        console.log("prev element: ", selectedRowElement.previousSibling);
                        selectedRowElement.previousSibling.setAttribute('id', `row-${selectedRow}`);
                    }
                } catch (err) {
                    console.log(err);
                }
                let nextRow = selectedRow + 1;
                positionElement.forEach((pl, index) => {
                    if (pl.rowNumber === nextRow) {
                        positionElement[index].rowNumber = selectedRow;
                    } else if (pl.rowNumber === selectedRow) {
                        positionElement[index].rowNumber = selectedRow + 1;
                    }
                });
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
}


// MAIN FUNCTION 6
function backendAndDataBase() {


    saveButton.addEventListener('click', async e => {
        e.preventDefault();
        // console.log(siblingButtonList);
        // FOR CHANGING TEXT CONTENT 
        await positionElement.forEach(pEl => {
            if (pEl.blockElement.name === "txtBlockContent") {
                console.log(pEl.rowNumber);
                pEl.blockElement.blockHtml = document.getElementById(`txt-${pEl.rowNumber}-${pEl.columnNumber}`).outerHTML;
            }
        });

        // CHANGING TITLE 
        await formData.append("title", inputTitle.value);
        await formData.append('bgColor', templateBGColorInput.value);
        await formData.append('linkColor', templateLinkColorInput.value);


        // // const positionObj = await new Map(positionElement);
        // // const newPositionObject = await Object.fromEntries(positionObj);
        // // const newPositionElement = await Object.assign({}, positionElement); // {0:"a", 1:"b", 2:"c"}

        await formData.append('layout', JSON.stringify(rowList));
        await formData.append('element', JSON.stringify(positionElement));
        await formData.append('sibling', JSON.stringify(siblingButtonList));



        // inputTitle.nodeValue = title;
        // console.log("Row list: ", rowList);
        // NEED TO DO SOME CHANGES IN POSITION ELEMENT 

        // console.log(positionElement);




        // JSON.stringify(positionElement, function replacer(key, value) { return value})    
        // await formData.append('layout', JSON.stringify(rowList));
        // await formData.append('element', JSON.stringify(positionElement, function replacer(key, value) { return value }));
        // console.log(positionElement);



        // //SUBMITTING DATATO THE SERVER 
        fetch(`${websiteDomain}/template/add`, {
            method: "POST",
            body: formData
        })
            .then(response => {
                console.log(response.json());
            })
            .catch(err => {
                console.log(err);
            });



        // IF SUBMITTED SUCCESSFULLY WI WILL REDIRECT SUCCESSFULLY 
        submitted = true;
        window.location.replace(websiteDomain + "/template/preview");
    });
}




// MAIN FUNCTION 7
function previewDropZoneTemplate() {
    // PREVIEW PAGE VARIABLES START 
    // let layout = '<%- docs.layout %>';
    // let content = '<%- docs.content %>';
    // let img = '<%- docs.bg_img %>';
    // let sibling = '<%- docs.sibling %>';


    // THIS IS COMMING FROM DATABASE TABLE 
    // const layoutArray = [{ "rowID": 1, "rowWithColumn": 3 }, { "rowID": 2, "rowWithColumn": 2 }, { "rowID": 3, "rowWithColumn": 1 }];
    const layoutArray = JSON.parse(layout);
    const pvBlockElement = JSON.parse(content);
    const pvSibling = JSON.parse(sibling);

    // console.log("Header img: ", headerImg);
    // console.log("Content: ", pvBlockElement);

    const previewDropZone = document.getElementById('drop-zone');
    const pvTemplateWrapper = document.querySelector('.template-wrapper')
    const pvTemplateLinks = document.getElementsByTagName('a');
    // PREVIEW PAGE VARIABLES START 
    // BG COLOR 
    pvTemplateWrapper.style.background = pvBgColor;
    // LINK COLOR CHANGE 
    for (let pvTL of pvTemplateLinks) {
        pvTL.style.color = pvlinkColors;
    }



    // MAKING ALL ROW AND COLUMN DIV 
    let rowID = 1;
    layoutArray.forEach((el, index) => {
        const pvRowDiv = document.createElement('div');
        if (el.rowID) {
            setAttributes(pvRowDiv, { 'class': 'drop-row', "id": `row-${rowID}` });
            for (let i = 0; i < el.rowWithColumn; i++) {
                const pvColDiv = document.createElement('div');
                switch (el.rowWithColumn) {
                    case 1:
                        setAttributes(pvColDiv, { 'class': 'one-column-div', 'id': `one-col-${i}` });
                        break;
                    case 2:
                        setAttributes(pvColDiv, { 'class': 'two-column-div', 'id': `two-col-${i}` });
                        break;
                    case 3:
                        setAttributes(pvColDiv, { 'class': 'three-column-div', 'id': `three-col-${i}` });
                        break;
                    default:
                        pvColDiv.setAttribute('class', 'one-column-div');
                        break;
                }
                // MAKING COLUMN 
                pvRowDiv.appendChild(pvColDiv);
            }
            rowID++;
        }


        // ADD  SPACE 
        if (el.afterRow) {
            // ADDING SPACE 
            const pvSpaceDiv = document.createElement('div');
            const pvPreviousRow = document.getElementById(`row-${el.afterRow}`);

            setAttributes(pvSpaceDiv, { "id": `spx-${el.afterRow}-after` });
            pvSpaceDiv.className = 'space space-row-grid';
            pvSpaceDiv.style.height = `${el.spaceRow}px`;
            pvPreviousRow.after(pvSpaceDiv);
        }

        // MAKING ROW 
        previewDropZone.appendChild(pvRowDiv);
    });



    // APPENDING ALL BLOCK INTO RIGHT COL AND DIV
    // SORT ALL ELEMENT IN ASSENDING ORDER BY COLUMN NUMBER
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    const assendingBlockCol = pvBlockElement.sort((a, b) => a.columnNumber - b.columnNumber);
    let blockRowId = 1;
    const assendingSibling = pvSibling.sort((a, b) => a.colNum - b.colNum);
    let siblingRowId = 1;
    layoutArray.forEach((lAr, rIdx) => {
        // CHECK IT THERE IS NO SPACE 
        if (!lAr.afterRow) {
            //  ADDING TEXT AND IMAGE 
            // MATCHING ROW ID 
            if (lAr.rowID === blockRowId) {
                // console.log(lAr.rowWithColumn);
                let blockColNum = 0;
                assendingBlockCol.forEach((bEl, bIdx) => {
                    if (lAr.rowID === bEl.rowNumber) {
                        // console.log("After assending: ", bEl);
                        let pvSelectedElement = document.getElementById(`${rowNumToStr(lAr.rowWithColumn)}-col-${bEl.columnNumber - 1}`);
                        // console.log(invalidToValidHtml(bEl.blockElement.blockHtml));
                        if (bEl.blockElement.name === "txtBlockContent") {
                            pvSelectedElement.innerHTML = invalidToValidHtml(bEl.blockElement.blockHtml);
                        } else if (bEl.blockElement.name === "imgBlockContent") {
                            // console.log(bEl.columnNumber);
                            const pvImgHyerLink = document.createElement('a');
                            if (bEl.blockElement.imgNewTab === true) {
                                setAttributes(pvImgHyerLink, { "href": `${protocalValidate(bEl.blockElement.imgHyperlink)}`, "target": "_blank" });
                            } else {
                                setAttributes(pvImgHyerLink, { "href": `${protocalValidate(bEl.blockElement.imgHyperlink)}` });
                            }

                            const pvImgElement = document.createElement('img');
                            let defaultImg = bEl.blockElement.imgUrl;
                            if (bEl.blockElement.imgUrl === undefined || bEl.blockElement.imgUrl === null) defaultImg = "img/empty-image.png";

                            setAttributes(pvImgElement, { "id": `img-${lAr.rowID}-${blockColNum + 1}`, "src": `/${defaultImg}` });
                            pvImgElement.className = "content img-content-block";
                            pvImgHyerLink.appendChild(pvImgElement);
                            pvSelectedElement.appendChild(pvImgHyerLink);
                        } else if (bEl.blockElement.name === "socialBlockContent") {
                            // blockHtml: "<div class=~_content icon-content-block~_ id=~_icon-3-1~_ ><a href=~_#~_ class=~_social-icon-content~_><img class=~_social-icon-img~_ src=~_/icon/facebook.png~_ ></a><a href=~_#~_ class=~_social-icon-content~_><img class=~_social-icon-img~_ src=~_/icon/twitter.png~_ ></a><a href=~_#~_ class=~_social-icon-content~_><img class=~_social-icon-img~_ src=~_/icon/instagram.png~_ ></a><div />"
                            // name: "socialBlockContent"
                            // socialFbHyperlink: "fb.com"
                            // socialInstagramHyperlink: "i.com"
                            // socialTwitterHyperlink: "t.com"

                            const pvIcons = document.createElement("div");
                            setAttributes(pvIcons, { "id": `icon-${lAr.rowID}-${blockColNum + 1}` });
                            pvIcons.className = "content icon-content-block";

                            const pvFbLink = document.createElement('a');
                            setAttributes(pvFbLink, { "class": "social-icon-content", "href": `${protocalValidate(bEl.blockElement.socialFbHyperlink)}` });
                            const pvFbIconImg = document.createElement('img');
                            setAttributes(pvFbIconImg, { "class": "social-icon-img", "src": "/icon/facebook.png" });
                            pvFbLink.appendChild(pvFbIconImg);
                            pvIcons.appendChild(pvFbLink);

                            const pvTwiterLink = document.createElement('a');
                            setAttributes(pvTwiterLink, { "class": "social-icon-content", "href": `${protocalValidate(bEl.blockElement.socialTwitterHyperlink)}` });
                            const pvTwitterIconImg = document.createElement('img');
                            setAttributes(pvTwitterIconImg, { "class": "social-icon-img", "src": "/icon/twitter.png" });
                            pvTwiterLink.appendChild(pvTwitterIconImg);
                            pvIcons.appendChild(pvTwiterLink);


                            const pvInstaLink = document.createElement('a');
                            setAttributes(pvInstaLink, { "class": "social-icon-content", "href": `${protocalValidate(bEl.blockElement.socialInstagramHyperlink)}` });
                            const pvInstaIconImg = document.createElement('img');
                            setAttributes(pvInstaIconImg, { "class": "social-icon-img", "src": "/icon/instagram.png" });
                            pvInstaLink.appendChild(pvInstaIconImg);

                            pvIcons.appendChild(pvInstaLink);


                            // for (let k = 0; k < 2; k++) {
                            // }
                            pvSelectedElement.append(pvIcons);


                        }

                        // pvSelectedElement.innerHTML = invalidToValidHtml(bEl.blockElement.blockHtml);
                        blockColNum++;
                    }
                });
                blockRowId++;
            }


            // ADDING BUTTON 
            // MATCHING ROW ID 
            if (lAr.rowID === siblingRowId) {
                // console.log(lAr.rowWithColumn);
                // let blockColNum = 0;
                // console.log("layout sibling row ", siblingRowId);// result 1, 2, 3

                // console.log("layout sibling row ", siblingRowId);// result 1, 2, 3
                assendingSibling.forEach((sEl, bIdx) => {
                    if (lAr.rowID === sEl.rowNum) {
                        // console.log("sibling col: " + sEl.colNum + ' in row: ' + lAr.rowID); // sibling col: 1 in row: 1, sibling col: 2 in row: 1, sibling col: 2 in row: 2
                        // console.log("Row num: " + lAr.rowWithColumn + " in column number: " + blockColNum); //RESULT - Row num: 2 in column number: 0, Row num: 2 in column number: 1, Row num: 3 in column number: 0
                        let pvSelectedElement = document.getElementById(`${rowNumToStr(lAr.rowWithColumn)}-col-${sEl.colNum - 1}`);
                        // btnAlign: null, btnBgColor: "#0d5415", btnContent: "Preview", btnFontFamily: "Helvetica", btnFontSize: 12 btnHyperlink: "http://localhost:4000", btnOpenNewTab: false, btnRound: true, btnTextColor: "#942e2e"
                        let pvSBtnRound;
                        sEl.btnRound == true ? pvSBtnRound = "border-radius: 8px;" : pvSBtnRound = "";
                        let pvBtnTab;
                        // ON CLICK EVENT FOR JAVASCRIPT
                        let pvCorrectHyperlink = null;
                        sEl.btnHyperlink !== null ? pvCorrectHyperlink = protocalValidate(sEl.btnHyperlink) : pvCorrectHyperlink = "#";



                        // let pvOnClickEvent = window.open(`${pvCorrectHyperlink}`);
                        if (sEl.btnOpenNewTab === true) {
                            pvOnClickEvent = `${pvCorrectHyperlink}, _blink`;
                        }


                        if (sEl.btnOpenNewTab == true) {
                            // OPEN IN NEW TAB 
                            pvBtnTab = "border-radius: 8px;";
                        } else {
                            pvBtnTab = ""
                        }

                        const pvSiblingBtn = `<button calss="content btn-content-block" id="btn-${sEl.rowNum}-${sEl.colNum}" style="background:${sEl.btnBgColor}; font-family:${sEl.btnFontFamily}; font-size:${sEl.btnFontSize}px;color: ${sEl.btnTextColor}; ${pvSBtnRound}" onclick="window.open('${pvCorrectHyperlink}')">${sEl.btnContent}</button>`;

                        // const pvSiblingBtn = document.createElement('button');
                        // pvSiblingBtn.textContent = "Preview";
                        pvSelectedElement.appendChild(stringToNodes(pvSiblingBtn));
                        // blockColNum++;
                    }
                });
                siblingRowId++;
            }
        }
    });











    /*
    const assendingSibling = pvSibling.sort((a, b) => a.colNum - b.colNum);
    // ADD BUTTON 
    let siblingRowId = 1;
    layoutArray.forEach((lAr, rIdx) => {
        // APPENDING ALL BLOCK INTO RIGHT COL AND DIV
        // CHECK IT THERE IS NO SPACE 
        if (!lAr.afterRow) {
            // MATCHING ROW ID 
            if (lAr.rowID === siblingRowId) {
                // console.log(lAr.rowWithColumn);
                // let blockColNum = 0;
                // console.log("layout sibling row ", siblingRowId);// result 1, 2, 3

                // console.log("layout sibling row ", siblingRowId);// result 1, 2, 3
                assendingSibling.forEach((sEl, bIdx) => {
                    if (lAr.rowID === sEl.rowNum) {
                        // console.log("sibling col: " + sEl.colNum + ' in row: ' + lAr.rowID); // sibling col: 1 in row: 1, sibling col: 2 in row: 1, sibling col: 2 in row: 2
                        // console.log("Row num: " + lAr.rowWithColumn + " in column number: " + blockColNum); //RESULT - Row num: 2 in column number: 0, Row num: 2 in column number: 1, Row num: 3 in column number: 0
                        let pvSelectedElement = document.getElementById(`${rowNumToStr(lAr.rowWithColumn)}-col-${sEl.colNum - 1}`);
                        // btnAlign: null, btnBgColor: "#0d5415", btnContent: "Preview", btnFontFamily: "Helvetica", btnFontSize: 12 btnHyperlink: "http://localhost:4000", btnOpenNewTab: false, btnRound: true, btnTextColor: "#942e2e"
                        let pvSBtnRound;
                        sEl.btnRound == true ? pvSBtnRound = "border-radius: 8px;" : pvSBtnRound = "";
                        let pvBtnTab;
                        // ON CLICK EVENT FOR JAVASCRIPT
                        let pvCorrectHyperlink = null;
                        sEl.btnHyperlink !== null ? pvCorrectHyperlink = protocalValidate(sEl.btnHyperlink) : pvCorrectHyperlink = "#";



                        // let pvOnClickEvent = window.open(`${pvCorrectHyperlink}`);
                        if (sEl.btnOpenNewTab === true) {
                            pvOnClickEvent = `${pvCorrectHyperlink}, _blink`;
                        }


                        if (sEl.btnOpenNewTab == true) {
                            // OPEN IN NEW TAB 
                            pvBtnTab = "border-radius: 8px;";
                        } else {
                            pvBtnTab = ""
                        }

                        const pvSiblingBtn = `<button calss="content btn-content-block" id="btn-${sEl.rowNum}-${sEl.colNum}" style="background:${sEl.btnBgColor}; font-family:${sEl.btnFontFamily}; font-size:${sEl.btnFontSize}px;color: ${sEl.btnTextColor}; ${pvSBtnRound}" onclick="window.open('${pvCorrectHyperlink}')">${sEl.btnContent}</button>`;

                        // const pvSiblingBtn = document.createElement('button');
                        // pvSiblingBtn.textContent = "Preview";
                        pvSelectedElement.appendChild(stringToNodes(pvSiblingBtn));
                        // blockColNum++;
                    }
                });
                siblingRowId++;
            }
        }
    });
    */




    /*
    // let siblingRow = 1;
    // let siblingCol = 0;
    assendingSibling.forEach((pVs, sI) => {
        console.log(pVs);
        if (pVs.rowNum === lAr.rowID) {
            console.log(lAr.rowWithColumn);
            // const selectedBlock = document.getElementById(`${rowNumToStr(lAr.)}-col-${siblingCol}`);
            // console.log(selectedBlock);
            // console.log(pVs.length);
            // console.log("Sibling col: ", siblingCol);
            // siblingCol++;
        }
    });
    */





    // TEXT CONTENT EXIT FALSE FOR PREVIEW 
    const pvTextContent = document.querySelectorAll('.txt-content-block');
    pvTextContent.forEach(txtCnt => { txtCnt.setAttribute("contenteditable", false) });
}

// previewDropZoneTemplate();


















if (currentPath === "preview" && window.location.pathname !== "/template") {
    // console.log("Preview page");
    previewDropZoneTemplate();

} else if (currentPath === "editor") {
    // console.log("Editor page");
    columnDragAndDrop();
    blockDragAndDrop();
    rightBarElementShowHide();
    rightBarProps();
    templatePropsCng();
    backendAndDataBase();
    if (submitted === false) {
        // PREVENT TO SET 
        window.addEventListener('beforeunload', function (e) {
            // Cancel the event
            e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
            // Chrome requires returnValue to be set
            e.returnValue = 'Save it and leave otherwise it can be undone';
        });
    }

} else if (currentPath === "edit") {
    console.log("EDIT");
} else if (findPath[1] === "template") {
    console.log("index");
} else {
    console.log("Not a template ");
}




