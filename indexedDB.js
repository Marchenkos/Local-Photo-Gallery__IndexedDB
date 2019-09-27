let db;
let gallery = document.querySelector(".gallery");

(function createDB() {
    let form = document.querySelector("form");

    let request = window.indexedDB.open("gallery_db", 1);
    form.onsubmit = addData;

    request.onerror = () => {
        console.log("DB failed to open");
    }

    request.onsuccess = () => {
        console.log("DB opened successfully");
        db = request.result;
        displayPosts();
    }

    request.onupgradeneeded = function(e) {
        let db = e.target.result;

        let objectStore = db.createObjectStore("gallery_db", {keyPath: "id", autoIncrement: true});
        
        objectStore.createIndex("author", "author", {unique:false});
        objectStore.createIndex("link", "link", {unique:false});
        objectStore.createIndex("description", "description", {unique:false});
    }
})();

function addData(e) {
    let author = document.querySelector(".editing-form__information--author");
    let description = document.querySelector(".editing-form__information--description");
    let preview = document.querySelector(".preview");
    let img = preview.getElementsByTagName("img")[0];

    e.preventDefault();
    let oMyBlob = new Blob(img, {type : 'image/jpeg'}); // the blob
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
        displayPosts();
    };
  
    transaction.onerror = function() {
        console.log('Transaction not opened due to error');
    };

    displayPosts();
}

function displayPosts() {
    while(gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }

    let objectStore = db.transaction("gallery_db").objectStore("gallery_db");

    objectStore.openCursor().onsuccess = function(e) {
        let cursor = e.target.result;

        if(cursor) {
            let post = document.createElement("div");
            let image = document.createElement('img');
            let description = document.createElement("div");
            let author = document.createElement("h1");

            post.classList.add("gallery__item");
            image.classList.add("item__picture");
            description.classList.add("item__description")

            image.src = cursor.value.link;

            post.setAttribute("id", cursor.value.id);
            author.textContent = cursor.value.author;
            description.textContent = cursor.value.description;
            description.appendChild(author);
            post.appendChild(image);
            post.appendChild(description);
            gallery.appendChild(post);
            // post.addEventListener("click", showDesciption(), false);
            cursor.continue();

        } 
        console.log("Posts all displayed");
    }
}