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