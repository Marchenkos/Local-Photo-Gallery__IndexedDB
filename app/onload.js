window.onload = function() {
    // let input = document.getElementById("file-upload");
    // menu.add(form.openForm);
    db.createDB(db.getData(posts.displayPosts));
    let addButton = document.querySelector(".gallery-management__button--add-button");
    let openSetOfSortButtons = document.querySelector(".gallery-management__button--sort-button");
    let openSetOfDeleteButtons = document.querySelector(".gallery-management__button--delete-button");
    let openMenuButton = document.querySelector(".header__menu-button");
    let sortButton = document.querySelector(".option__sort--execute");
    let selectButton = document.querySelector(".option__sort--execute");
    let deleteButton = document.querySelector(".option__delete--all");
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
    openMenuButton.addEventListener("clock", menu.openMenu);
    openSetOfSortButtons.addEventListener("click", function () {
        menu.openSetOfSortButtons(menu.openSetOfDeleteButtons);
    });
    openSetOfDeleteButtons.addEventListener("click", function () {
        menu.openSetOfDeleteButtons(menu.openSetOfSortButtons);
    });
    addButton.addEventListener("click", function () {
        menu.add(form.openForm);
    });


    // input.addEventListener("change", updateImageDisplay);
}