/*
dropColumnZone.addEventListener('drop', async e => {
    // e.target.className === "drop-row" || e.target.parentElement.className === 'drop-row' || e.target.parentElement.parentElement.className === "drop-row" || e.target.parentElement.parentElement.parentElement.className === "drop-row"
    let newDiv = document.createElement('div');
    // console.log("Block col - ", blockCol);
    // COLUMN ARE ONLY ABLE TO DROP INTO DROP ZONE (ID)
    if (blockCol === "block-col") {
        let dropWrapper = null;


        // console.log("targeted element - ", e.target);
        let targetedRowElement = null;

        for (let f of getAllParentNode(e.target)) {
            if (f.className !== undefined) {
                if (f.className === "drop-wrapper") {
                    console.log("parent element - ", f);
                }
                if (f.className === "drop-row") {
                    console.log("targeted row - ", f);
                    targetedRowElement = f;
                }

            }
        }



        if (targetedRowElement !== null) {
            elementHeight = targetedRowElement.offsetHeight;
            // GETTING ELEMENT HEIGHT 
            let rect = targetedRowElement.getBoundingClientRect();
            const y = e.clientY - rect.top;
            newDiv.className = 'space space-row-grid';
            let middleOfY = elementHeight / 2;
            let rowNum = stringIdToIdNum(targetedRowElement.id, 1);
            if (y > middleOfY) {

                console.log("After - Y - " + y + " MiddleOfY -" + middleOfY);
            }
            if (y < middleOfY) {
                console.log("Before - Y - " + y + " MiddleOfY -" + middleOfY);
            }
        }




        // // console.log("E parent of parent of parent of parent - ", e.target.parentElement.parentElement.parentElement.preantElement.className);
        // if (e.target.className === "drop-wrapper") {
        //     dropWrapper = e.target;
        // } else if (e.target.parentElement.className === "drop-wrapper") {
        //     dropWrapper = e.target.parentElement;
        // } else if (e.target.parentElement.parentElement.className === "drop-wrapper") {
        //     dropWrapper = e.target.parentElement.parentElement;
        // } else if (e.target.parentElement.parentElement.parentElement.className === "drop-wrapper") {
        //     dropWrapper = e.target.parentElement.parentElement.parentElement;
        // }
        // console.log("E - ", e.target);


        if (e.toElement.id === 'drop-zone' && dropableColumn !== "space-row-grid") {
            // e.toElement.classList.remove('add-border'); // REMOVE BORDER
            //console.log("Row ID - ", rowID);
            // PREVENT TO ADD MORE THAN 4 ROW 
            if (rowID <= 9) {
                // INCREASE HEIGHT OF WHOLE DROP ZONE 
                if (rowList.length >= 2) {
                    dropColumnZone.style.minHeight = `${dropColumnZone.clientHeight + increaseDZHeight}px`;
                }
                // dropColumnZone.style.height = "100%"; // IN PREVIEW
                if (dropableColumn === "col-1-grid" || dropableColumn === "col-2-grid" || dropableColumn === "col-3-grid" ) {
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
                alert("You can't add more than 9 row");
            }
        } else {
            console.log("outside of drop zone");
        }
        selectedRowEle = null;
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
    if (dropableColumn === 'space-row-grid') {
        if (e.target.className === "drop-row" || e.target.parentElement.className === 'drop-row' || e.target.parentElement.parentElement.className === "drop-row" || e.target.parentElement.parentElement.parentElement.className === "drop-row") {
            let selectedElement = null;
            if (e.target.className === "drop-row") {
                // DROP OVER ROW ELEMENT 
                selectedElement = e.target;
            } else if (e.target.parentElement.className === 'drop-row') {
                // DROP OVER COLUMN ELEMENT 
                selectedElement = e.target.parentElement;
            } else if (e.target.parentElement.parentElement.parentElement.className === "drop-row") {
                // DROP OVER IMAGE ELEMENT 
                selectedElement = e.target.parentElement.parentElement.parentElement;
            } else if (e.target.parentElement.parentElement.className === "drop-row") {
                // DROP OVER TEXT ELEMENT 
                selectedElement = e.target.parentElement.parentElement;
            }
            elementHeight = selectedElement.offsetHeight;
            // GETTING ELEMENT HEIGHT 
            let rect = selectedElement.getBoundingClientRect();
            const y = e.clientY - rect.top;
            newDiv.className = 'space space-row-grid';
            let middleOfY = elementHeight / 2;
            let rowNum = stringIdToIdNum(selectedElement.id, 1);
            if (y > middleOfY) {
                // GETTING ROW NUMBER AND COLUMN NUMBER 
                setAttributes(newDiv, { "id": "spx-" + rowNum + '-' + 'after' });   //  "txt-" + rowNumber + '-' + columnNumber 
                selectedElement.after(newDiv);
                rowList.push({ afterRow: rowNum, spaceRow: 12 });
            }
            if (y < middleOfY) {
                // INSERT BEFORE 
                rowNum--;
                setAttributes(newDiv, { "id": "spx-" + rowNum + '-' + 'after' });   //  "txt-" + rowNumber + '-' + columnNumber 
                selectedElement.previousSibling.after(newDiv);
                rowList.push({ afterRow: rowNum, spaceRow: 12 });
            }
        }
    }
    dropableColumn = null;
    blockCol = null;
});
*/


