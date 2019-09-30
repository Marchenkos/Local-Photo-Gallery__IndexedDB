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