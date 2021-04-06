const uploadSubmit = document.getElementById('submit-upload');
const fileInput = document.getElementById('file-input');


let tempFile = null;
const formData = new FormData();

fileInput.addEventListener("change", e => {
    // console.log("E: ", e.target.files[0]);
    tempFile = e.target.files[0];
    // formData.append("filename", tempFile);
    // formData.append("user", "Shayon");
});





uploadSubmit.addEventListener('click', async e => {
    // console.log("File temp value: ", tempFile);
    console.log("Form Data ", fileInput.files[0]);
    formData.append("filename", fileInput.files[0]);
    formData.append("user", "Shayon");


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