/*
Elementobject = [
    {
        rowNumber: 1,
        columnNumber: 1,
        blockElement: {
            name: 'txtBlockContent',
            blockHtml: '<div id=~_txt-1-1~_ contenteditable=~_true~_ class=~_content txt-content-block~_><div style=~_margin: auto 0px; padding: 0px; width: 100%; float: left; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; height: 100%; background: transparent; overflow: hidden;~_><h2 style=~_margin: auto 0px; padding: 0px; font-weight: 400; font-family: DauphinPlain; font-size: 24px; line-height: 24px; height: 100%; width: 100%; background: transparent; overflow: hidden;~_>What is Lorem Ipsum?</h2><p style=~_margin: auto 0px; padding: 0px; text-align: justify; height: 100%; width: 100%; background: transparent; overflow: hidden;~_><strong style=~_margin: auto 0px; padding: 0px; height: 100%; width: 100%; background: transparent; overflow: hidden;~_>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry_~s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></div><div style=~_margin: auto 0px; padding: 0px; width: 100%; float: right; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; height: 100%; background: transparent; overflow: hidden;~_><h2 style=~_margin: auto 0px; padding: 0px; font-weight: 400; font-family: DauphinPlain; font-size: 24px; line-height: 24px; height: 100%; width: 100%; background: transparent; overflow: hidden;~_>Why do we use it?</h2><p style=~_margin: auto 0px; padding: 0px; text-align: justify; height: 100%; width: 100%; background: transparent; overflow: hidden;~_>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using _~Content here, content here_~, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for _~lorem ipsum_~ will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p></div></div>'
        }
    },
    {
        rowNumber: 2,
        columnNumber: 1,
        blockElement: {
            name: 'txtBlockContent',
            blockHtml: '<div id=~_txt-2-1~_ contenteditable=~_true~_ class=~_content txt-content-block~_><div style=~_margin: auto 0px; padding: 0px; width: 100%; float: left; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; height: 100%; background: transparent; overflow: hidden;~_><h2 style=~_margin: auto 0px; padding: 0px; font-weight: 400; font-family: DauphinPlain; font-size: 24px; line-height: 24px; height: 100%; width: 100%; background: transparent; overflow: hidden;~_>What is Lorem Ipsum?</h2><p style=~_margin: auto 0px; padding: 0px; text-align: justify; height: 100%; width: 100%; background: transparent; overflow: hidden;~_><strong style=~_margin: auto 0px; padding: 0px; height: 100%; width: 100%; background: transparent; overflow: hidden;~_>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry_~s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></div><div style=~_margin: auto 0px; padding: 0px; width: 100%; float: right; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; height: 100%; background: transparent; overflow: hidden;~_><h2 style=~_margin: auto 0px; padding: 0px; font-weight: 400; font-family: DauphinPlain; font-size: 24px; line-height: 24px; height: 100%; width: 100%; background: transparent; overflow: hidden;~_>Why do we use it?</h2><p style=~_margin: auto 0px; padding: 0px; text-align: justify; height: 100%; width: 100%; background: transparent; overflow: hidden;~_>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using _~Content here, content here_~, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for _~lorem ipsum_~ will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p></div></div>'
        }
    },
    {
        rowNumber: 3,
        columnNumber: 1,
        blockElement: {
            name: 'txtBlockContent',
            blockHtml: '<div id=~_txt-3-1~_ contenteditable=~_true~_ class=~_content txt-content-block~_><div style=~_margin: auto 0px; padding: 0px; width: 100%; float: left; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; height: 100%; background: transparent; overflow: hidden;~_><h2 style=~_margin: auto 0px; padding: 0px; font-weight: 400; font-family: DauphinPlain; font-size: 24px; line-height: 24px; height: 100%; width: 100%; background: transparent; overflow: hidden;~_>What is Lorem Ipsum?</h2><p style=~_margin: auto 0px; padding: 0px; text-align: justify; height: 100%; width: 100%; background: transparent; overflow: hidden;~_><strong style=~_margin: auto 0px; padding: 0px; height: 100%; width: 100%; background: transparent; overflow: hidden;~_>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry_~s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></div><div style=~_margin: auto 0px; padding: 0px; width: 100%; float: right; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; height: 100%; background: transparent; overflow: hidden;~_><h2 style=~_margin: auto 0px; padding: 0px; font-weight: 400; font-family: DauphinPlain; font-size: 24px; line-height: 24px; height: 100%; width: 100%; background: transparent; overflow: hidden;~_>Why do we use it?</h2><p style=~_margin: auto 0px; padding: 0px; text-align: justify; height: 100%; width: 100%; background: transparent; overflow: hidden;~_>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using _~Content here, content here_~, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for _~lorem ipsum_~ will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p></div></div>'
        }
    },
    {
        rowNumber: 4,
        columnNumber: 1,
        blockElement: {
            name: 'txtBlockContent',
            blockHtml: '<div id=~_txt-4-1~_ contenteditable=~_true~_ class=~_content txt-content-block~_><div style=~_margin: auto 0px; padding: 0px; width: 100%; float: left; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; height: 100%; background: transparent; overflow: hidden;~_><h2 style=~_margin: auto 0px; padding: 0px; font-weight: 400; font-family: DauphinPlain; font-size: 24px; line-height: 24px; height: 100%; width: 100%; background: transparent; overflow: hidden;~_>What is Lorem Ipsum?</h2><p style=~_margin: auto 0px; padding: 0px; text-align: justify; height: 100%; width: 100%; background: transparent; overflow: hidden;~_><strong style=~_margin: auto 0px; padding: 0px; height: 100%; width: 100%; background: transparent; overflow: hidden;~_>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry_~s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></div><div style=~_margin: auto 0px; padding: 0px; width: 100%; float: right; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; height: 100%; background: transparent; overflow: hidden;~_><h2 style=~_margin: auto 0px; padding: 0px; font-weight: 400; font-family: DauphinPlain; font-size: 24px; line-height: 24px; height: 100%; width: 100%; background: transparent; overflow: hidden;~_>Why do we use it?</h2><p style=~_margin: auto 0px; padding: 0px; text-align: justify; height: 100%; width: 100%; background: transparent; overflow: hidden;~_>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using _~Content here, content here_~, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for _~lorem ipsum_~ will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p></div></div>'
        }
    },
    {
        rowNumber: 5,
        columnNumber: 1,
        blockElement: {
            name: 'txtBlockContent',
            blockHtml: '<div id=~_txt-5-1~_ contenteditable=~_true~_ class=~_content txt-content-block~_><div style=~_margin: auto 0px; padding: 0px; width: 100%; float: left; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; height: 100%; background: transparent; overflow: hidden;~_><h2 style=~_margin: auto 0px; padding: 0px; font-weight: 400; font-family: DauphinPlain; font-size: 24px; line-height: 24px; height: 100%; width: 100%; background: transparent; overflow: hidden;~_>What is Lorem Ipsum?</h2><p style=~_margin: auto 0px; padding: 0px; text-align: justify; height: 100%; width: 100%; background: transparent; overflow: hidden;~_><strong style=~_margin: auto 0px; padding: 0px; height: 100%; width: 100%; background: transparent; overflow: hidden;~_>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry_~s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></div><div style=~_margin: auto 0px; padding: 0px; width: 100%; float: right; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; height: 100%; background: transparent; overflow: hidden;~_><h2 style=~_margin: auto 0px; padding: 0px; font-weight: 400; font-family: DauphinPlain; font-size: 24px; line-height: 24px; height: 100%; width: 100%; background: transparent; overflow: hidden;~_>Why do we use it?</h2><p style=~_margin: auto 0px; padding: 0px; text-align: justify; height: 100%; width: 100%; background: transparent; overflow: hidden;~_>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using _~Content here, content here_~, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for _~lorem ipsum_~ will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p><div style=~_margin: auto 0px; padding: 0px; width: 100%; float: left; height: 100%; background: transparent; overflow: hidden;~_><h2 style=~_margin: auto 0px; padding: 0px; font-weight: 400; font-family: DauphinPlain; font-size: 24px; line-height: 24px; height: 100%; width: 100%; background: transparent; overflow: hidden;~_>What is Lorem Ipsum?</h2><p style=~_margin: auto 0px; padding: 0px; text-align: justify; height: 100%; width: 100%; background: transparent; overflow: hidden;~_><strong style=~_margin: auto 0px; padding: 0px; height: 100%; width: 100%; background: transparent; overflow: hidden;~_>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry_~s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></div><div style=~_margin: auto 0px; padding: 0px; width: 100%; float: right; height: 100%; background: transparent; overflow: hidden;~_><h2 style=~_margin: auto 0px; padding: 0px; font-weight: 400; font-family: DauphinPlain; font-size: 24px; line-height: 24px; height: 100%; width: 100%; background: transparent; overflow: hidden;~_>Why do we use it?</h2><p style=~_margin: auto 0px; padding: 0px; text-align: justify; height: 100%; width: 100%; background: transparent; overflow: hidden;~_>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using _~Content here, content here_~, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for _~lorem ipsum_~ will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p></div></div></div>'
        }
    }
];
*/


