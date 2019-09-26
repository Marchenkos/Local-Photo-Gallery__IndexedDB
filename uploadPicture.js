window.onload = function() {
    let input = document.getElementById("file-upload");
    let preview = document.querySelector('.preview');
    console.log(preview);
    
    input.addEventListener("change", updateImageDisplay);

    function updateImageDisplay() {
        console.log("mmmmm");

        let preview = document.getElementsByClassName("preview")[0];
    
        while(preview.firstChild) {
          preview.removeChild(preview.firstChild);
        }
    
        let currentFile = input.files;

        console.log(currentFile);
    
        if (currentFile.length == 0) {
          let warning = document.createElement("p");
          warning.textContent = "No files currently selected for upload";
          preview.appendChild(warning);
        } else {
            let image = document.createElement('img');
            image.src = window.URL.createObjectURL(currentFile[0]);
            image.style.maxWidth = "inherit";
            preview.appendChild(image);
            console.log(preview);
        }
    }
}
