function openSetOfButtons() {
    let set = document.querySelector(".gallery-management__delete-options");
    let checkboxes = document.querySelectorAll(".item__checking");
    let deleteButton = document.querySelector(".gallery-management__button--delete-button");

    if (set.style.display == "none") {
        [].forEach.call(checkboxes, checkboxe => {
            checkboxe.style.display = "block";
        });
        deleteButton.classList.remove("icon-bin");
        deleteButton.classList.add("icon-arrow-right");
        set.style.display = "block";
    } else {
        [].forEach.call(checkboxes, checkboxe => {
            checkboxe.style.display = "none";
        });
        deleteButton.classList.add("icon-bin");
        deleteButton.classList.remove("icon-arrow-right");
        set.style.display = "none";
    }
}