/*
// https://www.youtube.com/watch?v=6JR8HI9Ymd8

// INPUT FILES
const fileInput = document.getElementById('file-input');
const fileInput2 = document.getElementById('file-input-2');
const title = document.getElementById('title');


const uploadSubmit = document.getElementById('submit-upload');
const uploadMultipleSubmit = document.getElementById('submit-multiple-upload');


const formData = new FormData();

fileInput.addEventListener("change", e => {
    // console.log("E: ", e.target.files[0]);
    // formData.append("img1", e.target.files[0], "custom1 name.jpg");
    formData.append("img1", e.target.files[0]);
});


fileInput2.addEventListener("change", e => {
    formData.append("img2", e.target.files[0]);
});


title.addEventListener('change', e => {
    formData.append("title", e.target.value);
});





const someJson = {
    name: "this is name",
    desc: "this is desc"
};
formData.append("json", JSON.stringify(someJson));
uploadSubmit.addEventListener('click', async e => {


    fetch('http://localhost:4000/template/file-upload', {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: formData
    })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
});







uploadMultipleSubmit.addEventListener('click', async e => {


    // DIFFERENT FILES BUT THE SAME KEY
    // WITH ONE INPUT FIELD
    for (const [key, value] of formData) {
        console.log("key: ", key);
        console.log("value: ", value);
    }



    fetch('http://localhost:4000/template/file-multiple-upload', {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: formData
    })
        .then(res => {
            console.log("Response: ", res);
        })
        .catch(err => {
            console.log(err);
        });
});
*/