import EventListener from './EventListener';
interface ITheme {
    name: string;
    primary: string;
    primaryLight: string;
    primaryDark: string;
    primaryText: string;
    secondary: string;
    secondaryLight: string;
    secondaryDark: string;
    secondaryText: string;
    background: string;
    backgroundText: string;
    surface: string;
    surfaceText: string;
    transparent?: string;
}
declare enum ThemeEvent {
    OnInit = 1,
    OnChange = 2
}
declare class Theme extends EventListener implements ITheme {
    name: string;
    primary: string;
    primaryLight: string;
    primaryDark: string;
    primaryText: string;
    secondary: string;
    secondaryLight: string;
    secondaryDark: string;
    secondaryText: string;
    background: string;
    backgroundText: string;
    surface: string;
    surfaceText: string;
    transparent?: string;
    protected themes: ITheme[];
    init(themes: ITheme[]): void;
    setTheme(name: string): void;
    getAllThemes(): ITheme[];
}
declare const theme: Theme;
export { theme, ITheme, ThemeEvent, };
