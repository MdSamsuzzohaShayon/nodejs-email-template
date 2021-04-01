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
// const btnAlignLeft = document.getElementById('btn-align-left'), btnAlignRight = document.getElementById('btn-align-right'), btnAlignCenter = document.getElementById('btn-align-center');
const btnAlignElement = document.querySelectorAll('.btn-align');


// SOCIAL PROPS 
const socialProps = document.querySelector('.social-props');
const fbLinkInput = document.getElementById('fb-link'),
    twitterLinkInput = document.getElementById("twitter-link"),
    instagramLinkInput = document.getElementById("instagram-link");


// SPACE PROPS 
const spxProps = document.querySelector('.spx-props');

// IMAGE PROPS 
// SELECT ELEMENT FOR IMAGE UPLOAD AND PREVIEW HANDLER 
const imgProps = document.querySelector('.img-props');
const inputImg = document.getElementById('img-input');
const previewImg = document.getElementById('img-preview');
const imgLink = document.getElementById('img-link');
const imgNewTab = document.getElementById('img-new-tab');






// WEBSITE DEFAULT URL OPERATION 
let websiteDomain = "www.google.com", defaultFbLink = 'fb.com/md.shayon.148', defaultTwitterLink = 'twitter.com/shayon_md', defaultInstaLink = 'https://www.instagram.com/md_shayon/';







// DATABASE DESIGN START 
// THIS SOULD BE ADD TO THE DATABASE 
const dropElementsProperties = {};
// COUNT ROW AND COLUMNS 

// TITLE OF THE TEMPLATE 
let title = null;




// THIS ROW LIST WOULD BE ANOTHER DATABASE TABLE 
let rowList = []; // THIS IS FOR TRACKING ROW DETAIL - FOR EXAMPLE - FIRST ROW WITH 3 COLUMN, 2ND ROW WITH ONE COLUMN, 3RD COLUMN WITH 2 COLUMN
let rowID = 1; // AUTO INCREMENT
let rowWithColumn;  // WHICH ROW IS SELECTING , 1 COLUMN ROW , 2 COLUMN ROW OR 3 COLUMN ROW

let positionElement = [];   // THIS IS FOR TRACKING WHICH WHICH BLOCK ELEMENT IS HOLDING WHICH POSITION - FOR EXAMPLE IMAGE HOLDER IS TAKING ROW-2 AND COLUMN 2



let blockElementDetails = [];   // THIS IS FOR DETAILS OF THE BLOCK WHICH WE HAVE MADE 
// DATABASE DESIGN ENDS 




// TEMPORARY GLOBAL VARIABLES 
// WHEN SOMEONE CLICK ON BLOCK ELEMENT IT CAN ASSIGNED WITH ROW NUMBER AND COL NUMBER 
let selectedRow = null;
let selectedCol = null;
let templateSelected = true;
// let selectedBlock = {};




// IMAGE 
let imgDefaultUrl = "./icon/picture.png";
// let imgDefault = "background-image: url(./icon/picture.png);";
let imageBlockElment = null;




//TEXT
let text = null;
let txtBlockElement = null;


// BUTTON 
let btnDefaultTxt = "Preview";
let btnBlockElement = null;
// let btnBgColor = "rgb(70, 133, 192)", btnTextColor = "rgb(15, 48, 80)", btnHyperlink = websiteDomain, btnOpenNewTab = false, btnRound = false, btnAlign = null;





//SOCIAL
// let iconList = ['./icon/facebook.png', './icon/twitter.png', './icon/instagram.png'];
let fb_icon = './icon/facebook.png';
let twitter_icon = './icon/twitter.png';
let instagram_icon = './icon/instagram.png';
// let currentIcon = '';
// let iconElement = `<button class="social-icon">${currentIcon}</button>`;
// let fbIconElement = `<button class="social-icon"><img src="./icon/facebook.png" ></button>`;
// let twitterIconElement = `<button class="social-icon"><img src="./icon/twitter.png" ></button>`;
// let instagramIconElement = `<button class="social-icon"><img src="./icon/instagram.png" ></button>`;
// document.body.innerHTML = iconElement;
let iconLink = '#';
let iconBlockElement = null;
let currentUploadedImageUrl = null;







































