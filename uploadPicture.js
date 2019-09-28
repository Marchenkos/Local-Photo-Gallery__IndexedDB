let input, preview;

window.onload = function() {
    input = document.getElementById("file-upload");
    input.addEventListener("change", updateImageDisplay);
}

function updateImageDisplay() {
    let preview = document.getElementsByClassName("preview")[0];

    while(preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    let currentFile = input.files;

    if (currentFile.length == 0) {
        let warning = document.createElement("p");
        warning.textContent = "No files currently selected for upload";
        preview.appendChild(warning);
    } else {
        let image = document.createElement('img');
        console.log(window.URL.createObjectURL(currentFile[0]));
        console.log(input.value);

        image.src = window.URL.createObjectURL(currentFile[0]);
        image.style.maxWidth = "inherit";
        preview.appendChild(image);
        console.log(preview);
    }
}

