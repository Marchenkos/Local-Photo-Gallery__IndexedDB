Date.prototype.toShortFormat = function() {
    let day = this.getDate();
    let month = this.getMonth() + 1;
    let year = this.getFullYear();

    if (day < 10) {
        day = "0" + day;
    }

    if (month < 10) {
        month = "0" + month;
    }

    return "" + year + "-" + month + "-" + day;
}