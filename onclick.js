function showDesciption(id) {
    let parent = document.getElementById(id);
    let picture = parent.getElementsByClassName("item__picture")[0];
    let description = parent.getElementsByClassName("item__description")[0];

    if (description.style.display == "none") {
        picture.style.opacity = "0.5";
        description.style.display = "block";
    } else {
        picture.style.opacity = "1";
        description.style.display = "none";
    }
}

function addPost() {
    let form = document.querySelector(".main__list-editing");
    form.style.display = "block";
}
function closeForm() {
    let form = document.querySelector(".main__list-editing");
    form.style.display = "none";
}