// // PREVIEW FUNCTION START 
// function previewDropZoneTemplate() {


//     // PREVIEW PAGE VARIABLES START 
//     // let layout = '<%- docs.layout %>';
//     // let content = '<%- docs.content %>';
//     // let img = '<%- docs.bg_img %>';
//     // let sibling = '<%- docs.sibling %>';



//     // console.log(content);
//     // THIS IS COMMING FROM DATABASE TABLE 
//     const layoutArray = JSON.parse(layout);
//     const pvBlockElement = JSON.parse(content);
//     const pvSibling = JSON.parse(sibling);
//     // console.log("Sibling - ",pvSibling); 
//     // console.log("pvBlockElement - ", pvBlockElement);
//     //console.log("Layout - ",layoutArray);
//     // //console.log("Header img: ", headerImg);


//     const previewDropZone = document.getElementById('drop-zone');
//     const pvTemplateWrapper = document.querySelector('.template-wrapper')
//     const pvTemplateLinks = document.getElementsByTagName('a');
//     // PREVIEW PAGE VARIABLES START 
//     // BG COLOR 
//     pvTemplateWrapper.style.background = pvBgColor;
//     try {
//         // LINK COLOR CHANGE 
//         for (let pvTL of pvTemplateLinks) {
//             pvTL.style.color = pvlinkColors;
//         }
//     } catch (err) {
//         //console.log(err);
//     }




