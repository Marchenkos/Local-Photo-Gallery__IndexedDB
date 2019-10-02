window.posts = (function () {
    let gallery = document.getElementsByClassName("gallery")[0];

    return {
        clearDisplay() {
            while(gallery.firstChild) {
                gallery.removeChild(gallery.firstChild);
            }
        },
        selectAll() {
            let posts = document.querySelectorAll(".gallery__item");
        
            [].forEach.call(posts, post => {
                let checking = post.querySelector(".item-content__checking");
        
                if (checking.checked) {
                    checking.checked = false;
                } else {
                    checking.checked = true;
                }
            });
        },
        getSelected() {
            let posts = document.querySelectorAll(".gallery__item");
            let checkedPosts = [];
        
            [].forEach.call(posts, post => {
                let checking = post.querySelector(".item-content__checking");
                
                if(checking.checked) {
                    checkedPosts.push(post.id);
                }
            });
        
            return checkedPosts;
        },
        displayPosts(allData) {
            clearDisplay();
        
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
        },
        showDesciption(id) {
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
    }
})()
