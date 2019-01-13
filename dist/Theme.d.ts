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
}
declare class Theme implements ITheme {
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
    protected themes: ITheme[];
    init(themes: ITheme[]): void;
    setTheme(name: string): void;
    getAllThemes(): ITheme[];
}
declare const theme: Theme;
export default theme;
