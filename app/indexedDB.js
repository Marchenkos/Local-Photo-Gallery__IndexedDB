let db;
let gallery = document.querySelector(".gallery");
let form = document.querySelector("form");

window.onload = function() {
    let input = document.getElementById("file-upload");
    let preview = document.querySelector('.preview');
    
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
            let image = document.createElement('img');
            image.src = window.URL.createObjectURL(currentFile[0]);
            image.style.maxWidth = "inherit";
            preview.appendChild(image);
            console.log(preview);
        }
    }





    let request = window.indexedDB.open("gallery_db", 1);
    form.onsubmit = addData;

    request.onerror = () => {
        console.log("DB failed to open");
    }

    request.onsuccess = () => {
        console.log("DB opened successfully");
        db = request.result;
        // displayPosts();
    }

    request.onupgradeneeded = function(e) {
        let db = e.target.result;

        let objectStore = db.createObjectStore("gallery_db", {keyPath: "id", autoIncrement: true});
        
        objectStore.createIndex("author", "author", {unique:false});
        objectStore.createIndex("link", "link", {unique:false});
        objectStore.createIndex("description", "description", {unique:false});
    }

    function addData(e) {
    let author = document.querySelector(".editing-form__information--author");
    let description = document.querySelector(".editing-form__information--description");
    let preview = document.querySelector(".preview");
    let img = preview.getElementsByTagName("img")[0];

    e.preventDefault();
  
    let newPost = { author: author.value, link: img.src, description: description.value};
    let transaction = db.transaction(["gallery_db"], "readwrite");
    let objectStore = transaction.objectStore("gallery_db");
  
    var request = objectStore.add(newPost);
    request.onsuccess = function() {
        author.value = '';
        description.value = '';
    };
  
    transaction.oncomplete = function() {
        console.log('Transaction completed: database modification finished.');
        // displayPosts();
    };
  
    transaction.onerror = function() {
        console.log('Transaction not opened due to error');
    };

    // displayPosts();
}

function displayPosts() {
    while(gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }

    let objectStore = db.transaction("gallery_bd").objectStore("gallery_db");
    objectStore.openCursor().onsuccess = function(e) {
        let cursor = e.target.result;

        if(cursor) {
            let post = document.createElement("div");
            let img = document.createElement("img");
            let text = document.createElement("div");
            let title = document.createElement("h1");
            img.classList.add("item__picture");
            text.classList.add("item__description")
            post.classList.add("gallery__item");
            post.setAttribute("id", cursor.value.id);
            img.setAttribute("src", cursor.value.link);
            text.appendChild(title);
            post.appendChild(img);
            post.appendChild(text);
            gallery.appendChild(post);
            post.addEventListener("click", showDesciption(this.id), false);
            title.textContent = cursor.value.author;
            text.textContent = cursor.value.description;
            cursor.continue();
        } else {
            let message = document.createElement("p");
            message.textContent = "No posts stored";
            gallery.appendChild(message);
        }
        
        console.log("Posts all displayed");
    }
}
}