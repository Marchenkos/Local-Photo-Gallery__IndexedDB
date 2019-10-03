window.form = (function () {
    return {
        openForm() {
            let form = document.querySelector(".main__additing-post");
            form.style.display = "block";
        },
        closeForm() {
            let form = document.querySelector(".main__additing-post");
            let preview = document.querySelector(".add-form__preview");
            if(preview.firstChild) {
                preview.removeChild(preview.firstChild);
            }
            form.style.display = "none";
        },
        updatePreviewField() {
            let input = document.getElementById("file-upload");
            let preview = document.querySelector(".add-form__preview");
            let submitButton = document.querySelector(".add-form__submit-post");
            let currentFile = input.files;
        
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
    }
})()