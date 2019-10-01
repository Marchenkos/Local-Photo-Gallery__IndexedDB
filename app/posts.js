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

function selectAll() {
    let posts = document.querySelectorAll(".gallery__item");

    [].forEach.call(posts, post => {
        let checking = post.querySelector(".item-content__checking");

        if (checking.checked) {
            checking.checked = false;
        } else {
            checking.checked = true;
        }
    });
}

function showDesciption(id) {
    let parent = document.getElementById(id);
    let picture = parent.querySelector(".item-content__picture");
    let description = parent.querySelector(".item-content__description");

    if (description.style.display == "none") {
        picture.style.opacity = "0.5";
        description.style.display = "block";
    } else {
        picture.style.opacity = "1";
        description.style.display = "none";
    }
}

function sortPosts() {
    let condition = document.querySelector(".option__sort--sorting-conditions").value;
    let objectStore = db.transaction(["gallery_db"], "readwrite").objectStore("gallery_db");
    let gallery = document.querySelector(".gallery");
    let posts = document.querySelectorAll(".gallery__item");

    objectStore.openCursor().onsuccess = function(e) {
        let cursor = e.target.result;

        if(cursor) {
            if(condition != cursor.value.date) {
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