const draggableColumn = document.querySelectorAll('.block-col');
// console.log("Dragable column : ", draggableColumn);
const dropColumnZone = document.getElementById('drop-zone');
// const dropIntoContainer = document.querySelectorAll('.drop-wrapper');







// DRAGABLE CONTENT BLOCK 
const contentBlockCol = document.querySelectorAll('.content-block-col');
// console.log("Content block column : ", contentBlockCol);








// DATABASE DESIGN START 
// THIS SOULD BE ADD TO THE DATABASE 
const dropElementsProperties = {};
// COUNT ROW AND COLUMNS 

let rowID = 1; // AUTO INCREMENT
// THIS ROW LIST WOULD BE ANOTHER DATABASE TABLE 
let rowList = []; // THIS IS FOR TRACKING ROW DETAIL - FOR EXAMPLE - FIRST ROW WITH 3 COLUMN, 2ND ROW WITH ONE COLUMN, 3RD COLUMN WITH 2 COLUMN

let rowWithColumn;  // WHICH ROW IS SELECTING , 1 COLUMN ROW , 2 COLUMN ROW OR 3 COLUMN ROW
// DATABASE DESIGN ENDS 







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
        // console.log("Dropable column: ", dropableColumn);
        if (dropableColumn === "col-1-grid" || dropableColumn === "col-2-grid" || dropableColumn === "col-3-grid") {

            // console.log("this element is dropable");

            // e.preventDefault();
            // console.log("Drag over - E: ", e.srcElement);

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
                        const twoColumnDiv = document.createElement('div');
                        twoColumnDiv.setAttribute('class', 'two-column-div');
                        newDiv.appendChild(twoColumnDiv);
                        rowWithColumn = 2;
                    }
                    break;
                case 'col-3-grid':
                    // ADD 3 COULMN INSIDE A DIV
                    for (let i = 0; i < 3; i++) {
                        const threeColumnDiv = document.createElement('div');
                        threeColumnDiv.setAttribute('class', 'three-column-div');
                        newDiv.appendChild(threeColumnDiv);
                        rowWithColumn = 3;
                    }
                    break;
                default:
                    dropableColumn = null;
                    break;
            };


            dropColumnZone.appendChild(newDiv);
            rowList.push({ rowID, rowWithColumn });
            // console.log("Row List from function end: ", rowList);
            // EVERYTIME WHEN WE ADD A ROW WE WILL ADD 1
            rowID++;

            // MAKE DROPABLE COLUMN NULL ONCE AGAIN SO IT WILL CHECK THE NEXT ITEM 
            dropableColumn = null;
        }
        // else {

        //     alert("This element is not dropable, you must add column first");
        // }
    });
    // DROPZONE EVENTS ENDS
}



columnDragAndDrop();







function blockDragAndDrop() {
    let dropableBlock = null;


    contentBlockCol.forEach((blockCol, index) => {
        // DRAGABLE BLOCK
        blockCol.addEventListener('dragstart', (e) => {
            // console.log("Content block dragstart - E: ", e);
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
            // console.log("Content block drag start ");
            // console.log("Content block dragstart children", dropColumnZone.children);

        });
    });









    // document.addEventListener('dragleave', (e) => {
    //     console.log("Mouseleave - Event: ");
    //     // console.log("Mouseleave - Event: ", e.toElement);
    // });
    document.addEventListener('dragover', (e) => {
        e.preventDefault();
        // console.log("dragover - Event: Prevent default");
        // console.log("Mouseover - Event: ", e.toElement);
    });



    document.addEventListener('drop', (e) => {
        // console.log("Targeter element", e.target.className);
        let dropableColumn = e.target.className;
        // ONLY DROP WHEN DROPABLE ELEMENT IS COLUMN 
        if (dropableColumn === "one-column-div" || dropableColumn === "two-column-div" || dropableColumn === "three-column-div") {

            if (dropableBlock === "img-holder" || dropableBlock === "txt-holder" || dropableBlock === "btn-holder" || dropableBlock === "social-holder" || dropableBlock === "spx-holder") {
                // console.log("Drop - Dropable Block: ", dropableBlock);
                // console.log("Drop event : ", e);
                // console.log("Drop - Event: ", e.toElement);
                const newBlockCol = document.createElement('div');
                newBlockCol.setAttribute('id', "working");
                newBlockCol.textContent = 'Hello world 😊';
                e.toElement.appendChild(newBlockCol);
            } else {
                console.log("Drop - Not Dropable Block: ", dropableBlock);
            }
        } else {

        }
    });
}


blockDragAndDrop();


















































// PLANNING 
// THIS WAY IS NOT WORKING SO NOW I AM GOING TO APPEND ALL BLOCK ELEMENT INTO DROP ZONE (ELEMENT ID)
// BY USING CSS I WILL STYLE TOP OF THE COLUMN DIV BY USING POSITION ABSOLUTE 
// OR WE CAN REMOVE BELOW DIV AND USE CREATE NEW DIV THAT WE WANT TO APPEND OUR BLOCK

//  OR WE CAN MADE THE EVENT LISTENER OR ACTION ABOVE WHERE WE MADE THE ELEMENT dropableColumnZone

// OR WE CAN MADE COLUMN ELEMENT GLOBALLY(OUTSIDE OF ANY FUNCTION OR LOOP) SO WE CAN ACCESS ANYWARE 
// OR WE CAN SEECT DIRECTLY FROM THE ELEMENT // document.addEventListener   == IT'S WORKED 😊

/*
// console.log("Rowlist: ", rowList);

function blockDragAndDrop() {
    // const dropRow = document.querySelectorAll('.drop-row');
    // console.log("dropable row: ", dropRow);
    // try {

    //     const rowColumn = dropRow.querySelectorAll('.one-column-div');
    //     console.log("Row column: ", rowColumn);
    // } catch (error) {
    //     console.log(error);
    // }


    contentBlockCol.forEach((blockCol, index) => {
        // DRAGABLE BLOCK
        blockCol.addEventListener('dragstart', (e) => {
            // console.log("Content block drag start ");
            console.log("Content block dragstart - E: ", e);
            // console.log("Content block dragstart children", dropColumnZone.children);


        });
    });


    // const twoColumnDiv = document.querySelectorAll('.two-column-div');
    // console.log("Two column div: ", twoColumnDiv);



    try {
        console.log("dropableColumnZone: ", dropableColumnZone);
        for (let i = 0; i < dropColumnZone.length; i++) {

            const element = array[i];
            console.log("element");

        }
        // dropableColumnZone.forEach((el, i) => {
        //     console.log("Element: ", el);
        //     console.log("Index: ", i);
        // });
        // dropRow.childNodes.addEventListener('dragover', (e) => {
        //     console.log("Drag over - event: ", e);
        // });
    } catch (error) {
        console.log(error);
    }



    // DROPABLE COLUMN
    // dropRow.childNodes.forEach((oneCol, index) => {
    //     console.log("Content block: ", oneCol);
    //     oneCol.addEventListener("dragover", function (event) {
    //         // prevent default to allow drop
    //         // event.preventDefault();
    //         console.log("Content block - Dragover: ");
    //     }, false);

    // });
}


blockDragAndDrop();
*/




