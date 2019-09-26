window.onload = function() {
    var input = document.getElementById("file-upload");
    var preview = document.querySelector('.preview');
    
    input.addEventListener("change", updateImageDisplay);
    
    function updateImageDisplay() {
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
            var image = document.createElement('img');
            image.src = window.URL.createObjectURL(currentFile[0]);
            image.style.maxWidth = "inherit";
            preview.appendChild(image);
        }
    }
}