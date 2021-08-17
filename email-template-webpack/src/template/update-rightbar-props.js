// USING THE RIGHT CODE FOR RIGHT PAGE THIS IS VERY IMPORTANT 
const findPath = window.location.pathname.toString().split('/');
const currentPath = findPath[2];
const editPage = "edit", previewPage = "preview", editorPage = "editor", templateIndex = findPath[1];





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








// DYNAMIC STYLING START
let increaseDZHeight = 200;
// DYNAMIC STYLING ENDS 




// MAIN FUNCTION 4
function rightBarPropsUpdate() {

    // SUB FUNCTION 1
    function imgPropertiesUpdate() {
        inputImg.addEventListener('change', e => {
            // const previewTempImg = document.querySelector('.img-content-block');
            const templateImgPreview = document.getElementById(`img-${selectedRow}-${selectedCol}`);
            imgUploadHandler(e.target.files[0], [previewImg, templateImgPreview]);  // Working but need to save in db
        });
        // let setImgNewTab = false;
        imgLink.addEventListener('change', (e) => {
            // BY USING SELECTED ROW AND COL SEARCH ITEM FROM POSITION ELEMENT AND UPDATE 
            positionElement.forEach((pl, index) => { if (pl.rowNumber === selectedRow && pl.columnNumber == selectedCol) { positionElement[index].blockElement.imgHyperlink = e.target.value; } });
        });
        imgNewTab.addEventListener('change', async e => {
            // if (e.target.value == 'on') setImgNewTab = true;
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
        // let btnNewTab = false, btnRoundShape = false;

        btnFontSizeInput.addEventListener('change', e => {
            const cngBtn = document.getElementById(`btn-${selectedRow}-${selectedCol}`);
            cngBtn.style.fontSize = e.target.value + 'px';

            // const siblingBtnObj = JSON.parse(positionElement[index].blockElement.siblingButton);
            // siblingBtnObj.btnFontSize = e.target.value 
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
            cngBtn.style.color = e.target.value;
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
            // let checkBox = null;
            // btnNewTab.checked ? checkBox = "checked" : checkBox = "not checked";
            // console.log("checkobx: ", e.target.checked);
            // alert(checkBox);
            // if (e.target.value == 'on') btnNewTab = true;
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
            // if (e.target.value === 'on') btnRoundShape = true;
            // const cngBtn = document.getElementById(`btn-${selectedRow}-${selectedCol}`);
            // if (btnRoundShape === true) {
            // }
            siblingButtonList.forEach((sBl, sIdx) => { if (sBl.rowNum === selectedRow && sBl.colNum === selectedCol) { sBl.btnRound = e.target.checked } });
        });
        btnAlignElement.forEach((bae, i) => {
            bae.addEventListener('click', e => {
                const cngBtn = document.getElementById(`btn-${selectedRow}-${selectedCol}`);
                // console.log("e: ", e.target.parentElement.id);
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
                        // cngBtn.style.float = `inherit`;
                        // cngBtn.style.position = `relative`;
                        // cngBtn.style.marginLeft = `50%`;

                        break;
                }
                cngBtn.style.float = `${alignBtn}`;
                siblingButtonList.forEach((sBl, sIdx) => { if (sBl.rowNum === selectedRow && sBl.colNum === selectedCol) { sBl.btnAlign = alignBtn } });
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
                // console.log("Element index: ", elementIndex);
                // positionElement.splice(elementIndex);
                // console.log("position element Before row change: ", positionElement);
                // let afterSelectedRow = selectedRow + 1;
                positionElement.forEach((pEl, pIdx) => { if (pEl.rowNumber > selectedRow) { pEl.rowNumber--; } });


                // WORK WITH BUTTONS
                siblingButtonList = siblingButtonList.filter((sBL, sIdx) => sBL.rowNum !== selectedRow);
                siblingButtonList.forEach((sEl, sIdx) => { if (sEl.rowNum > selectedRow) { sEl.rowNum--; } });
                // console.log("------- 🤔 🤭 🤫 🤥 😶 😐 😑-------------");
                // console.log("Row List After: ", positionElement);
                // console.log("position element After: ", positionElement);
                // console.log("Sibling Button After: ", siblingButtonList);




                // SETTING ATTRIBUTES - CLASS NAME AND IDES 





                selectedRowElement.remove();

                // SETTING ROW ID DYNAMICALLY 
                let idNum = selectedRow;
                // console.log("ID number: ", idNum);
                let i = 0;
                while (i < allNextEl.length) {
                    allNextEl[i].setAttribute('id', `row-${idNum}`);
                    // CHANGE ALL CHILD ELEMENT ID AND CLASS 
                    if (allNextEl[i].hasChildNodes()) {
                        // console.log("Has Child Nodes: ", allNextEl[i].childNodes);
                        allNextEl[i].childNodes.forEach((ncEl, ncIdx) => {
                            if (ncEl.hasChildNodes()) {
                                ncEl.childNodes.forEach((nccEl, nccIdx) => {
                                    // console.log("looping nodes: ", nccEl);
                                    if (nccEl.classList[1] === "icon-content-block") {
                                        // index 4 should be change
                                        // nccEl.id = `txt-${idNum}-${}`;
                                        // const rowIndex = nccEl.id.toString().substring(4, 5);
                                        nccEl.id = replaceAt(nccEl.id, 5, idNum);
                                    } else {
                                        nccEl.id = replaceAt(nccEl.id, 4, idNum);   // replace a charecter of index 4
                                    }
                                });
                            }
                        });
                    }
                    idNum++;
                    i++
                }



                propertiesBar.style.display = 'none';
                blockElementBar.style.display = 'block';

            } catch (err) {
                console.log(err);
            }

            // EVERYTIME WE DELETE A ROW WE SHOULD SUBSTRACT ROW ID BY ONE 
            rowID--;
        });


        // ROW MOVE UP 
        rowMoveUp.addEventListener('click', (e) => {
            const selectedRowElement = document.getElementById(`row-${selectedRow}`);
            // console.log("Selected Row: ", selectedRowElement);
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


                    // CHANGING ID OF CHILDS 
                    if (selectedRowElement.hasChildNodes()) {

                        let selectedColNum = 1;
                        let nextColNum = 1;
                        selectedRowElement.childNodes.forEach((acn, acnIdx) => {
                            // console.log("All child Nodes: ", acn);
                            if (acn.hasChildNodes()) {
                                // ALL CHILD OF CHILD NODES 
                                acn.childNodes.forEach((acocn, acocnIdx) => {
                                    // let currentRowId = stringIdToIdNum(acocn.id, 1);
                                    // let currentColId = stringIdToIdNum(acocn.id, 2);
                                    // let currentElementId = stringIdToIdNum(acocn.id, 0);
                                    // console.log("Current Row: " + currentRowId + "Current Col: " + currentColId + "Current Element: " + currentElementId);
                                    // console.log("All child of child: ", acocn);
                                    let contentId = acocn.id.toString().substring(0, 3);
                                    if (contentId === 'ico') contentId = 'icon';
                                    acocn.setAttribute('id', `${contentId}-${stringIdToIdNum(acocn.id, 1) - 1}-${stringIdToIdNum(acocn.id, 2)}`);
                                });
                            }
                        });
                        selectedRowElement.nextSibling.childNodes.forEach((acn, acnIdx) => {
                            // console.log("All child Nodes: ", acn);
                            if (acn.hasChildNodes()) {
                                // ALL CHILD OF CHILD NODES 
                                acn.childNodes.forEach((acocn, acocnIdx) => {
                                    // let currentRowId = stringIdToIdNum(acocn.id, 1);
                                    // let currentColId = stringIdToIdNum(acocn.id, 2);
                                    // let currentElementId = stringIdToIdNum(acocn.id, 0);
                                    // console.log(currentElementId);
                                    // console.log("Next Row: " + currentRowId + "Next Col: " + currentColId + "Next Element: " + currentElementId);

                                    // console.log("All child of child: ", acocn);
                                    let contentId = acocn.id.toString().substring(0, 3);
                                    if (contentId === 'ico') contentId = 'icon';
                                    acocn.setAttribute('id', `${contentId}-${stringIdToIdNum(acocn.id, 1) + 1}-${stringIdToIdNum(acocn.id, 2)}`);
                                });
                            }
                        });
                        /*
                        let i = 0;
                        let colNum = 1;

                        while (selectedRowElement.children.length > i) {
                            if (selectedRowElement.children[i].hasChildNodes()) {
                                console.log("All child nodes", selectedRowElement.childNodes);
                                selectedRowElement.children[i].childNodes.forEach((be, idx) => {
                                    let contentId = be.id.toString().substring(0, 3);
                                    if (contentId === 'ico') contentId = 'icon';
                                    be.setAttribute('id', `${contentId}-${selectedRow - 1}-${colNum}`);
                                    // console.log("Element: ", be);
                                    // console.log("be Selected Row is: ", selectedRow);
                                });

                                // SOME PROBLEM IN HERE 
                                console.log("All next child nodes", selectedRowElement.nextSibling.childNodes);
                                selectedRowElement.nextSibling.children[i].childNodes.forEach((nbe, idx) => {
                                    let contentId = nbe.id.toString().substring(0, 3);
                                    if (contentId === 'ico') contentId = 'icon';
                                    nbe.setAttribute('id', `${contentId}-${selectedRow}-${colNum}`);    // SOME PROBLEM IN HERE
                                    // console.log("Next Element: ", be);
                                    // console.log("nBe Selected Row is: ", selectedRow);
                                });
                                colNum++;
                                i++;
                            }
                        }
                        */
                    }




                    // WORKING WITH DATABASE 
                    let previousRow = selectedRow - 1;
                    positionElement.forEach((pEl, index) => {
                        if (pEl.rowNumber === previousRow) {
                            pEl.rowNumber = `${selectedRow}`.toString();
                        } else if (pEl.rowNumber === selectedRow) {
                            // console.log('match');
                            pEl.rowNumber = `${previousRow}`.toString();
                        }
                        pEl.rowNumber = parseInt(pEl.rowNumber);
                    });
                    // const previousElement = positionElement.filter((pEl, pelIdx) => pEl.rowNumber === previousRow);
                    // const currentElement = positionElement.filter((pEl, pelIdx) => pEl.rowNumber === selectedRow);


                    siblingButtonList.forEach((bEl, blIdx) => {
                        if (bEl.rowNum === previousRow) {
                            bEl.rowNum = `${selectedRow}`.toString();
                        } else if (bEl.rowNum === selectedRow) {
                            bEl.rowNum = `${previousRow}`.toString();
                        }
                        bEl.rowNum = parseInt(bEl.rowNum);
                    });

                    rowList.forEach((rl, rlIdx) => {
                        // console.log("Boolean: ", rl.hasOwnProperty("afterRow"));
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

                    // console.log("Move Down - \nRow List: ", rowList, "\nSibling Button: ", siblingButtonList, "\nPosition Element: ", positionElement);



                    propertiesBar.style.display = 'none';
                    blockElementBar.style.display = 'block';

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
                        // console.log("selectedRowElement.nextSibling.nextSibling: ", selectedRowElement.nextSibling.nextSibling);
                        // THIS IS FOR SKIPPING SPACE 
                        // dropColumnZone.insertBefore(selectedRowElement, selectedRowElement.nextSibling.nextSibling);
                        selectedRowElement.nextSibling.nextSibling.after(selectedRowElement)
                    } else {
                        // console.log("selectedRowElement.nextSibling: ", selectedRowElement.nextSibling);
                        // THERE IS NO SPACE IN NEXT SIBLING 
                        // dropColumnZone.insertBefore(selectedRowElement, selectedRowElement.nextSibling);
                        selectedRowElement.nextSibling.after(selectedRowElement);
                    }


                    console.log("Last child: ", dropColumnZone.lastChild);
                    selectedRowElement.setAttribute('id', `row-${selectedRow + 1}`);
                    selectedRowElement.previousSibling.setAttribute('id', `row-${selectedRow}`);



                    // CHANGING ID OF CHILDS 
                    if (selectedRowElement.hasChildNodes()) {
                        selectedRowElement.childNodes.forEach((acn, acnIdx) => {
                            // console.log("All child Nodes: ", acn);
                            if (acn.hasChildNodes()) {
                                // ALL CHILD OF CHILD NODES 
                                acn.childNodes.forEach((acocn, acocnIdx) => {
                                    let contentId = acocn.id.toString().substring(0, 3);
                                    if (contentId === 'ico') contentId = 'icon';
                                    acocn.setAttribute('id', `${contentId}-${stringIdToIdNum(acocn.id, 1) + 1}-${stringIdToIdNum(acocn.id, 2)}`);
                                });
                            }
                        });
                        selectedRowElement.previousSibling.childNodes.forEach((acn, acnIdx) => {
                            // console.log("All Previous child Nodes: ", acn);
                            if (acn.hasChildNodes()) {
                                // ALL CHILD OF CHILD NODES 
                                acn.childNodes.forEach((acocn, acocnIdx) => {
                                    let contentId = acocn.id.toString().substring(0, 3);
                                    if (contentId === 'ico') contentId = 'icon';
                                    acocn.setAttribute('id', `${contentId}-${stringIdToIdNum(acocn.id, 1) - 1}-${stringIdToIdNum(acocn.id, 2)}`);
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
                            // console.log('match');
                            pEl.rowNumber = `${nextRow}`.toString();
                        }
                        pEl.rowNumber = parseInt(pEl.rowNumber);
                    });
                    // const previousElement = positionElement.filter((pEl, pelIdx) => pEl.rowNumber === nextRow);
                    // const currentElement = positionElement.filter((pEl, pelIdx) => pEl.rowNumber === selectedRow);


                    siblingButtonList.forEach((bEl, blIdx) => {
                        if (bEl.rowNum === nextRow) {
                            bEl.rowNum = `${selectedRow}`.toString();
                        } else if (bEl.rowNum === selectedRow) {
                            bEl.rowNum = `${nextRow}`.toString();
                        }
                        bEl.rowNum = parseInt(bEl.rowNum);
                    });

                    rowList.forEach((rl, rlIdx) => {
                        // console.log("Boolean: ", rl.hasOwnProperty("afterRow"));
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
                    // console.log("Move Down - \nRow List: ", rowList, "\nSibling Button: ", siblingButtonList, "\nPosition Element: ", positionElement);



                    propertiesBar.style.display = 'none';
                    blockElementBar.style.display = 'block';
                } catch (err) {
                    console.log(err);
                }
            }
        });
    }
    rowUpDownDelete();
}