//     // APPENDING ALL BLOCK INTO RIGHT COL AND DIV
//     // SORT ALL ELEMENT IN ASSENDING ORDER BY COLUMN NUMBER
//     // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
//     const assendingBlockCol = pvBlockElement.sort((a, b) => a.columnNumber - b.columnNumber);
//     const assendingSibling = pvSibling.sort((a, b) => a.colNum - b.colNum);
//     const assendingLayout = layoutArray.sort((a, b) => a.rowID - b.rowID);
//     // //console.log("Sibling - ",assendingSibling); //console.log("pvBlockElement - ",assendingBlockCol); //console.log("Layout - ",assendingLayout);
//     console.log(assendingLayout);

//     try {
//         assendingLayout.forEach((lAr, rIdx) => {

//             // MAKING ROW 
//             const pvRowDiv = document.createElement('div');
//             if (lAr.rowID) {
//                 setAttributes(pvRowDiv, { 'class': 'drop-row', "id": `row-${rowID}` });
//                 for (let i = 0; i < lAr.rowWithColumn; i++) {
//                     const pvColDiv = document.createElement('div');
//                     switch (lAr.rowWithColumn) {
//                         case 1:
//                             setAttributes(pvColDiv, { 'class': 'one-column-div', 'id': `one-col-${i}-${lAr.rowID}` });
//                             break;
//                         case 2:
//                             setAttributes(pvColDiv, { 'class': 'two-column-div', 'id': `two-col-${i}-${lAr.rowID}` });
//                             break;
//                         case 3:
//                             setAttributes(pvColDiv, { 'class': 'three-column-div', 'id': `three-col-${i}-${lAr.rowID}` });
//                             break;
//                         default:
//                             pvColDiv.setAttribute('class', 'one-column-div');
//                             break;
//                     }
//                     // MAKING COLUMN 
//                     pvRowDiv.appendChild(pvColDiv);
//                 }
//                 rowID++;
//             }


