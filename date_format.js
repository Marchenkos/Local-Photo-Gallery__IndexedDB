Date.prototype.toShortFormat = function() {
    let day = this.getDate();
    let month = this.getMonth() + 1;
    let year = this.getFullYear();
    
    return "" + year + "-0" + month + "-" + day;
}