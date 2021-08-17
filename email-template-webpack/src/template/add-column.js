import {setAttributes} from '../utils/helpers';


// DRAG AND DROP COLUMN ELEMENT 
const draggableColumn = document.querySelectorAll('.block-col');
const dropColumnZone = document.getElementById('drop-zone');

// DRAGABLE CONTENT BLOCK 
const contentBlockCol = document.querySelectorAll('.content-block-col');



// THIS ROW LIST WOULD BE ANOTHER DATABASE TABLE 
let rowList = []; // THIS IS FOR TRACKING ROW DETAIL - FOR EXAMPLE - FIRST ROW WITH 3 COLUMN, 2ND ROW WITH ONE COLUMN, 3RD COLUMN WITH 2 COLUMN
let rowID = 1; // AUTO INCREMENT
let rowWithColumn;  // WHICH ROW IS SELECTING , 1 COLUMN ROW , 2 COLUMN ROW OR 3 COLUMN ROW










// DYNAMIC STYLING START
let increaseDZHeight = 200;
// DYNAMIC STYLING ENDS 








// MAIN FUNCTION 1
export default function columnDragAndDrop() {
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
        // dropColumnZone
        if (e.toElement.className === "drop-wrapper") {
            e.toElement.classList.add('add-border'); // ADD BORDER
        }
        e.preventDefault();
    }, false);
    dropColumnZone.addEventListener('drop', e => {
        let newDiv = document.createElement('div');
        // COLUMN ARE ONLY ABLE TO DROP INTO DROP ZONE (ID)
        if (e.toElement.id === 'drop-zone' && dropableColumn !== "space-row-grid") {
            e.toElement.classList.remove('add-border'); // REMOVE BORDER
            // PREVENT TO ADD MORE THAN 4 ROW 
            if (rowID <= 5) {
                // INCREASE HEIGHT OF WHOLE DROP ZONE 
                if (rowList.length >= 2) {
                    dropColumnZone.style.height = `${dropColumnZone.clientHeight + increaseDZHeight}px`;
                }
                // dropColumnZone.style.height = "100%"; // IN PREVIEW
                if (dropableColumn === "col-1-grid" || dropableColumn === "col-2-grid" || dropableColumn === "col-3-grid" || dropableColumn === "space-row-grid") {
                    setAttributes(newDiv, { "class": "drop-row", "id": `row-${rowID}` });
                    // ADD DEFFERENT TYPE OF STYLING FOR DEFFERENT TYPE OF COLUMN ELEMENT 
                    switch (dropableColumn) {
                        case 'col-1-grid':
                            // ADD 1 COLUMN INSIDE A DIV
                            const oneColumnDiv = document.createElement('div');
                            setAttributes(oneColumnDiv, { "class": "one-column-div", "id": `one-col-0-${rowID}` });
                            newDiv.appendChild(oneColumnDiv);
                            rowWithColumn = 1;
                            break;
                        case 'col-2-grid':
                            // ADD 2 COLUMN INSIDE A DIV 
                            for (let i = 0; i < 2; i++) {
                                const twoColumnDiv = document.createElement('div');
                                setAttributes(twoColumnDiv, { "class": "two-column-div", "id": `two-col-${i}-${rowID}` });
                                newDiv.appendChild(twoColumnDiv);
                                rowWithColumn = 2;
                            }
                            break;
                        case 'col-3-grid':
                            // ADD 3 COULMN INSIDE A DIV
                            for (let i = 0; i < 3; i++) {
                                rowWithColumn = 3;
                                const threeColumnDiv = document.createElement('div');
                                setAttributes(threeColumnDiv, { "class": "three-column-div", "id": `three-col-${i}-${rowID}` });
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
            } else {
                alert("You can't add more than 5 row");
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