//             // ADD  SPACE 
//             if (lAr.afterRow) {
//                 // ADDING SPACE 
//                 const pvSpaceDiv = document.createElement('div');
//                 const pvPreviousRow = document.getElementById(`row-${lAr.afterRow}`);

//                 setAttributes(pvSpaceDiv, { "id": `spx-${lAr.afterRow}-after` });
//                 pvSpaceDiv.className = 'space space-row-grid';
//                 pvSpaceDiv.style.height = `${lAr.spaceRow}px`;
//                 pvPreviousRow.after(pvSpaceDiv);
//             }

//             // MAKING ROW 
//             previewDropZone.appendChild(pvRowDiv);




//             // ADDING BUTTON AND ELEMENT 
//             // //console.log("Row Id: ", lAr.rowID);
//             // CHECK IT THERE IS NO SPACE 
//             if (!lAr.afterRow) {
//                 //  ADDING TEXT AND IMAGE 
//                 // MATCHING ROW ID 
//                 // if (lAr.rowID === blockRowId) {
//                 //     //console.log("Row var arr: ", blockRowId);

//                 //     // blockRowId++;
//                 // }
//                 // //console.log("ROW ID: ", lAr.rowID);
//                 assendingBlockCol.forEach((bEl, belIdx) => {
//                     // //console.log("Block col : index - " + belIdx + " - Value : ", bEl);

//                     if (lAr.rowID === bEl.rowNumber) {
//                         // ROW IS LOOPING PERFECTLY 
//                         // //console.log("Block ELement row: ", bEl.rowNumber);
//                         let pvSelectedElement = document.getElementById(`${rowNumToStr(lAr.rowWithColumn)}-col-${bEl.columnNumber - 1}-${bEl.rowNumber}`);
//                         if (bEl.blockElement.name === "txtBlockContent") {
//                             pvSelectedElement.innerHTML = invalidToValidHtml(bEl.blockElement.blockHtml);
//                         } else if (bEl.blockElement.name === "imgBlockContent") {
//                             // //console.log(pvSelectedElement);


//                             const pvImgHyerLink = document.createElement('a');

//                             // if (bEl.blockElement.imgNewTab === true) {
//                             //     setAttributes(pvImgHyerLink, { "href": `${protocalValidate(bEl.blockElement.imgHyperlink)}`, "target": "_blank" });
//                             // } else {
//                             //     setAttributes(pvImgHyerLink, { "href": `${protocalValidate(bEl.blockElement.imgHyperlink)}` });
//                             // }
//                             let openNewTab = null;
//                             bEl.blockElement.imgNewTab === true ? openNewTab = "_blink" : openNewTab = "_self";
//                             setAttributes(pvImgHyerLink, { "href": `${protocalValidate(bEl.blockElement.imgHyperlink)}`, "target": openNewTab });

//                             const pvImgElement = document.createElement('img');
//                             // https://email-template-nodejs.s3.ca-central-1.amazonaws.com/header-img-Screensho-31-1.png
//                             let defaultImg = `https://email-template-nodejs.s3.ca-central-1.amazonaws.com/${bEl.blockElement.imgUrl}`;
//                             // //console.log("Default image: ", bEl.blockElement.imgUrl);
//                             if (bEl.blockElement.imgUrl === undefined || bEl.blockElement.imgUrl === null || bEl.blockElement.imgUrl === "/img/empty-image.png") {
//                                 // //console.log("Empty img : ", bEl.blockElement.imgUrl);
//                                 // empty-image.png
//                                 defaultImg = "/img/empty-image.png"
//                             }
//                             // else {
//                             //     defaultImg = "/" + bEl.blockElement.imgUrl;
//                             // }
//                             // //console.log("txt img: ", bEl.columnNumber);
//                             const inlineHW = "height:auto; width: 96%;";

