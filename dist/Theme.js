import EventListener from './EventListener';
export var ThemeEvent;
(function (ThemeEvent) {
    ThemeEvent[ThemeEvent["OnChange"] = 2] = "OnChange";
})(ThemeEvent || (ThemeEvent = {}));
class Theme extends EventListener {
    init(provider) {
        this.themeProvider = provider;
    }
    setTheme(value) {
        this.themeProvider.updateTheme(value);
        super.emit(ThemeEvent.OnChange);
    }
    getTheme() {
        return this.themeProvider.getTheme();
    }
}
const themeStatic = new Theme();
export { themeStatic as Theme, };