// EXTRA HELPING FUNCTIONS START
/*
// HELPING FUNCTION 1
function createBlockElement(blockElement, attributes) {
    // console.log("Drop - Dropable Block: ", dropableBlock);
    // console.log("Drop event : ", e);
    // console.log("Drop - E: e.toElement", e.toElement);  // RESULT = <div class="one-column-div" id="one-col-0"></div>
    const newBlockCol = document.createElement('div');
    //  setAttributes(elem, {"src": "http://example.com/something.jpeg", "height": "100%", ...});
    setAttributes(newBlockCol, { attributes });
    e.toElement.appendChild(newBlockCol);

    // DATABASE AND VARIABLE 
    rowNumber = convertRowIdToNumber(e.path[1].id);
    columnNumber = convertColIdToNumber(e.toElement.id);
    blockElement = dropableBlock;
    positionElement.push({ rowNumber, columnNumber, blockElement });
    // console.log(positionElement);
}
*/



// HELPING FUNCTION 2
const imgUploadHandler = (imgFile, imgSrcUrl) => {
    if (selectedRow !== null && selectedCol !== null && !templateSelected) {
        // let uploadedImgUrl = null;
        // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
        // console.log("image file event : ", e);
        if (imgFile) {
            // image/jpeg
            if (imgFile.type == "image/jpeg" || imgFile.type == "image/jpg" || imgFile.type == "image/png" || imgFile.type == "image/gif") {
                // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
                const reader = new FileReader();
                reader.addEventListener('load', function (le) {
                    // console.log("Load element target: ", le.target.result);
                    // console.log(le.target.result);
                    // imgSrcUrl.forEach((isu, i) => isu.setAttribute('src', le.target.result));
                    imgSrcUrl.forEach((isu, i) => setAttributes(isu, { 'src': le.target.result }));
                    // return uploadedImgUrl;   // THIS RETUREN STATEMENT IS REFERING TO CALLBACK FUNCTION  OF LOAD FILE 
                    // loadedImgUrl.push(le.target.result);
                    // imgDefaultUrl = le.target.result;
                    // uploadedImgUrl = le.target.result;
                    // currentUploadedImageUrl = le.target.result;
                    // console.log("Logout from load event: ", uploadedImgUrl);
                    positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].imgUrl = le.target.result; } });
                });
                reader.readAsDataURL(imgFile);
            } else {
                alert('Use a supported image file (.png / .jpeg / .gff / .jpg )');
            }
        } else {
            console.log('no img');
        }
        // console.log(uploadedImgUrl);
        // return uploadedImgUrl;
    } else {
        console.log("temp select: ", templateSelected);
        if (imgFile) {
            if (imgFile.type == "image/jpeg" || imgFile.type == "image/jpg" || imgFile.type == "image/png" || imgFile.type == "image/gif") {
                const reader = new FileReader();
                reader.addEventListener('load', function (le) {
                    imgSrcUrl.forEach((isu, i) => setAttributes(isu, { 'src': le.target.result }));
                    // imgDefaultUrl = le.target.result;
                });
                reader.readAsDataURL(imgFile);
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


// HELPING FUNCTION 7
// FUNCTION IS NOT WORKING 
const updatePositionElement = (selectedRow, selectedCol, propertyName, propertyValue) => {
    // console.log("Selected row: ", selectedRow);
    // console.log("Selected Col: ", selectedCol);
    // selectedPositionElement.imgHyperlink = imgHyperlink;
    // console.log("Selected position element: ", objIndex);
    // GETTING INDEX NUMBER OF ARRAY 
    // objIndex = positionElement.findIndex(pl => pl.rowNumber === selectedRow && pl.columnNumber === selectedCol);
    // if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) {
    //     return positionElement[index].imgHyperlink = imgHyperlink;
    // }

    // console.log(positionElement);
    positionElement.forEach((pl, index) => {
        if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) {
            positionElement[index].propertyName = propertyValue;
            // console.log(positionElement[index]);
        }
    });
    // updatePositionElement(selectedRow, selectedCol, imgHyperlink);
    // console.log("position Element: ", positionElement[objIndex]);
}

// EXTRA HELPING FUNCTIONS ENDS






























// DROPABLE COLUMN ELEMENTS 
// let dropableColumnZone = [];


// MAIN FUNCTION 1
function columnDragAndDrop() {
    let dropableColumn = null;

    draggableColumn.forEach((column, index) => {
        column.addEventListener('dragstart', (e) => {
            // console.log("Drag Start - E: ", e);
            // console.log("drag start - e.toElement.classList[0]: ", e.toElement.classList[0]); // RESULT - block-col
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










    // DROPZONE EVENTS START 
    /* events fired on the drop targets */
    dropColumnZone.addEventListener("dragover", function (event) {
        // prevent default to allow drop
        event.preventDefault();
    }, false);






    dropColumnZone.addEventListener('drop', e => {
        // console.log(event.toElement.id); // Result - drop-zone
        // COLUMN ARE ONLY ABLE TO DROP INTO DROP ZONE (ID)
        if (e.toElement.id === 'drop-zone') {
            // PREVENT TO ADD MORE THAN 3 ROW 
            if (rowList.length < 3) {
                if (dropableColumn === "col-1-grid" || dropableColumn === "col-2-grid" || dropableColumn === "col-3-grid") {

                    // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
                    const newDiv = document.createElement('div');
                    // setAttributes(elem, {"src": "http://example.com/something.jpeg", "height": "100%", ...});
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
                // else {

                //     alert("This element is not dropable, you must add column first");
                // }
            }
            // else {
            //     alert("You can't add more than 3 row! 🙃")
            // }
        } else {
            console.log("outside of drop zone");
        }
    });
    // DROPZONE EVENTS ENDS
}
columnDragAndDrop();


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
        // console.log("Mouseover - Event: ", e.toElement.id);   // GETTING COLUMN ID (iNDICATES INDEX NUMBER OF THE COLUMN)

        // console.log("Mouseover - Event: ", e.path[1].id); // // GETTING ROW ID (iNDICATES INDEX NUMBER OF THE ROW)
        // console.log("Targeter element", e.target.className); // Result - three-column-div
        // ONLY COLLUMNS ARE VALID TO DROP INTO DROP ZONE 
        if (e.toElement.id !== 'drop-zone') {
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
                            // console.log("Drop - E: e.toElement", e.toElement);  // RESULT = <div class="one-column-div" id="one-col-0"></div>
                            // const newBlockCol = document.createElement('div');
                            // setAttributes(newBlockCol, { "style": `background-image: url(${imgDefaultUrl});`, "class": "content", 'id': 'img-holder' });
                            let imgID = `"img-${rowNumber + '-' + columnNumber}"`;
                            imageBlockElment = `<img src="${imgDefaultUrl}" class="content img-content-block" alt="Image" id=${imgID}>`;
                            e.toElement.innerHTML = imageBlockElment;

                            // DATABASE AND VARIABLE 
                            blockElement = dropableBlock;
                            positionElement.push({ rowNumber, columnNumber, blockElement: imageBlockElment, imgHyperlink: websiteDomain, imgNewTab: false });
                            // console.log(positionElement);
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
                            newBlockCol.textContent = '😊Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil corrupti natus eos in a voluptas incidunt porro quis autem quo!';
                            // CHANGING TEXT EVENT 
                            newBlockCol.addEventListener('input', e => {
                                // console.log(e.target);
                                // text = e.target.value;
                                txtBlockElement = e.target.outerHTML;
                                // console.log(txtBlockElement);
                                positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].blockElement = txtBlockElement; } });

                            });
                            e.toElement.appendChild(newBlockCol);



                            // THIS IS ONLY FOR DATABASE 
                            text = "😊Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil corrupti natus eos in a voluptas incidunt porro quis autem quo!";
                            txtBlockElement = `<div class="content txt-content-block" onclick="txtChangeHandler" contenteditable="true" id="txt-${rowNumber + '-' + columnNumber}">${text}</div>`;
                            // e.toElement.innerHTML = txtBlockElement;


                            blockElement = dropableBlock;
                            positionElement.push({ rowNumber, columnNumber, blockElement: txtBlockElement, txtNewTab: false, imgUrl: imgDefaultUrl });
                        }
                    } else if (dropableBlock === "btn-holder") {
                        // console.log(dropInsideImgTxt);
                        // https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children
                        // THIS BUTTON SHOULD ONLY INSERT INTO IMAGE OR TEXT
                        if (dropInsideImgTxt === "img-content-block" || dropInsideImgTxt === "txt-content-block" || e.toElement.children[0].classList[1] === "img-content-block" || e.toElement.children[0].classList[1] === "txt-content-block") {
                            // e.target.className;
                            // INSERT A SIBLING AFTER 
                            // console.log("Parent: ", e.toElement);
                            // console.log("Child node: ", e.toElement.children[0].classList[1]);
                            // console.log("dropbale col: ", dropableColumn);
                            const newBlockCol = document.createElement('button');

                            // console.log("Dropable element: ", e.toElement);
                            rowNumber = convertRowIdToNumber(e.path[1].id);
                            columnNumber = convertColIdToNumber(e.toElement.id);
                            // console.log("parent: ", e.target.parentElement.className);



                            function insertButtonElement(elementAfter) {
                                if (e.target.parentElement.className === 'one-column-div' || dropableColumn === "one-column-div") {
                                    // LEFT POSITION ELEMENT FROM HERE 
                                    setAttributes(newBlockCol, { "id": "btn-" + rowNumber + '-' + columnNumber });   //  "txt-" + rowNumber + '-' + columnNumber 
                                    // element.className = "class1 class2";
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
                                // e.toElement.after(newBlockCol);
                                insertButtonElement(e.toElement);
                            } else {
                                // console.log(e.toElement.childNodes[0]);
                                // e.toElement.childNodes[0].after(newBlockCol);
                                insertButtonElement(e.toElement.childNodes[0]);


                            }







                            btnBlockElement = `<button class="content btn-content-block" id="btn-${rowNumber + '-' + columnNumber}" >${btnDefaultTxt}</button>`;
                            /*btnDefaultTxt = "Preview";
                            btnBlockElement = `<button class="content btn-content-block" id="btn-${rowNumber + '-' + columnNumber}" >${btnDefaultTxt}</button>`;
                            e.toElement.innerHTML = btnBlockElement;
                            */

                            positionElement.forEach((pl, index) => {
                                if (pl.rowNumber === rowNumber && pl.columnNumber == columnNumber) {
                                    positionElement[index].siblingButton = { btnBlockElement, btnBgColor: "rgb(70, 133, 192)", btnTextColor: "rgb(15, 48, 80)", btnHyperlink: websiteDomain, btnOpenNewTab: false, btnRound: false, btnAlign: null, btnContent: "Preview", btnFontFamily: "Helvetica", btnFontSize: 12 };
                                }
                            });
                            // THIS WOULD NOT BE PUSH - THIS WOULD BE UPDATE WITH NEW
                            // blockElement = dropableBlock;
                            // positionElement.push({ rowNumber, columnNumber, blockElement: btnBlockElement });
                        } else {
                            alert('this button is not dropable here');
                        }

                    } else if (dropableBlock === "social-holder") {
                        // The Social Media Icons can only be dragged to a one - column or a two - column layout
                        if (dropableColumn === "one-column-div" || dropableColumn === "two-column-div") {
                            rowNumber = convertRowIdToNumber(e.path[1].id);
                            columnNumber = convertColIdToNumber(e.toElement.id);

                            // CREATING THREE SOCIAL ICON 
                            /*
                            const newBlockCol = document.createElement('div');
                            setAttributes(newBlockCol, { 'class': "content", "id": "social-" + rowNumber + '-' + columnNumber });   //  "txt-" + rowNumber + '-' + columnNumber 
                            for (let i = 0; i < 3; i++) {
                                const threeButton = document.createElement('button');
                                setAttributes(threeButton, { "class": "content", "id": `icon-${i}` });
                                threeButton.textContent = 'icon';
                                newBlockCol.appendChild(threeButton);
                            }
                            newBlockCol.innerHTML = iconElement;
                            */
                            iconBlockElement = `<div class="content icon-content-block" id="icon-${rowNumber + '-' + columnNumber}" ><a href="${iconLink}" class="social-icon-content"><img class="social-icon-img" src="${fb_icon}" ></a><a href="${iconLink}" class="social-icon-content"><img class="social-icon-img" src="${twitter_icon}" ></a><a href="${iconLink}" class="social-icon-content"><img class="social-icon-img" src="${instagram_icon}" ></a><div />`;

                            e.toElement.innerHTML = (iconBlockElement);


                            blockElement = dropableBlock;
                            positionElement.push({ rowNumber, columnNumber, blockElement: iconBlockElement, socialFbHyperlink: defaultFbLink, socialTwitterHyperlink: defaultTwitterLink, socialInstagramHyperlink: defaultInstaLink });
                        } else {
                            alert("Social icon can't drop into three column!");
                        }
                    } else if (dropableBlock === "spx-holder") {
                        rowNumber = convertRowIdToNumber(e.path[1].id);
                        columnNumber = convertColIdToNumber(e.toElement.id);

                        const newBlockCol = document.createElement('button');
                        setAttributes(newBlockCol, { 'class': "content", "id": "spx-" + rowNumber + '-' + columnNumber });   //  "txt-" + rowNumber + '-' + columnNumber 
                        newBlockCol.textContent = 'space';
                        e.toElement.appendChild(newBlockCol);

                        blockElement = dropableBlock;
                        positionElement.push({ rowNumber, columnNumber, blockElement: "Space" });
                    } else {
                        console.log('Not creating element');
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
blockDragAndDrop();


// MAIN FUNCTION 3
const rightBarElementShowHide = () => {

    document.addEventListener('click', e => {
        // console.log("Click E: ", e.toElement);
        let idString = null;


        // IF SOMEONE CLICK ON ANY BLOCK THE PROPERTY BAR WILL OPEN 
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
                // img-1-1
                // ALL OF THEM ARE WORKING EXCEPT SOCIAL 
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
                idString = e.toElement.id.toString();
            }
            let findRowCol = idString.split('-');
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
            // selectedRow = parseInt(idString.charAt(4));
            // selectedCol = parseInt(idString.charAt(7));
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


    });



    // CLICK OUTSIDE OF THE COLUMN 
    document.addEventListener('click', e => {
        // console.log(e.target.classList[0]);
        // template-wrapper // header-image  // col

        // IF SOMEONE CLICK  OUT OF THE BLOCK THE PROPERTY BAR WILL CLOSE 
        if (e.target.className === 'template-wrapper' || e.target.className === 'header-image' || e.target.classList[0] === 'col') {
            templateSelected = true;
            allProperties.forEach(ap => { ap.style.display = 'none' });
            propertiesBar.style.display = 'none';
            blockElementBar.style.display = 'block';
        }


    });


}
rightBarElementShowHide();









// MAIN FUNCTION 4
const rightBarProps = async () => {




    // SUB FUNCTION 1
    function imgPropertiesUpdate() {

        // KNOW THE CURRENT ROW AND COLUMN WHICH WE ARE ON 
        // IMAGE PROPERTIES 
        // imgUploadHandler(inputImg, [previewImg]);

        inputImg.addEventListener('change', e => {
            const previewTempImg = document.querySelector('.img-content-block');
            imgUploadHandler(e.target.files[0], [previewImg, previewTempImg]);  // Working but need to save in db
        });



        let imgHyperlink = null;
        let setImgNewTab = false;

        imgLink.addEventListener('change', (e) => {
            imgHyperlink = e.target.value;
            // BY USING SELECTED ROW AND COL SEARCH ITEM FROM POSITION ELEMENT AND UPDATE 
            // https://stackoverflow.com/questions/4689856/how-to-change-value-of-object-which-is-inside-an-array-using-javascript-or-jquer
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].imgHyperlink = imgHyperlink; } });
            // updatePositionElement(selectedRow, selectedCol, imgHyperlink, imgHyperlink);
        });
        imgNewTab.addEventListener('change', async e => {
            if (e.target.value == 'on') setImgNewTab = true;
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].imgNewTab = setImgNewTab; } });
        });


    }
    imgPropertiesUpdate();









    // SUB FINCTION 2
    function txtPropertiesUpdate() {
        // https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
        // TEXT PROPERTIES 

        // let fontFamily = "Calibri", fontSize = 20, textStyle = 'normal';
        // let setTxtNewTab = false;
        /*
        let alignItems = "center"; 
        alignLeftBtn.addEventListener('click', e => { alignItems = 'left'; });
        alignCenterBtn.addEventListener('click', e => { alignItems = 'center'; });
        alignRightBtn.addEventListener('click', e => { alignItems = 'right'; });
        */
        // console.log(document.querySelectorAll('.txt-content-block'));

        alignBtn.forEach(btn => {
            btn.addEventListener('click', e => {
                let cmd = btn.dataset['align'];
                document.execCommand(cmd, false, null);
                // console.log(cmd);
                const text = document.getElementById(`txt-${selectedRow}-${selectedCol}`);
                // console.log(text.outerHTML.toString().trim());
                textBlockElement = text.outerHTML.toString().trim();
                positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].blockElement = textBlockElement; } });
            });

        });
        txtStyle.forEach(btn => {
            btn.addEventListener('click', e => {
                let cmd = btn.dataset['style'];
                document.execCommand(cmd, false, null);
                const text = document.getElementById(`txt-${selectedRow}-${selectedCol}`);
                // console.log(text.outerHTML.toString().trim());
                textBlockElement = text.outerHTML.toString().trim();
                positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].blockElement = textBlockElement; } });
            });

        });

        txtFontFamily.addEventListener('change', e => {
            let fontName = e.target.value;
            document.execCommand("fontName", false, fontName);
            const text = document.getElementById(`txt-${selectedRow}-${selectedCol}`);
            textBlockElement = text.outerHTML.toString().trim();
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].blockElement = textBlockElement; } });
        });
        txtFontSize.addEventListener('change', e => {
            let fontSize = e.target.value;
            document.execCommand("fontSize", false, fontSize);
            const text = document.getElementById(`txt-${selectedRow}-${selectedCol}`);
            textBlockElement = text.outerHTML.toString().trim();
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].blockElement = textBlockElement; } });
        });
        txtHyperlink.addEventListener('change', e => {
            // e.preventDefault();
            let url = e.target.value;
            document.execCommand("createLink", false, url);
            const text = document.getElementById(`txt-${selectedRow}-${selectedCol}`);
            textBlockElement = text.outerHTML.toString().trim();
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].blockElement = textBlockElement; } });
        });
        // THERE IS SOME INSTRUCTION PROBLEM WITH TEXT NEW TAB 
        // txtNewTab.addEventListener('change', e => {
        //     setTxtNewTab = e.target.value;
        //     const text = document.getElementById(`txt-${selectedRow}-${selectedCol}`);
        //     textBlockElement = text.outerHTML.toString().trim();
        //     positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].txtNewTab = setTxt; } });
        // });
    }
    txtPropertiesUpdate();





    // SUB FUNCTION  3 
    function btnPropertiesUpdate() {
        /*
         positionElement[index].siblingButton = {
             btnBlockElement,
             btnBgColor: "rgb(70, 133, 192)",
             btnTextColor: "rgb(15, 48, 80)",
             btnHyperlink: websiteDomain,
             btnOpenNewTab: false,
             btnRound: false,
             btnAlign: null,
              btnFontFamily: "Helvetica", 
              btnFontSize: 12
         };
         */

        // BUTTON PROPERTIES 
        // let btnBGColor = 'green', btnFontSize = 12;
        let btnNewTab = false, btnRoundShape = false;

        btnFontSizeInput.addEventListener('change', e => {
            btnFontSize = e.target.value;
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].siblingButton.btnFontSize = e.target.value } });
        });
        btnFontFamilyInput.addEventListener('change', e => {
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].siblingButton.btnFontFamily = e.target.value } });
        });



        btnBGColorInput.addEventListener('change', e => {
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].siblingButton.btnBgColor = e.target.value } });
        });
        btnTxtColorInput.addEventListener('change', e => {
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].siblingButton.btnTextColor = e.target.value } });
        });

        btnTextContentInput.addEventListener('change', e => {
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].siblingButton.btnContent = e.target.value } });
        });
        btnHyperlinkInput.addEventListener('change', e => {
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].siblingButton.btnHyperlink = e.target.value } });
        });
        btnNewTabInput.addEventListener('change', e => {
            if (e.target.value == 'on') btnNewTab = true;
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].siblingButton.btnOpenNewTab = btnNewTab } });
        });
        btnShapeInput.addEventListener('change', e => {
            if (e.target.value == 'on') btnRoundShape = true;
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].siblingButton.btnRound = btnRoundShape } });
        });
        btnAlignElement.forEach((bae, i) => {
            bae.addEventListener('click', e => {
                // console.log(e.target.outerText.toLowerCase().trim());  // RESULT - left / right / center
                positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].siblingButton.btnAlign = e.target.outerText.toLowerCase().trim(); } });
            });
        });
    }
    btnPropertiesUpdate();





    // SUB FINCTION 4
    function socialPropertiesUpdate() {
        // SOCIAL PROPERTIES 
        let socialFbHyperlink = null, socialTwitterHyperlink = null, socialInstagramHyperlink = null;
        fbLinkInput.addEventListener('change', (e) => {
            socialFbHyperlink = e.target.value;
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].socialFbHyperlink = socialFbHyperlink; } });
        });
        twitterLinkInput.addEventListener('change', (e) => {
            socialTwitterHyperlink = e.target.value;
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].socialTwitterHyperlink = socialTwitterHyperlink; } });
        });
        instagramLinkInput.addEventListener('change', (e) => {
            socialInstagramHyperlink = e.target.value;
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].socialInstagramHyperlink = socialInstagramHyperlink; } });
            /*
            OMG THIS IS WORKING 
            // console.log("social icon: ", document.activeElement);
            const rowOneHere = document.getElementById('row-1');
            const newEl = document.createElement('h2');
            newEl.setAttribute('class', 'header');
            newEl.textContent = "Hello world";
            rowOneHere.appendChild(newEl)
            console.log(rowOneHere);
            */
        });

    }
    socialPropertiesUpdate();



}
rightBarProps();




