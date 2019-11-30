import { FullTheme, ThemeProvider } from 'react-native-elements';
import { EventListener } from './EventListener';
interface ThemeItem {
    name: string;
    primary: string;
    primaryDark?: string;
    primaryLight?: string;
    onPrimary: string;
    secondary: string;
    secondaryDark?: string;
    secondaryLight?: string;
    onSecondary: string;
    background: string;
    onBackground: string;
    surface: string;
    onSurface: string;
    iconset?: string;
}
declare enum ThemeEvent {
    OnChange = 2
}
declare class Theme extends EventListener<ThemeEvent> implements ThemeItem {
    name: string;
    primary: string;
    primaryDark?: string;
    primaryLight: string;
    onPrimary: string;
    secondary: string;
    secondaryDark?: string;
    secondaryLight?: string;
    onSecondary: string;
    background: string;
    onBackground: string;
    surface: string;
    onSurface: string;
    iconset?: string;
    private _themeProvider?;
    init(provider: ThemeProvider<any>): void;
    setTheme(value: Partial<FullTheme>): void;
    setThemeItem(value: ThemeItem): void;
    getTheme(): FullTheme | undefined;
}
declare const themeStatic: Theme;
export { themeStatic as Theme, ThemeEvent, ThemeItem, };