//                             setAttributes(pvImgElement, { "id": `img-${bEl.rowNumber}-${bEl.columnNumber}`, "src": `${defaultImg}`, "style": inlineHW });
//                             pvImgElement.className = "content img-content-block";
//                             pvImgHyerLink.append(pvImgElement);


//                             // //console.log("Selected element: ", pvSelectedElement);
//                             // //console.log("Selected row element: ", pvSelectRow);
//                             pvSelectedElement.append(pvImgHyerLink);

//                         } else if (bEl.blockElement.name === "socialBlockContent") {
//                             // blockHtml: "<div class=~_content icon-content-block~_ id=~_icon-3-1~_ ><a href=~_#~_ class=~_social-icon-content~_><img class=~_social-icon-img~_ src=~_/icon/facebook.png~_ ></a><a href=~_#~_ class=~_social-icon-content~_><img class=~_social-icon-img~_ src=~_/icon/twitter.png~_ ></a><a href=~_#~_ class=~_social-icon-content~_><img class=~_social-icon-img~_ src=~_/icon/instagram.png~_ ></a><div />"
//                             // name: "socialBlockContent"
//                             // socialFbHyperlink: "fb.com"
//                             // socialInstagramHyperlink: "i.com"
//                             // socialTwitterHyperlink: "t.com"

//                             const pvIcons = document.createElement("div");
//                             setAttributes(pvIcons, { "id": `icon-${bEl.rowNumber}-${bEl.columnNumber}` });
//                             pvIcons.className = "content icon-content-block";
//                             /*
    
                            
//                             const pvFbLink = document.createElement('a');
//                             setAttributes(pvFbLink, { "class": "social-icon-content", "href": `${protocalValidate(bEl.blockElement.socialFbHyperlink)}` });
//                             const pvFbIconImg = document.createElement('img');
//                             setAttributes(pvFbIconImg, { "class": "social-icon-img", "src": "/icon/facebook.png" });
//                             pvFbLink.appendChild(pvFbIconImg);
//                             pvIcons.appendChild(pvFbLink);
    
//                             const pvTwiterLink = document.createElement('a');
//                             setAttributes(pvTwiterLink, { "class": "social-icon-content", "href": `${protocalValidate(bEl.blockElement.socialTwitterHyperlink)}` });
//                             const pvTwitterIconImg = document.createElement('img');
//                             setAttributes(pvTwitterIconImg, { "class": "social-icon-img", "src": "/icon/twitter.png" });
//                             pvTwiterLink.appendChild(pvTwitterIconImg);
//                             pvIcons.appendChild(pvTwiterLink);
    
    
//                             const pvInstaLink = document.createElement('a');
//                             setAttributes(pvInstaLink, { "class": "social-icon-content", "href": `${protocalValidate(bEl.blockElement.socialInstagramHyperlink)}` });
//                             const pvInstaIconImg = document.createElement('img');
//                             setAttributes(pvInstaIconImg, { "class": "social-icon-img", "src": "/icon/instagram.png" });
//                             pvInstaLink.appendChild(pvInstaIconImg);
//                             pvIcons.appendChild(pvInstaLink);
//                             */


//                             // for (let k = 0; k < 2; k++) {
//                             // }
//                             const iconHolder = createSocialIcons(pvIcons, `${protocalValidate(bEl.blockElement.socialFbHyperlink)}`, `${protocalValidate(bEl.blockElement.socialTwitterHyperlink)}`, `${protocalValidate(bEl.blockElement.socialInstagramHyperlink)}`);
//                             pvSelectedElement.append(iconHolder);
//                             if (lAr.rowWithColumn === 1) {
//                                 pvSelectedElement.style.height = "8em";
//                             }


//                         }
//                     }
//                 });





//                 // ADDING BUTTON 
//                 // MATCHING ROW ID 

//                 // //console.log(lAr.rowWithColumn);
//                 // let blockColNum = 0;
//                 // //console.log("layout sibling row ", siblingRowId);// result 1, 2, 3

//                 // //console.log("layout sibling row ", siblingRowId);// result 1, 2, 3

//                 assendingSibling.forEach((sEl, bIdx) => {

