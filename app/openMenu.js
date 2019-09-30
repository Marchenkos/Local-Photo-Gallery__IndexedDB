function openMenu() {
    let menu = document.querySelector(".header__editing");

    if (menu.style.display == "none") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}