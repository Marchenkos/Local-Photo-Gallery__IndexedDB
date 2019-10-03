window.db = (function() {
    let database;
    let request = window.indexedDB.open("gallery_db", 1);

    request.onerror = () => {
        console.log("DB failed to open");
    }

    request.onsuccess = () => {
        console.log("DB opened successfully");
        database = request.result;
    }

    request.onupgradeneeded = function(e) {
        let database = e.target.result;
        let objectStore = database.createObjectStore("gallery_db", {keyPath: "id", autoIncrement: true});
        objectStore.createIndex("author", "author", {unique:false});
        objectStore.createIndex("link", "link", {unique:false});
        objectStore.createIndex("description", "description", {unique:false});
        objectStore.createIndex("date", "date", {unique:false});
    }

    return {
        addData(e) {

            e.preventDefault();
            let input = document.getElementById("file-upload");
            let currentFile = input.files;
            let author = document.querySelector(".add-form__information--author");
            let description = document.querySelector(".add-form__information--description");
            let oMyBlob = new Blob(currentFile, {type : 'image/jpeg'});
            let date = new Date();
            let newPost = { author: author.value, link: oMyBlob, description: description.value, date: date.toShortFormat() };
            let transaction = database.transaction(["gallery_db"], "readwrite");
            let objectStore = transaction.objectStore("gallery_db");
            let request = objectStore.add(newPost);

            request.onsuccess = function() {
                author.value = '';
                description.value = '';
            };

            transaction.oncomplete = function() {
                console.log('Transaction completed: database modification finished.');
                db.getData(posts.displayPosts);
            };

            transaction.onerror = function() {
                console.log('Transaction not opened due to error');
            };
        },
        getData(callback) {
                let transaction = database.transaction(["gallery_db"], "readwrite");
                let objectStore = transaction.objectStore("gallery_db");
                let request = objectStore.getAll();
            
                request.onsuccess = function() {
                    callback(request.result);
                }
            
        },
        deleteData(checkedElements) {
            let objectStore = database.transaction(["gallery_db"], "readwrite").objectStore("gallery_db");

            checkedElements.forEach(element => {
                objectStore.openCursor().onsuccess = function(e) {
                    let cursor = e.target.result;

                    if(cursor) {
                        if(element == cursor.value.id) {
                            let request = cursor.delete();

                            request.onsuccess = function () {
                                console.log("Delete is success");
                            };
                        }

                        cursor.continue();
                    }
                }
            });
        },
        filterData(predicate, deleteSelectedPost) {
            let objectStore = database.transaction(["gallery_db"], "readwrite").objectStore("gallery_db");
            let posts = document.querySelectorAll(".gallery__item");
            objectStore.openCursor().onsuccess = function(e) {
                let cursor = e.target.result;
        
                if (cursor) {
                    if (predicate(cursor.value)) {
                        let id = cursor.value.id;
                        deleteSelectedPost(posts, id);
                    }

                    cursor.continue();
                }
            }
        },
        sortByDate(posts) {
            if(posts.date == this) {
                return true;
            } else {
                return false;
            }
        }
    }
})()