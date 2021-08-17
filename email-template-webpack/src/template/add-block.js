import {setAttributes, stringIdToIdNum} from '../utils/helpers';
// DRAGABLE CONTENT BLOCK 
const contentBlockCol = document.querySelectorAll('.content-block-col');


// WEBSITE DEFAULT URL OPERATION 
let websiteDomain = "http://" + window.location.host, defaultFbLink = 'fb.com/md.shayon.148', defaultTwitterLink = 'twitter.com/shayon_md', defaultInstaLink = 'https://www.instagram.com/md_shayon/';

// DATABASE DESIGN START 
let positionElement = [];   // THIS IS FOR TRACKING WHICH WHICH BLOCK ELEMENT IS HOLDING WHICH POSITION - FOR EXAMPLE IMAGE HOLDER IS TAKING ROW-2 AND COLUMN 2
let siblingButtonList = new Array();

// WHEN SOMEONE CLICK ON BLOCK ELEMENT IT CAN ASSIGNED WITH ROW NUMBER AND COL NUMBER 
let selectedRow = null;
let selectedCol = null;

// IMAGE 
let imgDefaultUrl = "/img/empty-image.png";
let imageBlockElment = null;

//TEXT
let text = null;

// BUTTON 
let btnDefaultTxt = "Preview";

//SOCIAL
let iconLink = '#';





