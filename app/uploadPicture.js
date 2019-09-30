let input;

window.onload = function() {
    input = document.getElementById("file-upload");
    input.addEventListener("change", updateImageDisplay);
}

function updateImageDisplay() {
    let preview = document.querySelector(".add-form__preview");
    let submitButton = document.querySelector(".add-form__submit-post");
    let currentFile = input.files;

    while(preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    if (currentFile.length == 0) {
        let warning = document.createElement("p");
        warning.textContent = "No files currently selected for upload";
        preview.appendChild(warning);
        submitButton.disabled = true;
    } else {
        let image = document.createElement('img');
        image.src = window.URL.createObjectURL(currentFile[0]);
        image.style.maxWidth = "inherit";
        preview.appendChild(image);
        submitButton.style.color = "#5e5e5e";
        submitButton.disabled = false;
    }
}

