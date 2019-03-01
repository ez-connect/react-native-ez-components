import EventListener from './EventListener';
export interface ThemeItem {
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
export declare enum ThemeEvent {
    OnInit = 1,
    OnChange = 2
}
declare class Theme extends EventListener<ThemeEvent> implements ThemeItem {
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
    protected themes: ThemeItem[];
    init(themes: ThemeItem[]): void;
    setTheme(name: string): void;
    getAllThemes(): ThemeItem[];
}
declare const theme: Theme;
export { theme, };
