console.log("Template");
const preview = document.getElementById('et-drop-zone');

// THIS IS COMMING FROM DATABASE TABLE 
const layoutArray = [
    {
        "rowID": 1,
        "rowWithColumn": 3
    },
    {
        "rowID": 2,
        "rowWithColumn": 2
    },
    {
        "rowID": 3,
        "rowWithColumn": 1
    }
];




// CREATEING HTML ELEMENT 
function htmlElement() {
    layoutArray.forEach((el, index) => {
        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'et-drop-row');
        // console.log("el.rowWithColumn : ", el.rowWithColumn);

        for (let i = 0; i < el.rowWithColumn; i++) {
            const columnDiv = document.createElement('div');
            switch (el.rowWithColumn) {
                case 1:
                    columnDiv.setAttribute('class', 'et-one-column-div');
                    break;
                case 2:

                    columnDiv.setAttribute('class', 'et-two-column-div');
                    break;
                case 3:
                    columnDiv.setAttribute('class', 'et-three-column-div');
                    break;

                default:
                    columnDiv.setAttribute('class', 'et-one-column-div');
                    break;
            }
            // MAKING COLUMN 
            newDiv.appendChild(columnDiv);
        }
        // MAKING ROW 
        preview.appendChild(newDiv);
    });
}


htmlElement();