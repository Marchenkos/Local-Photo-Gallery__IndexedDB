window.onload = function() {
    db.getData(posts.displayPosts);

    let input = document.getElementById("file-upload");
    let addButton = document.querySelector(".gallery-management__button--add-button");
    let openSetOfSortButtons = document.querySelector(".gallery-management__button--sort-button");
    let openSetOfDeleteButtons = document.querySelector(".gallery-management__button--delete-button");
    let openMenuButton = document.querySelector(".header__menu-button");
    let sortButton = document.querySelector(".option__sort--execute");
    let selectButton = document.querySelector(".option__delete--selected");
    let deleteButton = document.querySelector(".option__delete--all");
    let closeForm = document.querySelector(".add-form__close-button");
    let formForAdd = document.querySelector(".add-form");
    formForAdd.addEventListener("submit", function() {
        db.addData();
        db.getData(posts.displayPosts);
    }, false); 

    input.addEventListener("change", form.updatePreviewField);
    closeForm.addEventListener("click", form.closeForm);

    deleteButton.addEventListener("click", function() {
        menu.delete(posts.getSelected, db.deleteData);
        db.getData(posts.displayPosts);
    });
    selectButton.addEventListener("click", function() {
        menu.select(posts.selectAll);
    });
    sortButton.addEventListener("click", function() {
        menu.sort(db.sortData);
    })
    openMenuButton.addEventListener("click", menu.openMenu);
    openSetOfSortButtons.addEventListener("click", function () {
        menu.openSetOfSortButtons(menu.openSetOfDeleteButtons);
    });
    openSetOfDeleteButtons.addEventListener("click", function () {
        menu.openSetOfDeleteButtons(menu.openSetOfSortButtons);
    });
    addButton.addEventListener("click", function () {
        menu.add(form.openForm);
    });
}