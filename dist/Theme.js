var Theme = (function () {
    function Theme() {
    }
    Theme.prototype.init = function (themes) {
        this.themes = themes;
    };
    Theme.prototype.setTheme = function (name) {
        var item = this.themes.find(function (x) { return x.name === name; });
        Object.assign(this, item);
    };
    Theme.prototype.getAllThemes = function () {
        return this.themes;
    };
    return Theme;
}());
var theme = new Theme();
export default theme;
