// TITLE 
const inputTitle = document.getElementById('title');
const saveButton = document.getElementById('save-btn');



const draggableColumn = document.querySelectorAll('.block-col');
const dropColumnZone = document.getElementById('drop-zone');








// DRAGABLE CONTENT BLOCK 
const contentBlockCol = document.querySelectorAll('.content-block-col');








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

























// CHANGING TITLE 
saveButton.addEventListener('click', e => {
    e.preventDefault();
    title = inputTitle.value;
    inputTitle.nodeValue = title;
});



// DROPABLE COLUMN ELEMENTS 
// let dropableColumnZone = [];






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










    document.addEventListener('dragover', (e) => {
        e.preventDefault();
        // if (e.toElement.className === "one-column-div" || e.toElement.className === "two-column-div" || e.toElement.className === "three-column-div") {
        //     // console.log("E: ", e);
        //     // console.log("Mouseover - Event: ", e.toElement.className);
        // }
        // console.log("dragover - Event: Prevent default");
        // console.log("Mouseover - Event: ", e.path[1].classList);
        // console.log(e.target);

    });



    document.addEventListener('drop', (e) => {
        // console.log("Mouseover - Event: ", e.toElement.id);   // GETTING COLUMN ID (iNDICATES INDEX NUMBER OF THE COLUMN)

        // console.log("Mouseover - Event: ", e.path[1].id); // // GETTING ROW ID (iNDICATES INDEX NUMBER OF THE ROW)
        // console.log("Targeter element", e.target.className); // Result - three-column-div
        if (e.toElement.id !== 'drop-zone') {
            // console.log(e.toElement.id);
            let dropableColumn = e.target.className;
            // if (dropableColumn === 'one-column-div') {
            //     // console.log("Drop - One E: ", e);
            // } else if (dropableColumn === 'two-column-div') {
            //     // console.log("Drop - Two E: ", e);
            // } else if (dropableColumn == 'three-column-div') {
            //     // console.log("Drop - Three E: ", e);
            // }
            // ONLY DROP WHEN DROPABLE ELEMENT IS COLUMN 
            if (dropableColumn === "one-column-div" || dropableColumn === "two-column-div" || dropableColumn === "three-column-div") {
                // CHECK FOR WHICH COLUMN WE ARE DROPING THE BLOCK ELEMENT 

                /*
                if (dropableBlock === "img-holder" || dropableBlock === "txt-holder" || dropableBlock === "btn-holder" || dropableBlock === "social-holder" || dropableBlock === "spx-holder") {

                    // console.log("Drop - Dropable Block: ", dropableBlock);
                    // console.log("Drop event : ", e);
                    console.log("Drop - Event: ", e.target);
                    const newBlockCol = document.createElement('div');
                    newBlockCol.setAttribute('class', "block");
                    newBlockCol.textContent = dropableBlock + ' 😊';
                    e.toElement.appendChild(newBlockCol);

                    rowNumber = convertRowIdToNumber(e.path[1].id);
                    columnNumber = convertColIdToNumber(e.toElement.id);
                    blockElement = dropableBlock;
                    positionElement.push({ rowNumber, columnNumber, blockElement });
                    // console.log(positionElement);
                } else {
                    console.log("Drop - Not Dropable Block: ", dropableBlock);
                }
                */
                if (dropableBlock === "img-holder") {
                    // console.log("Drop - Dropable Block: ", dropableBlock);
                    // console.log("Drop event : ", e);
                    // console.log("Drop - E: e.toElement", e.toElement);  // RESULT = <div class="one-column-div" id="one-col-0"></div>
                    const newBlockCol = document.createElement('div');
                    //  setAttributes(elem, {"src": "http://example.com/something.jpeg", "height": "100%", ...});
                    setAttributes(newBlockCol, { "style": "background: url(icon/picture.png); ", "class": "block", 'id': 'img-holder' });
                    e.toElement.appendChild(newBlockCol);

                    // DATABASE AND VARIABLE 
                    rowNumber = convertRowIdToNumber(e.path[1].id);
                    columnNumber = convertColIdToNumber(e.toElement.id);
                    blockElement = dropableBlock;
                    positionElement.push({ rowNumber, columnNumber, blockElement });
                    // console.log(positionElement);
                } else if (dropableBlock === "txt-holder") {
                    rowNumber = convertRowIdToNumber(e.path[1].id);
                    columnNumber = convertColIdToNumber(e.toElement.id);

                    const newBlockCol = document.createElement('div');
                    setAttributes(newBlockCol, { 'class': "block", "id": "txt-holder" });   //  "txt-" + rowNumber + '-' + columnNumber 
                    newBlockCol.textContent = '😊Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil corrupti natus eos in a voluptas incidunt porro quis autem quo!';
                    e.toElement.appendChild(newBlockCol);

                    blockElement = dropableBlock;
                    positionElement.push({ rowNumber, columnNumber, blockElement });
                } else if (dropableBlock === "btn-holder") {
                    rowNumber = convertRowIdToNumber(e.path[1].id);
                    columnNumber = convertColIdToNumber(e.toElement.id);

                    const newBlockCol = document.createElement('button');
                    setAttributes(newBlockCol, { 'class': "block", "id": "btn-holder" });   //  "txt-" + rowNumber + '-' + columnNumber 
                    newBlockCol.textContent = 'Preview';
                    e.toElement.appendChild(newBlockCol);

                    blockElement = dropableBlock;
                    positionElement.push({ rowNumber, columnNumber, blockElement });
                } else if (dropableBlock === "social-holder") {
                    rowNumber = convertRowIdToNumber(e.path[1].id);
                    columnNumber = convertColIdToNumber(e.toElement.id);



                    const newBlockCol = document.createElement('button');
                    setAttributes(newBlockCol, { 'class': "block", "id": "btn-holder" });   //  "txt-" + rowNumber + '-' + columnNumber 
                    e.toElement.appendChild(newBlockCol);
                    // CREATING THREE SOCIAL ICON 
                    for (let i = 0; i < 3; i++) {
                        const threeButton = document.createElement('button');
                        setAttributes(threeButton, { "class": "icon", "id": `icon-${i}` });
                        threeButton.textContent = 'icon';
                        newBlockCol.appendChild(threeButton);
                    }

                    blockElement = dropableBlock;
                    positionElement.push({ rowNumber, columnNumber, blockElement });
                } else if (dropableBlock === "spx-holder") {
                    rowNumber = convertRowIdToNumber(e.path[1].id);
                    columnNumber = convertColIdToNumber(e.toElement.id);

                    const newBlockCol = document.createElement('button');
                    setAttributes(newBlockCol, { 'class': "block", "id": "btn-holder" });   //  "txt-" + rowNumber + '-' + columnNumber 
                    newBlockCol.textContent = 'space';
                    e.toElement.appendChild(newBlockCol);

                    blockElement = dropableBlock;
                    positionElement.push({ rowNumber, columnNumber, blockElement });
                } else {
                    console.log('Not creating element');
                }
            } else {
                console.log("Not dropable column");
            }
        };
    });
}





document.addEventListener('click', e => {
    console.log("Click: E", e);
    console.log("Click: E Target", e.target);
});


blockDragAndDrop();












































// EXTRA FUNCTIONS 
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



function setAttributes(el, attrs) {
    for (let key in attrs) {
        el.setAttribute(key, attrs[key]);
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
























































