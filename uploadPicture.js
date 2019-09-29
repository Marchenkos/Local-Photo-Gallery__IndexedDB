let input, preview;

window.onload = function() {
    input = document.getElementById("file-upload");
    input.addEventListener("change", updateImageDisplay);
}

function updateImageDisplay() {
    let preview = document.getElementsByClassName("preview")[0];
    let submitButton = document.querySelector(".editing-form__submit-post");

    while(preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    let currentFile = input.files;

    if (currentFile.length == 0) {
        let warning = document.createElement("p");
        warning.textContent = "No files currently selected for upload";
        preview.appendChild(warning);
        submitButton.disabled = true;
    } else {
        let image = document.createElement('img');
        console.log(window.URL.createObjectURL(currentFile[0]));
        console.log(input.value);

        image.src = window.URL.createObjectURL(currentFile[0]);
        image.style.maxWidth = "inherit";
        preview.appendChild(image);
        submitButton.style.color = "#5e5e5e";
        submitButton.disabled = false;
        console.log(preview);
    }
}

