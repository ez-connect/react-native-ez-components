import color from 'color';
import EventListener from './EventListener';
var ThemeEvent;
(function (ThemeEvent) {
    ThemeEvent[ThemeEvent["OnChange"] = 2] = "OnChange";
})(ThemeEvent || (ThemeEvent = {}));
class Theme extends EventListener {
    init(provider) {
        this._themeProvider = provider;
    }
    setTheme(value) {
        this._themeProvider.updateTheme(value);
        super.emit(ThemeEvent.OnChange);
    }
    setThemeItem(value) {
        Object.assign(this, value);
        const { primary, onPrimary, secondary, onSecondary, background, onBackground, onSurface } = value;
        const theme = {
            Badge: {
                badgeStyle: {
                    borderRadius: 24,
                    padding: 12,
                },
                textStyle: {
                    color: onSecondary,
                },
            },
            Button: {
                titleStyle: {
                    color: onPrimary,
                },
            },
            ButtonGroup: {
                buttonStyle: { backgroundColor: background },
                selectedButtonStyle: { backgroundColor: secondary },
                selectedTextStyle: { color: onSecondary },
                textStyle: { color: onBackground, fontSize: 14 },
            },
            Icon: {
                type: this.iconset,
                color: onBackground,
            },
            ListItem: {
                containerStyle: {
                    backgroundColor: 'transparent',
                },
                leftIcon: {
                    color: onBackground,
                },
            },
            Text: {
                style: {
                    color: onBackground,
                },
            },
            colors: {
                primary,
                secondary,
                grey0: color(background).darken(0.8).toString(),
                grey1: color(background).darken(0.6).toString(),
                grey2: color(background).darken(0.4).toString(),
                grey3: color(background).darken(0.8).toString(),
                grey4: color(background).darken(0.6).toString(),
                grey5: color(background).darken(0.4).toString(),
                greyOutline: color(background).darken(0.5).toString(),
                disabled: color(background).darken(0.2).toString(),
                divider: onSurface,
            },
        };
        this.setTheme(theme);
    }
    getTheme() {
        const theme = this._themeProvider
            ? this._themeProvider.getTheme()
            : undefined;
        return theme;
    }
}
const themeStatic = new Theme();
export { themeStatic as Theme, ThemeEvent, };
