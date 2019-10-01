let db;
let gallery = document.querySelector(".gallery");

(function createDB() {
    let form = document.querySelector(".add-form");
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
    e.preventDefault();

    let input = document.getElementById("file-upload");
    let currentFile = input.files;
    let author = document.querySelector(".add-form__information--author");
    let description = document.querySelector(".add-form__information--description");
    let oMyBlob = new Blob(currentFile, {type : 'image/jpeg'});
    let date = new Date();
    let newPost = { author: author.value, link: oMyBlob, description: description.value, date: date.toShortFormat() };
    let transaction = db.transaction(["gallery_db"], "readwrite");
    let objectStore = transaction.objectStore("gallery_db");
    let request = objectStore.add(newPost);

    request.onsuccess = function() {
        author.value = '';
        description.value = '';
        displayPosts();
    };

    transaction.oncomplete = function() {
        console.log('Transaction completed: database modification finished.');
    };

    transaction.onerror = function() {
        console.log('Transaction not opened due to error');
    };
}

function clearDisplay(root) {
    while(root.firstChild) {
        root.removeChild(root.firstChild);
    }
}

function getData() {
    let allData = [];
    let objectStore = db.transaction("gallery_db").objectStore("gallery_db");

    objectStore.openCursor().onsuccess = function(e) {
        let cursor = e.target.result;

        if(cursor) {
            let data = {
                id: cursor.value.id,
                author: cursor.value.author,
                link: cursor.value.link,
                description: cursor.value.description,
                date: cursor.value.date
            };
            allData.push(data);
            cursor.continue();
        }
    }

    return allData;
}

function displayPosts() {
    clearDisplay(gallery);
    let allData = getData();

    for(data of allData) {
        let post = document.createElement("div");
        let image = document.createElement('img');
        let description = document.createElement("div");
        let author = document.createElement("h1");
        let checkButton = document.createElement("input");
        let imgURL = window.URL.createObjectURL(data.link);
        checkButton.classList.add("item-content__checking");
        checkButton.type = "checkbox";
        checkButton.setAttribute("id", "checkbox" + data.id);
        post.classList.add("gallery__item");
        image.classList.add("item-content__picture");
        description.classList.add("item-content__description");
        author.classList.add("item-title__author");
        image.src = imgURL;
        post.setAttribute("id", data.id);
        author.textContent = data.author;
        description.textContent = data.description;
        description.appendChild(author);
        post.appendChild(image);
        post.appendChild(description);
        post.appendChild(checkButton);
        gallery.appendChild(post);
        post.addEventListener("click", function() {
            showDesciption(data.id);
        }, false);
    }

    console.log("Posts all displayed");
}

// function displayPosts() {
//     while(gallery.firstChild) {
//         gallery.removeChild(gallery.firstChild);
//     }

//     let objectStore = db.transaction("gallery_db").objectStore("gallery_db");

//     objectStore.openCursor().onsuccess = function(e) {
//         let cursor = e.target.result;

//         if(cursor) {
//             let post = document.createElement("div");
//             let image = document.createElement('img');
//             let description = document.createElement("div");
//             let author = document.createElement("h1");
//             let checkButton = document.createElement("input");
//             let imgURL = window.URL.createObjectURL(cursor.value.link);
//             let currentId = cursor.value.id;
//             checkButton.classList.add("item-content__checking");
//             checkButton.type = "checkbox";
//             checkButton.setAttribute("id", "checkbox" + cursor.value.id);
//             post.classList.add("gallery__item");
//             image.classList.add("item-content__picture");
//             description.classList.add("item-content__description");
//             author.classList.add("item-title__author");
//             image.src = imgURL;
//             post.setAttribute("id", cursor.value.id);
//             author.textContent = cursor.value.author;
//             description.textContent = cursor.value.description;
//             description.appendChild(author);
//             post.appendChild(image);
//             post.appendChild(description);
//             post.appendChild(checkButton);
//             gallery.appendChild(post);
//             post.addEventListener("click", function() {
//                 showDesciption(currentId);
//             }, false);

//             cursor.continue();
//         }

//         console.log("Posts all displayed");
//     }
// }