//                     if (lAr.rowID === sEl.rowNum) {
//                         // //console.log("sibling col: " + sEl.colNum + ' in row: ' + lAr.rowID); // sibling col: 1 in row: 1, sibling col: 2 in row: 1, sibling col: 2 in row: 2
//                         // //console.log("Row num: " + lAr.rowWithColumn + " in column number: " + blockColNum); //RESULT - Row num: 2 in column number: 0, Row num: 2 in column number: 1, Row num: 3 in column number: 0
//                         let pvSelectedElement = document.getElementById(`${rowNumToStr(lAr.rowWithColumn)}-col-${sEl.colNum - 1}-${sEl.rowNum}`);
//                         // btnAlign: null, btnBgColor: "#0d5415", btnContent: "Preview", btnFontFamily: "Helvetica", btnFontSize: 12 btnHyperlink: "http://localhost:4000", btnOpenNewTab: false, btnRound: true, btnTextColor: "#942e2e"
//                         let pvSBtnRound;
//                         sEl.btnRound == true ? pvSBtnRound = "8px" : pvSBtnRound = "0";
//                         let pvBtnTab;
//                         // ON CLICK EVENT FOR JAVASCRIPT
//                         let pvCorrectHyperlink = null;
//                         sEl.btnHyperlink !== null ? pvCorrectHyperlink = protocalValidate(sEl.btnHyperlink) : pvCorrectHyperlink = "#";



//                         // let pvOnClickEvent = window.open(`${pvCorrectHyperlink}`);
//                         let pvOnClickEvent = null;
//                         sEl.btnOpenNewTab === true ? pvOnClickEvent = "_blink" : pvOnClickEvent = "_self";


//                         // if (sEl.btnOpenNewTab == true) {
//                         //     // OPEN IN NEW TAB 
//                         //     pvBtnTab = "border-radius: 8px;";
//                         // } else {
//                         //     pvBtnTab = ""
//                         // }
//                         // //console.log(sEl);



//                         const pvSiblingBtn = document.createElement('button');
//                         setAttributes(pvSiblingBtn, { "id": `btn-${sEl.rowNum}-${sEl.colNum}` });
//                         pvSiblingBtn.className = "content btn-content-block";
//                         pvSiblingBtn.style.backgroundColor = sEl.btnBgColor;
//                         pvSiblingBtn.style.fontFamily = sEl.btnFontFamily;
//                         pvSiblingBtn.style.fontSize = sEl.btnFontSize;
//                         pvSiblingBtn.style.borderRadius = pvSBtnRound;
//                         pvSiblingBtn.style.float = sEl.btnAlign;
//                         pvSiblingBtn.style.width = "fit-content";

//                         const pvSiblingBtnLink = document.createElement('a');
//                         setAttributes(pvSiblingBtnLink, { "href": pvCorrectHyperlink, "target": pvOnClickEvent, "class": "btn-content-link" });
//                         pvSiblingBtnLink.textContent = sEl.btnContent;
//                         pvSiblingBtnLink.style.color = sEl.btnTextColor;


//                         pvSiblingBtn.append(pvSiblingBtnLink);


//                         // const pvSiblingBtn = `<a href="${pvCorrectHyperlink}" ${pvOnClickEvent} calss="content btn-content-block" id="btn-${sEl.rowNum}-${sEl.colNum}" style="background:${sEl.btnBgColor}; font-family:${sEl.btnFontFamily}; font-size:${sEl.btnFontSize}px;color: ${sEl.btnTextColor}; ${pvSBtnRound};float:${sEl.btnAlign};" onclick="window.open('${pvCorrectHyperlink}')">${sEl.btnContent}</a>`;

//                         // const pvSiblingBtn = document.createElement('button');
//                         // pvSiblingBtn.textContent = "Preview";
//                         // const pvBtnNodes = stringToNodes(pvSiblingBtn);
//                         // pvSelectedElement.appendChild(stringToNodes(pvSiblingBtn));
//                         pvSelectedElement.appendChild(pvSiblingBtn);
//                         // blockColNum++;
//                     }

//                 });





//             }


//         });
//         // let headerImgUrl = `https://email-template-nodejs.s3.ca-central-1.amazonaws.com/${headerImg}`;
//         // headerImage.setAttribute("src", headerImgUrl);
//         if (headerImg === null || headerImg === "null") {
//             console.log("Header img: ", headerImg);
//             headerImgPreview.setAttribute('src', "/img/header.png");
//             headerImgPreview.style.display = 'none';
//             // deleteHeaderImg.style.display = 'none !important';
//             deleteHeaderImg.style.display = 'none';
//             headerImage.style.display = "none";
//             headerImage.setAttribute('src', "/img/header.png");
//         } else {
//             headerImg === "default-header.jpg" ? headerImage.src = "/img/header.png" : headerImage.src = imgKeyToLink(headerImg);
//         }
//         // //console.log(headerImage);
//     } catch (err) {
//         //console.log(err);
//     }



