const draggableColumn = document.querySelectorAll('.block-col');
const dropColumnZone = document.getElementById('drop-zone');
// const dropIntoContainer = document.querySelectorAll('.drop-wrapper');



// DATABASE DESIGN START 
// THIS SOULD BE ADD TO THE DATABASE 
const dropElementsProperties = {};
// COUNT ROW AND COLUMNS 

let rowID = 1; // AUTO INCREMENT
// THIS ROW LIST WOULD BE ANOTHER DATABASE TABLE 
let rowList = []; // THIS IS FOR TRACKING ROW DETAIL - FOR EXAMPLE - FIRST ROW WITH 3 COLUMN, 2ND ROW WITH ONE COLUMN, 3RD COLUMN WITH 2 COLUMN

let rowWithColumn;  // WHICH ROW IS SELECTING , 1 COLUMN ROW , 2 COLUMN ROW OR 3 COLUMN ROW
// DATABASE DESIGN ENDS 



function columnDragAndDrop() {
    let dropableColumn = null;

    draggableColumn.forEach((column, index) => {
        column.addEventListener('dragstart', (e) => {
            console.log("Drag Start - E: ", e);
            if (e.toElement.classList[0]) {
                console.log("Valid element");
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
            } else {
                console.log("this is not column");
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
        if (dropableColumn === "col-1-grid" || dropableColumn === "col-2-grid" || dropableColumn === "col-3-grid") {
            console.log("this element is dropable");

            // e.preventDefault();
            // console.log("Drag over - E: ", e.srcElement);
            console.log("Drop - E.Target: ", e.target);

            // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
            const newDiv = document.createElement('div');
            newDiv.setAttribute('class', 'drop-row');


            // ADD DEFFERENT TYPE OF STYLING FOR DEFFERENT TYPE OF COLUMN ELEMENT 
            switch (dropableColumn) {
                case 'col-1-grid':
                    // ADD 1 COLUMN INSIDE A DIV
                    const oneColumnDiv = document.createElement('div');
                    oneColumnDiv.setAttribute('class', 'one-column-div');
                    newDiv.appendChild(oneColumnDiv);
                    rowWithColumn = 1;
                    break;
                case 'col-2-grid':
                    // ADD 2 COLUMN INSIDE A DIV 
                    for (let i = 0; i < 2; i++) {
                        console.log("two column grid: " + i);
                        const twoColumnDiv = document.createElement('div');
                        twoColumnDiv.setAttribute('class', 'two-column-div');
                        newDiv.appendChild(twoColumnDiv);
                        rowWithColumn = 2;
                    }
                    break;
                case 'col-3-grid':
                    // ADD 3 COULMN INSIDE A DIV
                    for (let i = 0; i < 3; i++) {
                        console.log("two column grid: " + i);
                        const threeColumnDiv = document.createElement('div');
                        threeColumnDiv.setAttribute('class', 'two-column-div');
                        newDiv.appendChild(threeColumnDiv);
                        rowWithColumn = 3;
                    }
                    break;
                default:
                    dropableColumn = null;
                    break;
            };
            console.log("current row with column: ", rowWithColumn);
            console.log("rowID : ", rowID);
            dropColumnZone.appendChild(newDiv);
            rowList.push({ rowID, rowWithColumn });
            console.log("Row List from function end: ", rowList);
            // EVERYTIME WHEN WE ADD A ROW WE WILL ADD 1
            rowID++;
        } else {
            alert("This element is not dropable, you must add column first");
        }
    });


    // DROPZONE EVENTS ENDS
}



columnDragAndDrop();




