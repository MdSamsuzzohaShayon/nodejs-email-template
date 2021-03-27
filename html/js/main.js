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
const alignLeftBtn = document.getElementById('txt-pra-left'), alignCenterBtn = document.getElementById('txt-pra-center'), alignRightBtn = document.getElementById('txt-pra-right');
const txtFontFamily = document.getElementById('txt-font-family');
const txtFontSize = document.getElementById('txt-font-size');
const blodText = document.getElementById('txt-bold'), italicText = document.getElementById('txt-italic'), underlineText = document.getElementById('txt-underline');


// BUTTON PROPS 
const btnProps = document.querySelector('.btn-props');
const btnBGColorInput = document.getElementById('btn-color');
const btnTxtColorInput = document.getElementById('btn-font-color');
const btnFontFamilyInput = document.getElementById('btn-font-family');
const btnFontSizeInput = document.getElementById('btn-font-size');
const btnTextContentInput = document.getElementById('btn-text');
const btnHyperlinkInput = document.getElementById('btn-hyperlink');
const btnNewTabInput = document.getElementById('btn-new-tab');


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
const newTab = document.getElementById('new-tab');









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






// IMAGE 
let imgDefaultUrl = "./icon/picture.png";
// let imgDefault = "background-image: url(./icon/picture.png);";
let imageBlockElment = null;




//TEXT
let text = null;
let txtBlockElement = null;


// BUTTON 
let btnTxt = null;
let btnBlockElement = null;



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







const imgUploadHandler = (inputImgElement, imgSrcUrl) => {
    // let uploadedImgUrl = null;
    // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event

    inputImgElement.addEventListener('change', function (e) {
        const imgFile = e.target.files[0]; // this.files[0]
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
                    imgDefaultUrl = le.target.result;
                    // uploadedImgUrl = le.target.result;
                    // currentUploadedImageUrl = le.target.result;
                    // console.log("Logout from load event: ", uploadedImgUrl);

                });
                reader.readAsDataURL(imgFile);
            } else {
                alert('Use a supported image file (.png / .jpeg / .gff / .jpg )');
            }
        } else {
            console.log('no img');
        }
        return currentUploadedImageUrl
    });
    // console.log(uploadedImgUrl);
    // return uploadedImgUrl;
}








