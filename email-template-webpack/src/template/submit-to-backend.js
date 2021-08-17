// console.log(submitSpinner);
// MAIN FUNCTION 6
function backendAndDataBase(reqUrl, method) {

    // console.log(submitSpinner);

    saveButton.addEventListener('click', async e => {
        e.preventDefault();
        // console.log(submitSpinner);
        submitSpinner.classList.remove("d-none");
        // return;
        // console.log("Sibling Button: ", siblingButtonList);
        // console.log("Row list: ", rowList);
        // console.log("Elements: ", positionElement);

        try {
            const selectedTextContent = document.getElementById(`txt-${selectedRow}-${selectedCol}`);
            // console.log(selectedTextContent);

            // FOR CHANGING TEXT CONTENT 
            await positionElement.forEach(pEl => {
                if (pEl.blockElement.name === "txtBlockContent") {
                    // console.log(pEl.rowNumber);
                    pEl.blockElement.blockHtml = document.getElementById(`txt-${pEl.rowNumber}-${pEl.columnNumber}`).outerHTML;
                }
                if (pEl.blockElement.name === "imgBlockContent") {
                    // console.log(pEl.rowNumber);
                    pEl.blockElement.imgUrl = "/img/empty-image.png";
                    // SET DEFAULT IMAGE URL - FROM SERVER CHENGE RIGHT URL FOR RIGHT IMAGE  
                }
                // if (currentPath === editorPage) {
                // }
            });

            // CHANGING TITLE 
            // console.log(inputTitle.value);
            await formData.append("title", inputTitle.value);
            await formData.append('bgColor', templateBGColorInput.value);
            await formData.append('linkColor', templateLinkColorInput.value);


            // // const positionObj = await new Map(positionElement);
            // // const newPositionObject = await Object.fromEntries(positionObj);
            // // const newPositionElement = await Object.assign({}, positionElement); // {0:"a", 1:"b", 2:"c"}

            await formData.append('layout', JSON.stringify(rowList));
            await formData.append('element', JSON.stringify(positionElement));
            await formData.append('sibling', JSON.stringify(siblingButtonList));



            // inputTitle.nodeValue = title;
            // NEED TO DO SOME CHANGES IN POSITION ELEMENT 





            // DIDN'T WORK 
            // JSON.stringify(positionElement, function replacer(key, value) { return value})    
            // await formData.append('layout', JSON.stringify(rowList));
            // await formData.append('element', JSON.stringify(positionElement, function replacer(key, value) { return value }));
            // console.log(positionElement);





            // for (let value of formData.values()) {
            //     console.log("Form data: ", value);
            // }



            // //SUBMITTING DATA TO THE SERVER 
            const response = await fetch(reqUrl, {
                // method: "POST",
                method: method,
                body: formData,
            });
            console.log(response);

            // console.log("Sibling Button: ", siblingButtonList);
            // console.log("Row list: ", rowList);
            // console.log("Elements: ", positionElement);







            // PROCEEDING 



            // IF SUBMITTED SUCCESSFULLY WI WILL REDIRECT SUCCESSFULLY 
            // submitted = true;
            submitSpinner.classList.add("d-none");
            window.location.replace(websiteDomain + "/template");
        } catch (err) {
            console.log(err);
        }



    });
}
