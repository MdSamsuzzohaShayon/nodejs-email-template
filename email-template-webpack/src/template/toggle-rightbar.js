// USING THE RIGHT CODE FOR RIGHT PAGE THIS IS VERY IMPORTANT 
const findPath = window.location.pathname.toString().split('/');
const currentPath = findPath[2];
const editPage = "edit";







// HEADER IMAGE 


// RIGHT BAR ELEMENT TO SHOW AND HIDE 
const propertiesBar = document.getElementById('rb-props');
const blockElementBar = document.getElementById('rb-block');
// SELECTING ALL ELEMENT AT ALL 
const allProperties = document.querySelectorAll('.props');



// ROW PROPS 
const rowProps = document.querySelector('.row-props');


// TEXT PROPS 
const txtProps = document.querySelector('.txt-props');


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
const previewImg = document.getElementById('img-preview'),
    imgLink = document.getElementById('img-link'),
    imgNewTab = document.getElementById('img-new-tab');


let positionElement = [];   // THIS IS FOR TRACKING WHICH WHICH BLOCK ELEMENT IS HOLDING WHICH POSITION - FOR EXAMPLE IMAGE HOLDER IS TAKING ROW-2 AND COLUMN 2
let siblingButtonList = new Array();


// DATABASE DESIGN ENDS 

// TEMPORARY GLOBAL VARIABLES 
// WHEN SOMEONE CLICK ON BLOCK ELEMENT IT CAN ASSIGNED WITH ROW NUMBER AND COL NUMBER 
let selectedRow = null;
let selectedCol = null;
let templateSelected = true;


