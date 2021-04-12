/*

let numberOfEntries = window.history.length;
console.log("History: ", numberOfEntries);




// https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event
window.addEventListener('popstate', (event) => {
    console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
});
history.pushState({ page: 1 }, "title 1", "?page=1");
history.pushState({ page: 2 }, "title 2", "?page=2");
history.replaceState({ page: 3 }, "title 3", "?page=3");
history.back(); // Logs "location: http://example.com/example.html?page=1, state: {"page":1}"
history.back(); // Logs "location: http://example.com/example.html, state: null"
history.go(2);  // Logs "location: http://example.com/example.html?page=3, state: {"page":3}"
*/




/*
// DRAG START 
e.toElement.classList[1].toString() === "spx-holder";



// DROP 
if (dropableBlock === "spx-holder") {
    rowNumber = convertRowIdToNumber(e.path[1].id);
    columnNumber = convertColIdToNumber(e.toElement.id);

    const newBlockCol = document.createElement('button');
    setAttributes(newBlockCol, { 'class': "content", "id": "spx-" + rowNumber + '-' + columnNumber });   //  "txt-" + rowNumber + '-' + columnNumber 
    newBlockCol.textContent = 'space';
    e.toElement.appendChild(newBlockCol);

    blockElement = dropableBlock;
    positionElement.push({ rowNumber, columnNumber, blockElement: "Space" });
}
*/



// drop-row


// https://github.com/MdSamsuzzohaShayon/vanilla-javascript-mini-project/blob/master/Drag%20%26%20Drop/part-2/js/main.js
function getDragAfterElement(container, y) {
    // not(.dragging) = THIS MEANS THE CURRENT ELEMENT WE ARE DRAGGING THAT NOT 
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
    // RETURN WHATEVER THE MOUSE CURSER IS DIRECTLY ABOVE 
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        // console.log("Box: ", box);
        // DISTANCE OF CENTER OF THE BOX AND ACTUAL MOUSE CURSER 
        const offset = y - box.top - box.height / 2;
        // console.log("Offset: ", offset);
        // FIND WHICH ELEMENT IS CLOSEST TO 0 
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest;
        }
        // Number.POSITIVE_INFINITY = LARGEST NUMBER POSSIBLE, EVERY SINGLE NUMBER WILL BE SMALLER THAN THAT, 
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}



















// THIS IS A BETTER SOLUTION 
// https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement
// console.log(document.activeElement.querySelector('.two-column-div'));





// https://developer.mozilla.org/en-US/docs/Web/API/HTMLTrackElement/cuechange_event
// document.getElementById('drop-zone').addEventListener('cuechange', function (e) {
//     let cues = track.activeCues;  // array of current cues
//     console.log(cues);
//     console.log(e.target.track.activeCues);
// });






// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
// document.addEventListener('readystatechange', (event) => {
//     log.textContent = log.textContent + `readystate: ${document.readyState}\n`;
// });

// console.log(document.getElementById('row-1'));


