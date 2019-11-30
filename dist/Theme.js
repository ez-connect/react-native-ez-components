import color from 'color';
import { EventListener } from './EventListener';
import { TouchableFeedback } from './TouchableFeedback';
var ThemeEvent;
(function (ThemeEvent) {
    ThemeEvent[ThemeEvent["OnChange"] = 2] = "OnChange";
})(ThemeEvent || (ThemeEvent = {}));
class Theme extends EventListener {
    init(provider) {
        this._themeProvider = provider;
    }
    setTheme(value) {
        if (this._themeProvider) {
            this._themeProvider.updateTheme(value);
            super.emit(ThemeEvent.OnChange);
        }
    }
    setThemeItem(value) {
        Object.assign(this, value);
        const { primary, onPrimary, secondary, onSecondary, background, onBackground, surface, onSurface } = value;
        const theme = {
            Badge: {
                badgeStyle: {
                    backgroundColor: surface,
                    borderRadius: 24,
                    borderWidth: 0,
                    padding: 12,
                },
                textStyle: { color: onBackground, height: 16 },
            },
            Button: {
                titleStyle: { color: onPrimary, fontSize: 14 },
                TouchableComponent: TouchableFeedback,
            },
            ButtonGroup: {
                buttonStyle: { backgroundColor: background },
                containerStyle: { height: 32 },
                innerBorderStyle: { width: 0 },
                selectedButtonStyle: { backgroundColor: secondary },
                selectedTextStyle: { color: onSecondary, fontSize: 14 },
                textStyle: { color: onBackground, fontSize: 14 },
            },
            CheckBox: {
                containerStyle: { backgroundColor: background, borderWidth: 0 },
                textStyle: { color: onBackground, fontWeight: 'normal' },
            },
            Divider: {
                style: { backgroundColor: surface },
            },
            Icon: {
                type: this.iconset,
                color: onBackground,
            },
            Input: {
                containerStyle: { paddingBottom: 12 },
                inputStyle: { color: onBackground },
                labelStyle: { fontSize: 14, fontWeight: 'normal' },
            },
            ListItem: {
                Component: TouchableFeedback,
                containerStyle: { backgroundColor: 'transparent' },
                leftIcon: { color: onBackground },
                rightTitleStyle: { color: onBackground },
                subtitleStyle: { color: onSurface },
                titleStyle: { color: onBackground },
            },
            Text: {
                style: { color: onBackground },
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