// MAIN FUNCTION 3
export default function rightBarElementShowHidePreset() {




    document.addEventListener('click', e => {
        // e.preventDefault();

        try {
            // CLEAN UP DEFAULT VALUE FOR ALL INPUT FIELD 
            let idString = null;
            // IF SOMEONE CLICK ON ANY BLOCK THE PROPERTY BAR WILL OPEN (ALL BLOCK EXCEPT SPACE BLOCK)
            if (e.toElement.classList[0] === 'content' || e.toElement.className === 'social-icon-content' || e.toElement.className === 'social-icon-img') {
                templateSelected = false;
                if (e.toElement.className === 'social-icon-content' || e.toElement.className === 'social-icon-img') {
                    if (e.toElement.className === 'social-icon-img') {
                        idString = e.toElement.parentElement.parentElement.id;
                    }
                    if (e.toElement.className === 'social-icon-content') {
                        idString = e.toElement.parentElement.id;
                    }
                } else {
                    idString = e.toElement.id.toString();
                }
                let findRowCol = idString.split('-');
                selectedRow = parseInt(findRowCol[1]);
                selectedCol = parseInt(findRowCol[2]);







                propertiesBar.style.display = 'block';
                blockElementBar.style.display = 'none';
                if (e.toElement.classList[1] === "img-content-block") {
                    // console.log("Event- e.target: ",e.target);
                    allProperties.forEach(ap => { ap.style.display = 'none' });
                    imgProps.style.display = 'block';
                    const previousProps = positionElement.filter((pEl, pelIxd) => pEl.rowNumber === selectedRow && pEl.columnNumber === selectedCol);
                    // console.log("Previous Props: ", previousProps);
                    // SET ALL DEFAULT VALUE 
                    // inputImg.addEventListener('change', e => {
                    //     // const previewTempImg = document.querySelector('.img-content-block');
                    //     const templateImgPreview = document.getElementById(`img-${selectedRow}-${selectedCol}`);
                    //     imgUploadHandler(e.target.files[0], [previewImg, templateImgPreview]);  // Working but need to save in db
                    // });
                    // imgUrl: "/img/empty-image.png"
                    // inputImg.defaultValue = previousProps[0].blockElement.imgUrl;
                    // let setImgNewTab = false;
                    // console.log(previousProps[0].blockElement.imgHyperlink);
                    imgLink.value = previousProps[0].blockElement.imgHyperlink;  // WORKING
                    imgNewTab.checked = previousProps[0].blockElement.imgNewTab;
                    currentPath === editPage ? previewImg.src = imgKeyToLink(previousProps[0].blockElement.imgUrl.trim()) : previewImg.src = previousProps[0].blockElement.imgUrl;
                    // previewImg.src = imgKeyToLink(previousProps[0].blockElement.imgUrl);
                    // txt-content-block
                } else if (e.toElement.classList[1] === "txt-content-block") {
                    const selectedTextContent = document.getElementById(`txt-${selectedRow}-${selectedCol}`);
                    resizeObserver.observe(selectedTextContent);
                    allProperties.forEach(ap => { ap.style.display = 'none' });
                    txtProps.style.display = 'block';

                } else if (e.toElement.className === 'social-icon-content' || e.toElement.className === 'social-icon-img') {
                    allProperties.forEach(ap => { ap.style.display = 'none' });
                    socialProps.style.display = 'block';
                    const previousProps = positionElement.filter((pEl, pelIxd) => pEl.rowNumber === selectedRow && pEl.columnNumber === selectedCol);
                    // console.log("Previous Props: ", previousProps);
                    fbLinkInput.value = previousProps[0].blockElement.socialFbHyperlink;
                    twitterLinkInput.value = previousProps[0].blockElement.socialTwitterHyperlink;
                    instagramLinkInput.value = previousProps[0].blockElement.socialInstagramHyperlink;
                } else if (e.toElement.classList[1] === "btn-content-block") {
                    allProperties.forEach(ap => { ap.style.display = 'none' });
                    btnProps.style.display = 'block';
                    const previousProps = siblingButtonList.filter((sBl, sblIxd) => sBl.rowNum === selectedRow && sBl.colNum === selectedCol);
                    // console.log("Previous Props: ", previousProps);
                    btnFontSizeInput.value = previousProps[0].btnFontSize;
                    btnFontFamilyInput.value = previousProps[0].btnFontFamily;
                    btnBGColorInput.value = previousProps[0].btnBgColor;
                    btnTxtColorInput.value = previousProps[0].btnTextColor;
                    btnTextContentInput.value = previousProps[0].btnContent;
                    btnHyperlinkInput.value = previousProps[0].btnHyperlink;
                    btnNewTabInput.checked = previousProps[0].btnOpenNewTab;
                    btnShapeInput.checked = previousProps[0].btnRound;

                } else {
                    allProperties.forEach(ap => { ap.style.display = 'none' });
                }
            }

            // IF SOMEONE CLICK ON SPACE HE WILL BE ABLE TO CHANGE SPACE PROPS 
            if (e.toElement.classList[1] === "space-row-grid") {
                propertiesBar.style.display = 'block';
                blockElementBar.style.display = 'none';
                allProperties.forEach(ap => { ap.style.display = 'none' });
                spxProps.style.display = 'block';
                selectedAfterRow = stringIdToIdNum(e.toElement.id, 1);
            }

            // IF SOMEONE CLICK ON ROW HE WILL BE ABLE TO CHANGE ROW PROPS 
            if (e.target.parentElement.className === 'drop-row') {
                propertiesBar.style.display = 'block';
                blockElementBar.style.display = 'none';
                allProperties.forEach(ap => { ap.style.display = 'none' });
                rowProps.style.display = 'block';
                // if (e.target.className === 'drop-row') selectedRow = stringIdToIdNum(e.toElement.id, 1);
                // if (e.target.parentElement.className === 'drop-row') selectedRow = stringIdToIdNum(e.toElement.parentElement.id, 1);
                selectedRow = stringIdToIdNum(e.toElement.parentElement.id, 1);
                // console.log(selectedRow);
            }

            // IF SOMEONE CLICK  OUT OF THE BLOCK THE PROPERTY BAR WILL CLOSE 
            if (e.target.className === 'template-wrapper' || e.target.className === 'header-image' || e.target.classList[0] === 'col') {
                templateSelected = true;
                allProperties.forEach(ap => { ap.style.display = 'none' });
                propertiesBar.style.display = 'none';
                blockElementBar.style.display = 'block';
                selectedAfterRow = null;
                selectedRow = null;
                selectedCol = null;
            }
            // console.log(`Selected row: ${selectedRow} Selected col : ${selectedCol}`);

        } catch (err) {
            console.log("Error from show hide: ", err);
        }
    });

}