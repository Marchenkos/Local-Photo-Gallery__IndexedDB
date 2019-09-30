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
        objectStore.createIndex("date", "date", {unique:false});
    }
})();

function addData(e) {
    let input = document.getElementById("file-upload");
    let currentFile = input.files;
    let author = document.querySelector(".editing-form__information--author");
    let description = document.querySelector(".editing-form__information--description");

    e.preventDefault();
    let oMyBlob = new Blob(currentFile, {type : 'image/jpeg'});
    let date = new Date();
    let newPost = { author: author.value, link: oMyBlob, description: description.value, date: date.toShortFormat()};
    let transaction = db.transaction(["gallery_db"], "readwrite");
    let objectStore = transaction.objectStore("gallery_db");
  
    let request = objectStore.add(newPost);
    request.onsuccess = function() {
        author.value = '';
        description.value = '';
    };
  
    transaction.oncomplete = function() {
        console.log('Transaction completed: database modification finished.');
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
            let checkButton = document.createElement("input");
            let openDescriptionButton = document.createElement("div");
            openDescriptionButton.classList.add("icon-flickr");
            openDescriptionButton.classList.add("description-items__open-description");
            checkButton.classList.add("item__checking");
            checkButton.type = "checkbox";
            let idForCheckbox = "checkbox" + cursor.value.id;
            checkButton.setAttribute("id", idForCheckbox);

            // checkButton.addEventListener("click", checkingPosts, false);
            post.classList.add("gallery__item");
            image.classList.add("item__picture");
            description.classList.add("item__description");
            author.classList.add("description-items__author");
            let imgURL = window.URL.createObjectURL(cursor.value.link);
            image.src = imgURL;
            post.setAttribute("id", cursor.value.id);
            author.textContent = cursor.value.author;
            description.textContent = cursor.value.description;
            description.appendChild(author);
            post.appendChild(image);
            post.appendChild(description);
            post.appendChild(checkButton);
            post.appendChild(openDescriptionButton);
            gallery.appendChild(post);
            let paramId = cursor.value.id;
            post.addEventListener("click", function() {
                showDesciption(paramId);
            }, false);

            cursor.continue();

        } 
        console.log("Posts all displayed");
    }
}

function deleteAllPosts() {
    let require = db.transaction(["gallery_db"], "readwrite")
    .objectStore("gallery_db")
    .clear();

    require.onsuccess = function () {
        console.log("Deleted database successfully");
    };
    require.onerror = function () {
        console.log("Couldn't delete database");
    };
    require.onblocked = function () {
        console.log("Couldn't delete database due to the operation being blocked");
    };
    gallery.innerHTML = "";
}

function deletePost() {
    let posts = document.querySelectorAll(".gallery__item");
    [].forEach.call(posts, post => {
        let checking = post.querySelector(".item__checking");
        let objectStore = db.transaction(["gallery_db"], "readwrite").objectStore("gallery_db");

        if(checking.checked) {
            objectStore.openCursor().onsuccess = function(e) {
                let cursor = e.target.result;
    
                if(cursor) {
                   if(post.id == cursor.value.id) {
                       console.log(post.id == cursor.value.id);
                       let request = cursor.delete();
                       request.onsuccess = function () {
                           console.log("Delete is success");
                       };
                    }

                    cursor.continue();
                }
            }
        }
    });

    displayPosts();
}