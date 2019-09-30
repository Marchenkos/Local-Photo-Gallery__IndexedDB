function openSetOfDeleteButtons(){
    let options = document.querySelector(".gallery-management__delete-options");
    let checkboxes = document.querySelectorAll(".item__checking");
    let deleteButton = document.querySelector(".gallery-management__button--delete-button");

    if (options.style.display == "none") {
        [].forEach.call(checkboxes, checkboxe => {
            checkboxe.style.display = "block";
        });
        deleteButton.classList.remove("icon-bin");
        deleteButton.classList.add("icon-arrow-right");
        options.style.display = "flex";
    } else {
        [].forEach.call(checkboxes, checkboxe => {
            checkboxe.style.display = "none";
        });
        deleteButton.classList.add("icon-bin");
        deleteButton.classList.remove("icon-arrow-right");
        options.style.display = "none";
    }
}

function openSetOfSortButtons() {
    let options = document.querySelector(".gallery-management__sort-options");
    let sortButton = document.querySelector(".gallery-management__button--sort-button");

    if (options.style.display == "none") {
        options.style.display = "flex";
        sortButton.classList.remove("icon-calendar");
        sortButton.classList.add("icon-arrow-right");
    } else {
        options.style.display = "none";
        sortButton.classList.add("icon-calendar");
        sortButton.classList.remove("icon-arrow-right");
    }
}