// MAIN FUNCTION 5
const templatePropsCng = () => {
    // HEADER IMAGE CHANGE
    headerImgInput.addEventListener('change', e => {
        imgUploadHandler(e.target.files[0], [headerImage, headerImgPreview]);
    });

    // TEMPLATE COLOR CHANGE 
    templateBGColorInput.addEventListener('change', (e) => {
        console.log("Color Change E: ", e);
        templateWrapper.style.background = e.target.value;
    });

    // LINKS COLOR CHANGE 
    templateLinkColorInput.addEventListener('change', (e) => {
        for (let link of links) {
            link => style.color = e.target.value
        }
        // links.forEach(link => style.color = e.target.value);
    });
}
templatePropsCng();



// MAIN FUNCTION 6
const backendAndDataBase = () => {




    // CHANGING TITLE 
    saveButton.addEventListener('click', e => {
        e.preventDefault();
        title = inputTitle.value;
        inputTitle.nodeValue = title;






        // console.log("Current image upload URL: ", currentUploadedImageUrl);
        // console.log("ROW ID: ", rowID);


        // // THE OBJECT TO SAVE INTO THE DATABASE 
        // console.log("Row list: ", rowList);
        console.log("Position Element: ", positionElement);
    });
}
backendAndDataBase();
















/*
window.onbeforeunload = function () {
    return "Dude, are you sure you want to leave? Think of the kittens!";
}
window.addEventListener('beforeunload', function (e) {
    // Cancel the event
    e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    // Chrome requires returnValue to be set
    e.returnValue = 'Save it and leave otherwise it can be undone';
});
*/
// https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
// document.cookie = "test=Hello";








