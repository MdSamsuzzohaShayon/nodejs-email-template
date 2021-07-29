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