//     try {
//         // STYLING ELEMENTS INSIDE DROP ZONE 
//         // TEXT CONTENT EXIT FALSE FOR PREVIEW 
//         // const pvTextContent = document.querySelectorAll('.txt-content-block');
//         const droppedRow = document.querySelectorAll('.drop-row');
//         droppedRow.forEach((dr, dri) => dr.style.height = "fit-content");
//         // //console.log(dropColumnZone.translate);
//         // dropColumnZone.style.height = "500px";
//         // height: 50em;
//         const oneColDiv = document.querySelectorAll('.one-column-div');
//         const twoColDiv = document.querySelectorAll('.two-column-div');
//         const threeColDiv = document.querySelectorAll('.three-column-div');
//         oneColDiv.forEach((ocd, ocdI) => {
//             // NOT FOR SOCIAL CONTENT 
//             if (ocd.hasChildNodes()) {
//                 // //console.log(ocd.childNodes[0].className);
//                 if (ocd.childNodes[0].classList[1] !== "icon-content-block") {
//                     ocd.style.height = "fit-content";
//                     // ocd.style.height = "45px";
//                 }
//             }
//         });
//         twoColDiv.forEach((tcd, tcdI) => tcd.style.height = "fit-content");
//         threeColDiv.forEach((trcd, trcdI) => {
//             if (trcd.hasChildNodes()) {
//                 trcd.childNodes[0].parentElement.style.height = "fit-content";
//                 // //console.log(trcd.childNodes[0].parentElement);
//                 // trcd.childNodes.forEach((trcdc, trcdcI) => {
//                 //     //console.log(trcdc.parentElement);
//                 //     trcdc.parentElement.style.height = "fit-content";
//                 // });
//                 // if (trcd.childNodes[0].hasChildNodes()) {
//                 //     //console.log(trcd.childNodes[0]);
//                 // }

//                 // trcd.childNodes[0].style.height = "fit-content";

//             } else {
//                 trcd.style.height = "fit-content"

//             }
//         });
//         // //console.log(oneColDiv);

//         // droppedRow.style.height = "fit-content";
//         // const twoCols = document.querySelectorAll(".two-column-div");
//         // twoCols.forEach((tc, tci) => tc.style.height = "100%");

//         // pvTextContent.forEach(txtCnt => {
//         //     txtCnt.setAttribute("contenteditable", false);
//         //     // if (txtCnt.getBoundingClientRect().height > 172) {
//         //     //     droppedRow.style.height = "fit-content"; // IN PREVIEW
//         //     // }
//         // });

//     } catch (styleErr) {
//         //console.log(styleErr);
//     }

// }

// // PREVIEW FUNCTION ENDS 


let parseablejson = `[
    {
        "rowNumber":1,
        "columnNumber":1,
        "blockElement":{
            "name":"txtBlockContent",
            "blockHtml":"<div id="txt-1-1" contenteditable="true" class="content txt-content-block">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil corrupti natus eos in a voluptas incidunt psdhsjdshdsjhdsjdhsjdhsjdhsjdhd orro quis autem quo!</div>"
        }
    },
    {
        "rowNumber":2,
        "columnNumber":2,
        "blockElement":{
            "name":"txtBlockContent",
            "blockHtml":"<div id="txt-2-2" contenteditable="true" class="content txt-content-block">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil corrupti natus eos in a voluptas incidunt porro quis autem quo!</div>"
        }
    },
    {
        "rowNumber":2,
        "columnNumber":1,
        "blockElement":{
            "name":"txtBlockContent",
            "blockHtml":"<div id="txt-2-1" contenteditable="true" class="content txt-content-block">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil corrupti natus eos in a voluptas incidunt porro quis autem quo! Some thing</div>"
        }
    },
    {
        "rowNumber":5,
        "columnNumber":2,
        "blockElement":{
            "name":"txtBlockContent",
            "blockHtml":"<div id="txt-5-2" contenteditable="true" class="content txt-content-block">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil corrupti natus eos in a voluptas incidunt porro quis autem quo!</div>"
        }
    }
]`
