// MAIN FUNCTION 7
function previewDropZoneTemplate() {
    // PREVIEW PAGE VARIABLES START 
    // let layout = '<%- docs.layout %>';
    // let content = '<%- docs.content %>';
    // let img = '<%- docs.bg_img %>';
    // let sibling = '<%- docs.sibling %>';


    // THIS IS COMMING FROM DATABASE TABLE 
    // const layoutArray = [{ "rowID": 1, "rowWithColumn": 3 }, { "rowID": 2, "rowWithColumn": 2 }, { "rowID": 3, "rowWithColumn": 1 }];
    const layoutArray = JSON.parse(layout);
    const pvBlockElement = JSON.parse(content);
    const pvSibling = JSON.parse(sibling);

    // console.log("Header img: ", headerImg);


    const previewDropZone = document.getElementById('drop-zone');
    const pvTemplateWrapper = document.querySelector('.template-wrapper')
    const pvTemplateLinks = document.getElementsByTagName('a');
    // PREVIEW PAGE VARIABLES START 
    // BG COLOR 
    pvTemplateWrapper.style.background = pvBgColor;
    // LINK COLOR CHANGE 
    for (let pvTL of pvTemplateLinks) {
        pvTL.style.color = pvlinkColors;
    }



    // MAKING ALL ROW AND COLUMN DIV 
    // let rowID = 1;
    // layoutArray.forEach((el, index) => {

    // });



    // APPENDING ALL BLOCK INTO RIGHT COL AND DIV
    // SORT ALL ELEMENT IN ASSENDING ORDER BY COLUMN NUMBER
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    const assendingBlockCol = pvBlockElement.sort((a, b) => a.columnNumber - b.columnNumber);
    let blockRowId = 1;
    const assendingSibling = pvSibling.sort((a, b) => a.colNum - b.colNum);
    let siblingRowId = 1;
    // const assendingLayout = layoutArray.sort((a, b) => a.rowID - b.rowID);
    // console.log("Content: ", pvBlockElement);
    console.log("Layout: ", layoutArray)
    // console.log("Sibling button: ", assendingSibling);
    layoutArray.forEach((lAr, rIdx) => {

        // MAKING ROW 
        const pvRowDiv = document.createElement('div');
        if (lAr.rowID) {
            setAttributes(pvRowDiv, { 'class': 'drop-row', "id": `row-${rowID}` });
            for (let i = 0; i < lAr.rowWithColumn; i++) {
                const pvColDiv = document.createElement('div');
                switch (lAr.rowWithColumn) {
                    case 1:
                        setAttributes(pvColDiv, { 'class': 'one-column-div', 'id': `one-col-${i}-${lAr.rowID}` });
                        break;
                    case 2:
                        setAttributes(pvColDiv, { 'class': 'two-column-div', 'id': `two-col-${i}-${lAr.rowID}` });
                        break;
                    case 3:
                        setAttributes(pvColDiv, { 'class': 'three-column-div', 'id': `three-col-${i}-${lAr.rowID}` });
                        break;
                    default:
                        pvColDiv.setAttribute('class', 'one-column-div');
                        break;
                }
                // MAKING COLUMN 
                pvRowDiv.appendChild(pvColDiv);
            }
            rowID++;
        }


        // ADD  SPACE 
        if (lAr.afterRow) {
            // ADDING SPACE 
            const pvSpaceDiv = document.createElement('div');
            const pvPreviousRow = document.getElementById(`row-${lAr.afterRow}`);

            setAttributes(pvSpaceDiv, { "id": `spx-${lAr.afterRow}-after` });
            pvSpaceDiv.className = 'space space-row-grid';
            pvSpaceDiv.style.height = `${lAr.spaceRow}px`;
            pvPreviousRow.after(pvSpaceDiv);
        }

        // MAKING ROW 
        previewDropZone.appendChild(pvRowDiv);



        // ADDING BUTTON AND ELEMENT 
        // console.log("Row Id: ", lAr.rowID);
        // CHECK IT THERE IS NO SPACE 
        if (!lAr.afterRow) {
            //  ADDING TEXT AND IMAGE 
            // MATCHING ROW ID 
            // if (lAr.rowID === blockRowId) {
            //     console.log("Row var arr: ", blockRowId);

            //     // blockRowId++;
            // }
            // console.log("ROW ID: ", lAr.rowID);
            assendingBlockCol.forEach((bEl, belIdx) => {

                if (lAr.rowID === bEl.rowNumber) {
                    // ROW IS LOOPING PERFECTLY 
                    // console.log("Block ELement row: ", bEl.rowNumber);
                    let pvSelectedElement = document.getElementById(`${rowNumToStr(lAr.rowWithColumn)}-col-${bEl.columnNumber - 1}-${bEl.rowNumber}`);
                    // console.log(pvSelectedElement);
                    if (bEl.blockElement.name === "txtBlockContent") {
                        pvSelectedElement.innerHTML = invalidToValidHtml(bEl.blockElement.blockHtml);
                    } else if (bEl.blockElement.name === "imgBlockContent") {
                        const pvImgHyerLink = document.createElement('a');
                        if (bEl.blockElement.imgNewTab === true) {
                            setAttributes(pvImgHyerLink, { "href": `${protocalValidate(bEl.blockElement.imgHyperlink)}`, "target": "_blank" });
                        } else {
                            setAttributes(pvImgHyerLink, { "href": `${protocalValidate(bEl.blockElement.imgHyperlink)}` });
                        }

                        const pvImgElement = document.createElement('img');
                        let defaultImg = bEl.blockElement.imgUrl;
                        // console.log("Default image: ", bEl.blockElement.imgUrl);
                        if (bEl.blockElement.imgUrl === undefined || bEl.blockElement.imgUrl === null || bEl.blockElement.imgUrl === "/img/empty-image.png") {
                            // console.log("Empty img : ", bEl.blockElement.imgUrl);
                            // empty-image.png
                            defaultImg = "/img/empty-image.png"
                        } else {
                            defaultImg = "/" + bEl.blockElement.imgUrl;
                        }
                        console.log("txt img: ", bEl.columnNumber);

                        setAttributes(pvImgElement, { "id": `img-${bEl.rowNumber}-${bEl.columnNumber}`, "src": `${defaultImg}` });
                        pvImgElement.className = "content img-content-block";
                        pvImgHyerLink.appendChild(pvImgElement);
                        // console.log("Selected element: ", pvSelectedElement);
                        // console.log("Selected row element: ", pvSelectRow);
                        pvSelectedElement.appendChild(pvImgHyerLink);
                    } else if (bEl.blockElement.name === "socialBlockContent") {
                        // blockHtml: "<div class=~_content icon-content-block~_ id=~_icon-3-1~_ ><a href=~_#~_ class=~_social-icon-content~_><img class=~_social-icon-img~_ src=~_/icon/facebook.png~_ ></a><a href=~_#~_ class=~_social-icon-content~_><img class=~_social-icon-img~_ src=~_/icon/twitter.png~_ ></a><a href=~_#~_ class=~_social-icon-content~_><img class=~_social-icon-img~_ src=~_/icon/instagram.png~_ ></a><div />"
                        // name: "socialBlockContent"
                        // socialFbHyperlink: "fb.com"
                        // socialInstagramHyperlink: "i.com"
                        // socialTwitterHyperlink: "t.com"

                        const pvIcons = document.createElement("div");
                        setAttributes(pvIcons, { "id": `icon-${bEl.rowNumber}-${bEl.columnNumber}` });
                        pvIcons.className = "content icon-content-block";
                        /*

                        
                        const pvFbLink = document.createElement('a');
                        setAttributes(pvFbLink, { "class": "social-icon-content", "href": `${protocalValidate(bEl.blockElement.socialFbHyperlink)}` });
                        const pvFbIconImg = document.createElement('img');
                        setAttributes(pvFbIconImg, { "class": "social-icon-img", "src": "/icon/facebook.png" });
                        pvFbLink.appendChild(pvFbIconImg);
                        pvIcons.appendChild(pvFbLink);

                        const pvTwiterLink = document.createElement('a');
                        setAttributes(pvTwiterLink, { "class": "social-icon-content", "href": `${protocalValidate(bEl.blockElement.socialTwitterHyperlink)}` });
                        const pvTwitterIconImg = document.createElement('img');
                        setAttributes(pvTwitterIconImg, { "class": "social-icon-img", "src": "/icon/twitter.png" });
                        pvTwiterLink.appendChild(pvTwitterIconImg);
                        pvIcons.appendChild(pvTwiterLink);


                        const pvInstaLink = document.createElement('a');
                        setAttributes(pvInstaLink, { "class": "social-icon-content", "href": `${protocalValidate(bEl.blockElement.socialInstagramHyperlink)}` });
                        const pvInstaIconImg = document.createElement('img');
                        setAttributes(pvInstaIconImg, { "class": "social-icon-img", "src": "/icon/instagram.png" });
                        pvInstaLink.appendChild(pvInstaIconImg);
                        pvIcons.appendChild(pvInstaLink);
                        */


                        // for (let k = 0; k < 2; k++) {
                        // }
                        const iconHolder = createSocialIcons(pvIcons, `${protocalValidate(bEl.blockElement.socialFbHyperlink)}`, `${protocalValidate(bEl.blockElement.socialTwitterHyperlink)}`, `${protocalValidate(bEl.blockElement.socialInstagramHyperlink)}`);
                        pvSelectedElement.append(iconHolder);
                        if (lAr.rowWithColumn === 1) {
                            pvSelectedElement.style.height = "8em";
                        }


                    }
                }
            });



            // ADDING BUTTON 
            // MATCHING ROW ID 

            // console.log(lAr.rowWithColumn);
            // let blockColNum = 0;
            // console.log("layout sibling row ", siblingRowId);// result 1, 2, 3

            // console.log("layout sibling row ", siblingRowId);// result 1, 2, 3

            assendingSibling.forEach((sEl, bIdx) => {

                if (lAr.rowID === sEl.rowNum) {
                    // console.log("sibling col: " + sEl.colNum + ' in row: ' + lAr.rowID); // sibling col: 1 in row: 1, sibling col: 2 in row: 1, sibling col: 2 in row: 2
                    // console.log("Row num: " + lAr.rowWithColumn + " in column number: " + blockColNum); //RESULT - Row num: 2 in column number: 0, Row num: 2 in column number: 1, Row num: 3 in column number: 0
                    let pvSelectedElement = document.getElementById(`${rowNumToStr(lAr.rowWithColumn)}-col-${sEl.colNum - 1}-${sEl.rowNum}`);
                    // btnAlign: null, btnBgColor: "#0d5415", btnContent: "Preview", btnFontFamily: "Helvetica", btnFontSize: 12 btnHyperlink: "http://localhost:4000", btnOpenNewTab: false, btnRound: true, btnTextColor: "#942e2e"
                    let pvSBtnRound;
                    sEl.btnRound == true ? pvSBtnRound = "8px" : pvSBtnRound = "0";
                    let pvBtnTab;
                    // ON CLICK EVENT FOR JAVASCRIPT
                    let pvCorrectHyperlink = null;
                    sEl.btnHyperlink !== null ? pvCorrectHyperlink = protocalValidate(sEl.btnHyperlink) : pvCorrectHyperlink = "#";



                    // let pvOnClickEvent = window.open(`${pvCorrectHyperlink}`);
                    let pvOnClickEvent = null;
                    sEl.btnOpenNewTab === true ? pvOnClickEvent = `target="_blink"` : pvOnClickEvent = "";


                    // if (sEl.btnOpenNewTab == true) {
                    //     // OPEN IN NEW TAB 
                    //     pvBtnTab = "border-radius: 8px;";
                    // } else {
                    //     pvBtnTab = ""
                    // }
                    // console.log(sEl);
                    const pvSiblingBtn = document.createElement('a');
                    setAttributes(pvSiblingBtn, { "href": pvCorrectHyperlink, "id": `btn-${sEl.rowNum}-${sEl.colNum}` });
                    pvSiblingBtn.className = "content btn-content-block";
                    pvSiblingBtn.textContent = sEl.btnContent;
                    pvSiblingBtn.style.backgroundColor = sEl.btnBgColor;
                    pvSiblingBtn.style.fontFamily = sEl.btnFontFamily;
                    pvSiblingBtn.style.fontSize = sEl.btnFontSize;
                    pvSiblingBtn.style.color = sEl.btnTextColor;
                    pvSiblingBtn.style.borderRadius = pvSBtnRound;
                    pvSiblingBtn.style.float = sEl.btnAlign;
                    pvSiblingBtn.style.width = "fit-content";


                    // const pvSiblingBtn = `<a href="${pvCorrectHyperlink}" ${pvOnClickEvent} calss="content btn-content-block" id="btn-${sEl.rowNum}-${sEl.colNum}" style="background:${sEl.btnBgColor}; font-family:${sEl.btnFontFamily}; font-size:${sEl.btnFontSize}px;color: ${sEl.btnTextColor}; ${pvSBtnRound};float:${sEl.btnAlign};" onclick="window.open('${pvCorrectHyperlink}')">${sEl.btnContent}</a>`;

                    // const pvSiblingBtn = document.createElement('button');
                    // pvSiblingBtn.textContent = "Preview";
                    // const pvBtnNodes = stringToNodes(pvSiblingBtn);
                    // pvSelectedElement.appendChild(stringToNodes(pvSiblingBtn));
                    pvSelectedElement.appendChild(pvSiblingBtn);
                    // blockColNum++;
                }

            });

        }
    });











    /*
    const assendingSibling = pvSibling.sort((a, b) => a.colNum - b.colNum);
    // ADD BUTTON 
    let siblingRowId = 1;
    layoutArray.forEach((lAr, rIdx) => {
        // APPENDING ALL BLOCK INTO RIGHT COL AND DIV
        // CHECK IT THERE IS NO SPACE 
        if (!lAr.afterRow) {
            // MATCHING ROW ID 
            if (lAr.rowID === siblingRowId) {
                // console.log(lAr.rowWithColumn);
                // let blockColNum = 0;
                // console.log("layout sibling row ", siblingRowId);// result 1, 2, 3

                // console.log("layout sibling row ", siblingRowId);// result 1, 2, 3
                assendingSibling.forEach((sEl, bIdx) => {
                    if (lAr.rowID === sEl.rowNum) {
                        // console.log("sibling col: " + sEl.colNum + ' in row: ' + lAr.rowID); // sibling col: 1 in row: 1, sibling col: 2 in row: 1, sibling col: 2 in row: 2
                        // console.log("Row num: " + lAr.rowWithColumn + " in column number: " + blockColNum); //RESULT - Row num: 2 in column number: 0, Row num: 2 in column number: 1, Row num: 3 in column number: 0
                        let pvSelectedElement = document.getElementById(`${rowNumToStr(lAr.rowWithColumn)}-col-${sEl.colNum - 1}`);
                        // btnAlign: null, btnBgColor: "#0d5415", btnContent: "Preview", btnFontFamily: "Helvetica", btnFontSize: 12 btnHyperlink: "http://localhost:4000", btnOpenNewTab: false, btnRound: true, btnTextColor: "#942e2e"
                        let pvSBtnRound;
                        sEl.btnRound == true ? pvSBtnRound = "border-radius: 8px;" : pvSBtnRound = "";
                        let pvBtnTab;
                        // ON CLICK EVENT FOR JAVASCRIPT
                        let pvCorrectHyperlink = null;
                        sEl.btnHyperlink !== null ? pvCorrectHyperlink = protocalValidate(sEl.btnHyperlink) : pvCorrectHyperlink = "#";



                        // let pvOnClickEvent = window.open(`${pvCorrectHyperlink}`);
                        if (sEl.btnOpenNewTab === true) {
                            pvOnClickEvent = `${pvCorrectHyperlink}, _blink`;
                        }


                        if (sEl.btnOpenNewTab == true) {
                            // OPEN IN NEW TAB 
                            pvBtnTab = "border-radius: 8px;";
                        } else {
                            pvBtnTab = ""
                        }

                        const pvSiblingBtn = `<button calss="content btn-content-block" id="btn-${sEl.rowNum}-${sEl.colNum}" style="background:${sEl.btnBgColor}; font-family:${sEl.btnFontFamily}; font-size:${sEl.btnFontSize}px;color: ${sEl.btnTextColor}; ${pvSBtnRound}" onclick="window.open('${pvCorrectHyperlink}')">${sEl.btnContent}</button>`;

                        // const pvSiblingBtn = document.createElement('button');
                        // pvSiblingBtn.textContent = "Preview";
                        pvSelectedElement.appendChild(stringToNodes(pvSiblingBtn));
                        // blockColNum++;
                    }
                });
                siblingRowId++;
            }
        }
    });
    */




    /*
    // let siblingRow = 1;
    // let siblingCol = 0;
    assendingSibling.forEach((pVs, sI) => {
        console.log(pVs);
        if (pVs.rowNum === lAr.rowID) {
            console.log(lAr.rowWithColumn);
            // const selectedBlock = document.getElementById(`${rowNumToStr(lAr.)}-col-${siblingCol}`);
            // console.log(selectedBlock);
            // console.log(pVs.length);
            // console.log("Sibling col: ", siblingCol);
            // siblingCol++;
        }
    });
    */







    // STYLING ELEMENTS INSIDE DROP ZONE 
    // TEXT CONTENT EXIT FALSE FOR PREVIEW 
    // const pvTextContent = document.querySelectorAll('.txt-content-block');
    const droppedRow = document.querySelectorAll('.drop-row');
    droppedRow.forEach((dr, dri) => dr.style.height = "fit-content");
    const oneColDiv = document.querySelectorAll('.one-column-div');
    const twoColDiv = document.querySelectorAll('.two-column-div');
    const threeColDiv = document.querySelectorAll('.three-column-div');
    oneColDiv.forEach((ocd, ocdI) => {
        // NOT FOR SOCIAL CONTENT 
        if (ocd.hasChildNodes()) {
            // console.log(ocd.childNodes[0].className);
            if (ocd.childNodes[0].classList[1] !== "icon-content-block") {
                ocd.style.height = "fit-content"
            }
        }
    });
    twoColDiv.forEach((tcd, tcdI) => tcd.style.height = "fit-content");
    threeColDiv.forEach((trcd, trcdI) => {
        if (trcd.hasChildNodes()) {
            trcd.childNodes[0].parentElement.style.height = "fit-content";
            // console.log(trcd.childNodes[0].parentElement);
            // trcd.childNodes.forEach((trcdc, trcdcI) => {
            //     console.log(trcdc.parentElement);
            //     trcdc.parentElement.style.height = "fit-content";
            // });
            // if (trcd.childNodes[0].hasChildNodes()) {
            //     console.log(trcd.childNodes[0]);
            // }

            // trcd.childNodes[0].style.height = "fit-content";

        } else {
            trcd.style.height = "fit-content"

        }
    });
    // console.log(oneColDiv);

    // droppedRow.style.height = "fit-content";
    // const twoCols = document.querySelectorAll(".two-column-div");
    // twoCols.forEach((tc, tci) => tc.style.height = "100%");

    // pvTextContent.forEach(txtCnt => {
    //     txtCnt.setAttribute("contenteditable", false);
    //     // if (txtCnt.getBoundingClientRect().height > 172) {
    //     //     droppedRow.style.height = "fit-content"; // IN PREVIEW
    //     // }
    // });
    dropColumnZone.style.height = "100%"; // IN PREVIEW

}