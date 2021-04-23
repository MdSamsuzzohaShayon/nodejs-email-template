
// https://www.youtube.com/watch?v=6JR8HI9Ymd8

/*

// INPUT FILES
const fileInput = document.getElementById('file-input');
const fileInput2 = document.getElementById('file-input-2');
const fileTitle = document.getElementById('title');


const uploadSubmit = document.getElementById('submit-upload');
const uploadMultipleSubmit = document.getElementById('submit-multiple-upload');


const fileFormData = new FormData();

fileInput.addEventListener("change", e => {
    // console.log("E: ", e.target.files[0]);
    // formData.append("img1", e.target.files[0], "custom1 name.jpg");
    fileFormData.append("img1", e.target.files[0]);
});


fileInput2.addEventListener("change", e => {
    fileFormData.append("img2", e.target.files[0]);
});


fileTitle.addEventListener('change', e => {
    fileFormData.append("title", e.target.value);
});





const someJson = {
    name: "this is name",
    desc: "this is desc"
};
fileFormData.append("json", JSON.stringify(someJson));


const host = window.location.host;


// SINGLE FILE UPLOAD
uploadSubmit.addEventListener('click', async e => {


    fetch(`http://${host}/template/file-upload`, {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: fileFormData
    })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
});






// MULTIPLE FILE UPLOADS
uploadMultipleSubmit.addEventListener('click', async e => {


    // DIFFERENT FILES BUT THE SAME KEY
    // WITH ONE INPUT FIELD
    for (const [key, value] of formData) {
        console.log("key: ", key);
        console.log("value: ", value);
    }




    fetch(`http://${host}/template/file-multiple-upload`, {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: fileFormData
    })
        .then(res => {
            console.log("Response: ", res);
        })
        .catch(err => {
            console.log(err);
        });
});
*/