function setAttributes(el, attrs) {
    for (let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

function createAllIcon(outerElement) {
    for (let i = 0; i < 3; i++) {
        console.log(i);
        currentIcon = `<img src="${iconList[i]}">`;
        iconBlockElement.innerHTML = currentIcon;
        outerElement.innerHTML = iconBlockElement;
    }
}


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

// EXTRA HELPING FUNCTIONS ENDS


























// MAIN FUNCTION 5




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
        if (e.toElement.id == 'drop-zone') {
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
                console.log("Block content: ", blockContent);
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
            // ONLY DROP WHEN DROPABLE ELEMENT IS COLUMN 
            if (dropableColumn === "one-column-div" || dropableColumn === "two-column-div" || dropableColumn === "three-column-div") {
                // CHECK FOR WHICH COLUMN WE ARE DROPING THE BLOCK ELEMENT 


                if (dropableBlock === "img-holder") {
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
                    positionElement.push({ rowNumber, columnNumber, blockElement: imageBlockElment });
                    // console.log(positionElement);
                } else if (dropableBlock === "txt-holder") {
                    // CREATING REXT 
                    rowNumber = convertRowIdToNumber(e.path[1].id);
                    columnNumber = convertColIdToNumber(e.toElement.id);

                    /*
                    const newBlockCol = document.createElement('div');
                    setAttributes(newBlockCol, { 'class': "content", "id": "txt-" + rowNumber + '-' + columnNumber });   //  "txt-" + rowNumber + '-' + columnNumber 
                    newBlockCol.textContent = '😊Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil corrupti natus eos in a voluptas incidunt porro quis autem quo!';
                    e.toElement.appendChild(newBlockCol);
                    */

                    text = "😊Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil corrupti natus eos in a voluptas incidunt porro quis autem quo!";
                    txtBlockElement = `<div class="content txt-content-block" id="txt-${rowNumber + '-' + columnNumber}">${text}</div>`;
                    e.toElement.innerHTML = txtBlockElement;

                    blockElement = dropableBlock;
                    positionElement.push({ rowNumber, columnNumber, blockElement: txtBlockElement });
                } else if (dropableBlock === "btn-holder") {
                    rowNumber = convertRowIdToNumber(e.path[1].id);
                    columnNumber = convertColIdToNumber(e.toElement.id);

                    /*
                    const newBlockCol = document.createElement('button');
                    setAttributes(newBlockCol, { 'class': "content", "id": "btn-" + rowNumber + '-' + columnNumber });   //  "txt-" + rowNumber + '-' + columnNumber 
                    newBlockCol.textContent = 'Preview';
                    e.toElement.appendChild(newBlockCol);
                    */
                    btnTxt = "Preview";
                    btnBlockElement = `<button class="content btn-content-block" id="btn-${rowNumber + '-' + columnNumber}" >${btnTxt}</button>`;
                    e.toElement.innerHTML = btnBlockElement;

                    blockElement = dropableBlock;
                    positionElement.push({ rowNumber, columnNumber, blockElement: btnBlockElement });
                } else if (dropableBlock === "social-holder") {
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
                    positionElement.push({ rowNumber, columnNumber, blockElement: iconBlockElement });
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
        };
    });
}
blockDragAndDrop();


// MAIN FUNCTION 3
const rightBarElementShowHide = () => {
    document.addEventListener('click', e => {
        // console.log("Click E: ", e.toElement);
        // console.log("Click: E Target", e.target.className);
        // console.log("Click: E Target", e.toElement.classList[0]);


        // IF SOMEONE CLICK ON ANY BLOCK THE PROPERTY BAR WILL OPEN 
        if (e.toElement.classList[0] === 'content' || e.toElement.className === 'social-icon-content' || e.toElement.className === 'social-icon-img') {


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

            allProperties.forEach(ap => { ap.style.display = 'none' });
            propertiesBar.style.display = 'none';
            blockElementBar.style.display = 'block';
        }


    });




}
rightBarElementShowHide();






// MAIN FUNCTION 4
const rightBarProps = async () => {


    // KNOW THE CURRENT ROW AND COLUMN WHICH WE ARE ON 
    // IMAGE PROPERTIES 
    // imgUploadHandler(inputImg, [previewImg]);
    const URL = await imgUploadHandler(inputImg, [previewImg]);
    let imgHyperlink = null;
    let imgNewTab = false;
    imgLink.addEventListener('change', e => { imgHyperlink = e.target.value; console.log("Hyperlink: ", imgHyperlink); });
    newTab.addEventListener('change', e => { if (e.target.value == 'on') imgNewTab = true; console.log("New tab: ", imgNewTab); });





    // TEXT PROPERTIES 
    let alignItems = "center", fontFamily = "Calibri", fontSize = 20, textStyle = 'normal';
    alignLeftBtn.addEventListener('click', e => { alignItems = 'left'; });
    alignCenterBtn.addEventListener('click', e => { alignItems = 'center'; });
    alignRightBtn.addEventListener('click', e => { alignItems = 'right'; });
    txtFontFamily.addEventListener('change', e => { fontFamily = e.target.value; console.log("Font family: ", fontFamily); });
    txtFontSize.addEventListener('change', e => { fontSize = e.target.value; console.log("Font size: ", fontSize); });
    blodText.addEventListener('click', e => { textStyle = 'bold'; });
    italicText.addEventListener('click', e => { textStyle = 'italic'; });
    underlineText.addEventListener('click', e => { textStyle = 'underline'; });





    // BUTTON PROPERTIES 
    let btnBGColor = 'green', btnTxtColor = 'blue', btnFontSize = 12, btnFontFamily = "Calibri", btnTxtContent = "Preview";
    let btnHyperLink = null;
    let btnNewTab = false;
    btnBGColorInput.addEventListener('change', e => { btnBGColor = e.target.value; console.log("btnBGColor: ", btnBGColor); });
    btnTxtColorInput.addEventListener('change', e => { btnTxtColor = e.target.value; console.log("btnTxtColor: ", btnTxtColor); });
    btnFontSizeInput.addEventListener('change', e => { btnFontSize = e.target.value; console.log("btnFontSize: ", btnFontSize); });
    btnFontFamilyInput.addEventListener('change', e => { btnFontFamily = e.target.value; console.log("btnFontFamily: ", btnFontFamily); });
    btnTextContentInput.addEventListener('change', e => { btnTxtContent = e.target.value; console.log("btnTxtContent: ", btnTxtContent); });
    btnHyperlinkInput.addEventListener('change', e => { btnHyperLink = e.target.value; console.log("Hyperlink: ", btnHyperLink); });
    btnNewTabInput.addEventListener('change', e => { if (e.target.value == 'on') btnNewTab = true; console.log("New tab: ", btnNewTab); });




    // SOCIAL PROPERTIES 
    let socialFbHyperlink = null, socialTwitterHyperlink = null, instagramHyperlink = null;
    fbLinkInput.addEventListener('change', (e) => { socialFbHyperlink = e.target.value; console.log("socialFbHyperlink: ", socialFbHyperlink); });
    twitterLinkInput.addEventListener('change', (e) => { socialTwitterHyperlink = e.target.value; console.log("socialTwitterHyperlink: ", socialTwitterHyperlink); });
    instagramLinkInput.addEventListener('change', (e) => {
        instagramFbHyperlink = e.target.value;
        console.log("instagramFbHyperlink: ", instagramFbHyperlink);

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
rightBarProps();




// MAIN FUNCTION 5
const templatePropsCng = () => {
    // HEADER IMAGE CHANGE
    imgUploadHandler(headerImgInput, [headerImage, headerImgPreview]);

    // TEMPLATE COLOR CHANGE 
    templateBGColorInput.addEventListener('change', (e) => {
        console.log("Color Change E: ", e);
        templateWrapper.style.background = e.target.value;
    });

    // LINKS COLOR CHANGE 
    const links = document.getElementsByTagName('a');
    templateLinkColorInput.addEventListener('change', (e) => {
        links.forEach(link => style.color = e.target.value);
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



        // IMAGE PROPS 
        // console.log("Image block element: ", imageBlockElment);




        // console.log("Current image upload URL: ", currentUploadedImageUrl);
        // console.log("ROW ID: ", rowID);


        // // THE OBJECT TO SAVE INTO THE DATABASE 
        // console.log("Row list: ", rowList);
        console.log("Position Element: ", positionElement);
    });
}
backendAndDataBase();








