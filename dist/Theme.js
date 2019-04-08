import EventListener from './EventListener';
export var ThemeEvent;
(function (ThemeEvent) {
    ThemeEvent[ThemeEvent["OnInit"] = 1] = "OnInit";
    ThemeEvent[ThemeEvent["OnChange"] = 2] = "OnChange";
})(ThemeEvent || (ThemeEvent = {}));
class SingletonTheme extends EventListener {
    constructor() {
        super(...arguments);
        this.iconType = 'material';
    }
    init(themes) {
        this.transparent = 'transparent';
        this.themes = themes;
        super.emit(ThemeEvent.OnInit);
    }
    setTheme(name) {
        const item = this.themes.find((x) => x.name === name);
        Object.assign(this, item);
        super.emit(ThemeEvent.OnChange, name);
    }
    getAllThemes() {
        return this.themes;
    }
    setDefaultIconSet(value) {
        this.iconType = value;
    }
}
const Theme = new SingletonTheme();
export { Theme, };
