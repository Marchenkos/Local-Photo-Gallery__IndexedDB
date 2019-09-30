function sortPosts() {
    let condition = document.querySelector(".option__sort--sorting-conditions").value;
    let objectStore = db.transaction(["gallery_db"], "readwrite").objectStore("gallery_db");
    let gallery = document.querySelector(".gallery");
    let posts = document.querySelectorAll(".gallery__item");

    objectStore.openCursor().onsuccess = function(e) {
        let cursor = e.target.result;

        if(cursor) {
            if(String(condition) != String(cursor.value.date)) {
                let id = cursor.value.id;

                [].forEach.call(posts, post => {
                    if(post.id == id) {
                        gallery.removeChild(post);
                    }
                });
            }

            cursor.continue();
        }
    }
}