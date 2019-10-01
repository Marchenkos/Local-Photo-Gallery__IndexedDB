function openSetOfDeleteButtons(){
    let sortOptions = document.querySelector(".gallery-management__sort-options");
    let options = document.querySelector(".gallery-management__delete-options");
    let checkboxes = document.querySelectorAll(".item-content__checking");
    let deleteButton = document.querySelector(".gallery-management__button--delete-button");

    if (options.style.display == "none") {
        [].forEach.call(checkboxes, checkboxe => {
            checkboxe.style.display = "block";
        });

        if (sortOptions.style.display != "none") {
            openSetOfSortButtons();
        }

        deleteButton.classList.remove("icon-bin");
        deleteButton.style.marginRight = "0px";
        deleteButton.classList.add("icon-arrow-right");
        options.style.display = "flex";
        options.style.alignItems = "flex-end";
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
    let deletePptions = document.querySelector(".gallery-management__delete-options");
    let options = document.querySelector(".gallery-management__sort-options");
    let sortButton = document.querySelector(".gallery-management__button--sort-button");

    if (options.style.display == "none") {
        options.style.display = "flex";

        if (deletePptions.style.display != "none") {
            openSetOfDeleteButtons();
        }

        options.style.alignItems = "flex-end";
        sortButton.classList.remove("icon-calendar");
        sortButton.style.marginRight = "0px";
        sortButton.classList.add("icon-arrow-right");
    } else {
        options.style.display = "none";
        sortButton.classList.add("icon-calendar");
        sortButton.style.marginRight = "15px";
        sortButton.classList.remove("icon-arrow-right");
    }
}