// MAIN FUNCTION 2
export default function blockDragAndDrop() {
    console.log(__dirname);
    let dropableBlock = null;
    let rowNumber;
    let columnNumber;
    let blockElement = null;

    // DRAGSTART - SET VARIABLE TO BE SURE WHICH ELEMENT IS DRAGGING 
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
        // console.log("Drag over: ", e.target);
        e.preventDefault();

    });
    document.addEventListener("dragenter", function (e) {
        // highlight potential drop target when the draggable element enters it
        if (e.target.className === "two-column-div" || e.target.className === "one-column-div" || e.target.className === "three-column-div") {
            // e.target.classList.add('add-bg');
            e.target.style.backgroundColor = "rgb(122, 166, 206)";
        }

    }, false);

    document.addEventListener("dragleave", function (e) {
        // reset background of potential drop target when the draggable element leaves it
        if (e.target.className === "two-column-div" || e.target.className === "one-column-div" || e.target.className === "three-column-div") {
            // e.target.classList.add('add-bg');
            e.target.style.backgroundColor = "#e6f2ff";
        }

    }, false);
    document.addEventListener('drop', (e) => {
        if (e.target.className === "two-column-div" || e.target.className === "one-column-div" || e.target.className === "three-column-div") {
            // e.target.classList.add('add-bg');
            e.target.style.backgroundColor = "#e6f2ff";
        }
        // if (e.target.parentElement.childNodes !== undefined) {
        //     console.log(e.target.parentElement.childNode);
        //     e.target.parentElement.childNodes.forEach(colChild => colChild.style.backgroundColor = "#e6f2ff");
        // }
        // document.querySelectorAll(".drop-row")[0].childNodes.forEach(colChild => colChild.style.backgroundColor = "#e6f2ff"); //SET BACK TO DEFAULT BG COLOR


        // ONLY COLLUMNS ARE VALID TO DROP INTO DROP ZONE 
        if (e.toElement.id !== 'drop-zone' && dropableBlock !== 'spx-holder') {
            // console.log(e.toElement.id);
            let dropableColumn = e.target.className;
            let dropInsideImgTxt = e.target.classList[1];
            // console.log(e.target.classList[1]); // txt-content-block
            // console.log("Drop - E: ", e.target); // two-column-div
            // console.log("Drop - E: ", e.target); // img-content-block



            try {

                // PREVENT TO ADD MORE THAN 2 BLOCK IN A ROW 
                if (e.target.children.length >= 2) {
                    alert("You can't add more than 2 content inside a row");
                } else {
                    // ONLY DROP WHEN DROPABLE ELEMENT IS COLUMN 
                    if (dropableColumn === "one-column-div" || dropableColumn === "two-column-div" || dropableColumn === "three-column-div" || e.target.classList[1] == "img-content-block" || e.target.classList[1] == "txt-content-block") {

                        // CHECK FOR WHICH COLUMN WE ARE DROPING THE BLOCK ELEMENT 
                        if (dropableBlock === "img-holder") {
                            if (dropableColumn === "one-column-div" || dropableColumn === "two-column-div" || dropableColumn === "three-column-div") {
                                // PREVENT TO DROP MULTIPLE IMG OR TXT BLOCK INTO ONE BLOCK 
                                if (e.target.children[0] !== undefined && e.target.children[0] !== null) {
                                    if (e.target.children[0].classList[1] === "img-content-block" || e.target.classList[1] === "img-content-block") {
                                        // console.log("E: don't add ", e.target.children[0].classList[1]);
                                        alert("You can't add multiple image block in a column");
                                    }
                                } else {
                                    // console.log("Undefined- add element", e.target);
                                    //VARIABLE
                                    // rowNumber = convertRowIdToNumber(e.toElement.parentElement.id);
                                    // columnNumber = convertColIdToNumber(e.toElement.id);
                                    rowNumber = stringIdToIdNum(e.toElement.parentElement.id, 1);
                                    let tempColNum = stringIdToIdNum(e.toElement.id, 2);
                                    columnNumber = tempColNum + 1;
                                    // console.log("E: Target ", e.toElement.id);
                                    // CREATING IMAGE 
                                    let imgID = `"img-${rowNumber + '-' + columnNumber}"`;
                                    imageBlockElment = `<a href="#" class="img-block-href"><img src="${imgDefaultUrl}" class="content img-content-block" alt="Image" id=${imgID}></a>`;
                                    e.toElement.innerHTML = imageBlockElment;
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
                                        // console.log("E: don't add ", e.target.children[0].classList[1]);
                                        alert("You can't add multiple text block in a column");
                                    }
                                } else {
                                    // CREATING REXT 
                                    rowNumber = stringIdToIdNum(e.toElement.parentElement.id, 1);
                                    let tempColNum = stringIdToIdNum(e.toElement.id, 2);
                                    columnNumber = tempColNum + 1;
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



                            }





                        } else if (dropableBlock === "btn-holder") {
                            // console.log(e.target.hasChildNodes());
                            // console.log("Drop - E: button holder ", e.target); // txt-content-block 
                            // console.log("Drop - E: button holder ", e.target); // two-column-div // HAS CHILD NODES
                            // console.log("Drop - E: button holder ", e.target); // img-content-block
                            // console.log("Drop - E: button holder ", e.target); // img-content-block




                            function insertButtonElement(getColID, getRowID) {
                                // console.log(e);
                                const newBlockCol = document.createElement('a');
                                // rowNumber = convertRowIdToNumber(getRowID);
                                // columnNumber = convertColIdToNumber(getColID);
                                rowNumber = stringIdToIdNum(getRowID, 1);
                                let tempColNum = stringIdToIdNum(e.toElement.id, 2);
                                columnNumber = tempColNum + 1;
                                setAttributes(newBlockCol, { "id": "btn-" + rowNumber + '-' + columnNumber, "href": "#" });   //  "txt-" + rowNumber + '-' + columnNumber 
                                newBlockCol.textContent = btnDefaultTxt;
                                newBlockCol.className = "content btn-content-block";
                                return newBlockCol;
                            }

                            // THIS BUTTON SHOULD ONLY INSERT INTO IMAGE OR TEXT
                            if (e.toElement.classList[1] === "txt-content-block" || e.toElement.classList[1] === "img-content-block") {
                                // console.log("Exact Nodes: ", e.target.parentElement); // img-content-block
                                if (e.target.classList[1] === "txt-content-block") {

                                    e.target.after(insertButtonElement(e.target.parentElement.id, e.target.parentElement.parentElement.id))
                                }
                                if (e.toElement.classList[1] === "img-content-block") {
                                    // console.log("Img content ", e.target.parentElement.parentElement);
                                    // console.log("Img content ", e.target);
                                    e.target.parentElement.after(insertButtonElement(e.target.parentElement.parentElement.id, e.target.parentElement.parentElement.parentElement.id))
                                }
                                btnBlockElement = "<a >button</a>";
                                siblingButtonList.push({ rowNum: rowNumber, colNum: columnNumber, btnBgColor: "rgb(70, 133, 192)", btnTextColor: "rgb(15, 48, 80)", btnHyperlink: websiteDomain, btnOpenNewTab: false, btnRound: false, btnAlign: "inherit", btnContent: "Preview", btnFontFamily: "Helvetica", btnFontSize: 12 });

                                // e.target.parentElement.after(newBlockCol);
                            } else {
                                // console.log("Drop into the row: ", e.target.parentElement); // drop-row
                                if (e.target.hasChildNodes()) {
                                    // img-block-href // txt-content-block
                                    if (e.target.childNodes[0].classList[1] === "txt-content-block" || e.target.childNodes[0].className === "img-block-href") {
                                        // console.log("Has a child nodes", e.target.childNodes[0]);
                                        e.target.appendChild(insertButtonElement(e.target.id, e.target.parentElement.id));
                                        btnBlockElement = `<a >button</a>`;
                                        siblingButtonList.push({ rowNum: rowNumber, colNum: columnNumber, btnBgColor: "rgb(70, 133, 192)", btnTextColor: "rgb(15, 48, 80)", btnHyperlink: websiteDomain, btnOpenNewTab: false, btnRound: false, btnAlign: null, btnContent: "Preview", btnFontFamily: "Helvetica", btnFontSize: 12 });
                                    }
                                    // if (e.target.childNodes[0].hasChildNodes()) {
                                    //     console.log("Child of child Nodes: ", e.target.childNodes[0].classList[1]);
                                    //     if (e.target.childNodes[0].childNodes[0].classList[1] === "img-content-block") {
                                    //         e.target.appendChild(insertButtonElement(e.target.id, e.target.parentElement.id));
                                    //     }
                                    // } else {
                                    //     console.log("Child Nodes: ", e.target.childNodes[0].classList[1]);

                                    // }
                                    // if (e.target.childNodes[0].hasChildNodes()) {
                                    //     console.log("Child of child Nodes: ", e.target); // img-content-block
                                    // } else {
                                    //     console.log("Child Nodes: ", e.target); // img-content-block

                                    // }
                                } else {
                                    alert("Add  a text or image block to add button");
                                }

                            }
                            // console.log(`Row Num: ${rowNumber} \n Col Num: ${columnNumber}`);
                            // if (e.target.hasChildNodes() === true) {



                            /*
                            if (e.toElement.classList[1] === "img-content-block" || dropInsideImgTxt === "txt-content-block" || e.toElement.classList[1] === "img-content-block" || e.toElement.children[0].classList[1] === "txt-content-block") {
                                // INSERT A SIBLING AFTER 
                                const newBlockCol = document.createElement('a');
                                rowNumber = convertRowIdToNumber(e.path[1].id);
                                columnNumber = convertColIdToNumber(e.toElement.id);

                                function insertButtonElement(elementAfter) {
                                    if (e.target.parentElement.className === 'one-column-div' || dropableColumn === "one-column-div") {
                                        // LEFT POSITION ELEMENT FROM HERE 
                                        setAttributes(newBlockCol, { "id": "btn-" + rowNumber + '-' + columnNumber, "href": "#" });   //  "txt-" + rowNumber + '-' + columnNumber 
                                        newBlockCol.className = "content btn-content-block";
                                        newBlockCol.textContent = btnDefaultTxt;
                                        elementAfter.after(newBlockCol)
                                    } else if (e.target.parentElement.className === 'two-column-div' || dropableColumn === "two-column-div") {
                                        // RIGHT POSITION ELEMENT FROM HERE 
                                        setAttributes(newBlockCol, { "id": "btn-" + rowNumber + '-' + columnNumber, "href": "#" });   //  "txt-" + rowNumber + '-' + columnNumber 
                                        newBlockCol.textContent = btnDefaultTxt;
                                        newBlockCol.className = "content btn-content-block";
                                        elementAfter.after(newBlockCol)
                                    } else if (e.target.parentElement.className === 'three-column-div' || dropableColumn === "three-column-div") {
                                        // CENTER POSITION ELEMENT FROM HERE  
                                        setAttributes(newBlockCol, { "id": "btn-" + rowNumber + '-' + columnNumber, "href": "#" });   //  "txt-" + rowNumber + '-' + columnNumber 
                                        newBlockCol.textContent = btnDefaultTxt;
                                        newBlockCol.className = "content btn-content-block";
                                        elementAfter.after(newBlockCol)
                                    } else {
                                        console.log(e.target);
                                    }
                                }
                                // console.log("E btn-holder: ", e.target.children.length);

                                if (dropInsideImgTxt === "img-content-block" || dropInsideImgTxt === "txt-content-block") {
                                    insertButtonElement(e.toElement);
                                } else {
                                    insertButtonElement(e.toElement.childNodes[0]);
                                }
                                btnBlockElement = `<a >button</a>`;
                                siblingButtonList.push({ rowNum: rowNumber, colNum: columnNumber, btnBgColor: "rgb(70, 133, 192)", btnTextColor: "rgb(15, 48, 80)", btnHyperlink: websiteDomain, btnOpenNewTab: false, btnRound: false, btnAlign: null, btnContent: "Preview", btnFontFamily: "Helvetica", btnFontSize: 12 });

                                // THIS WOULD NOT BE PUSH - THIS WOULD BE UPDATE WITH NEW
                            } else {
                                alert('this button is not dropable here');
                            }
                            */

                            // } else {
                            //     alert('Add text or image to add a button withen a column');
                            // }

                        } else if (dropableBlock === "social-holder") {
                            if (e.target.children[0] !== undefined && e.target.children[0] !== null) {
                                if (e.target.children[0].classList[1] === "icon-content-block" || e.target.classList[1] === "icon-content-block") {
                                    // console.log("E: don't add ", e.target.children[0].classList[1]);
                                    alert("You can't add multiple social icon block in a column");
                                }
                            } else {
                                // The Social Media Icons can only be dragged to a one - column or a two - column layout
                                if (dropableColumn === "one-column-div" || dropableColumn === "two-column-div") {
                                    rowNumber = stringIdToIdNum(e.toElement.parentElement.id, 1);
                                    let tempColNum = stringIdToIdNum(e.toElement.id, 2);
                                    columnNumber = tempColNum + 1;
                                    // CREATING THREE SOCIAL ICON 
                                    // iconBlockElement = `<div class="content icon-content-block" id="icon-${rowNumber + '-' + columnNumber}" ><a href="${iconLink}" class="social-icon-content"><img class="social-icon-img" src="${fb_icon}" ></a><a href="${iconLink}" class="social-icon-content"><img class="social-icon-img" src="${twitter_icon}" ></a><a href="${iconLink}" class="social-icon-content"><img class="social-icon-img" src="${instagram_icon}" ></a><div />`;
                                    // iconBlockElement = `<div  >Social<div />`;
                                    // const newEl = document.createElement("div");
                                    // newEl.textContent = "Social";
                                    // e.toElement.innerHTML = iconBlockElement;
                                    // const newEl = stringToNodes(iconBlockElement);
                                    // e.toElement.appendChild(newEl);
                                    const iconContainer = document.createElement("div");
                                    setAttributes(iconContainer, { "id": `icon-${rowNumber}-${columnNumber}` });
                                    iconContainer.className = "content icon-content-block";
                                    const iconHolder = createSocialIcons(iconContainer, iconLink, iconLink, iconLink);
                                    e.toElement.appendChild(iconHolder);
                                    // console.log(e.toElement);
                                    // CHANGING HEIGHT OF ROW 
                                    if (dropableColumn === "one-column-div") e.target.parentElement.style.height = "8em";


                                    // console.log(pvIcons);
                                    blockElement = dropableBlock;
                                    positionElement.push({ rowNumber, columnNumber, blockElement: { name: "socialBlockContent", blockHtml: "<div>social</div>", socialFbHyperlink: defaultFbLink, socialTwitterHyperlink: defaultTwitterLink, socialInstagramHyperlink: defaultInstaLink } });
                                } else {
                                    alert("Social icon can't drop into three column!");
                                }
                            }
                        } else {
                            console.log('Not creating CONTENT element');
                        }
                    } else {
                        console.log("Not dropable column");
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };
    });
}