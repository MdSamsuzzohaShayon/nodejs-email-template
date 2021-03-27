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


