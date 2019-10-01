function deletePosts() {
    let posts = document.querySelectorAll(".gallery__item");

    [].forEach.call(posts, post => {
        let checking = post.querySelector(".item-content__checking");
        let objectStore = db.transaction(["gallery_db"], "readwrite").objectStore("gallery_db");

        if(checking.checked) {
            objectStore.openCursor().onsuccess = function(e) {
                let cursor = e.target.result;

                if(cursor) {
                   if(post.id == cursor.value.id) {
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