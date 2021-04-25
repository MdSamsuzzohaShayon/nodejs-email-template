// DATE
// var Xmas95 = new Date();
// var seconds = Xmas95.getSeconds();
// console.log(seconds);


// UPDATE IMAGE JAVASCRIPT
/*
const updateImg = document.getElementById('update-img');
const updateTitle = document.getElementById('update-title');
const updateSubmit = document.getElementById('update-submit');


const updateFormData = new FormData();
updateImg.addEventListener("change", e => {
    // console.log("E: ", e.target.files[0]);
    // formData.append("img1", e.target.files[0], "custom1 name.jpg");
    updateFormData.append("img1", e.target.files[0]);
});


updateTitle.addEventListener('change', e => {
    updateFormData.append("title", e.target.value);
    console.log(e.target.value);
});

// updateFormData.append("username", "Groucho");
// updateFormData.append("accountnum", 123456); // number 123456 is immediately converted to a string "123456"



const host = window.location.host;







const someJson = {
    name: "this is name",
    desc: "this is desc"
};
updateFormData.append("json", JSON.stringify(someJson));



// SINGLE FILE UPLOAD
updateSubmit.addEventListener('click', e => {
    console.log("Submitted");

    for (const [key, value] of updateFormData) {
        console.log("key: ", key);
        console.log("value: ", value);
    }

    console.log(e.target);
    fetch(`http://localhost:4000/users/upload`, {
        method: "POST",
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: updateFormData
    })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
});



*/


// https://www.youtube.com/watch?v=6JR8HI9Ymd8


/*
// INPUT FILES
const fileInput = document.getElementById('file-input');
const fileInput2 = document.getElementById('file-input-2');
const fileTitle = document.getElementById('title');


const updateSubmit = document.getElementById('submit-update');
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

// UPDATE
updateSubmit.addEventListener('click', async e => {


    fetch(`http://${host}/template/file-upload`, {
        method: "PUT",
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





// MAKE A PUR REQUEST WITH FETCH AND BLOB DATA 

