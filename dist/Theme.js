class Theme {
    init(themes) {
        this.themes = themes;
    }
    setTheme(name) {
        const item = this.themes.find((x) => x.name === name);
        Object.assign(this, item);
    }
    getAllThemes() {
        return this.themes;
    }
}
const theme = new Theme();
export default theme;
