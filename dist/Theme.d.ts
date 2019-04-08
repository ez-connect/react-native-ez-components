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
declare type IconType = 'antdesign' | 'entypo' | 'evilicon' | 'feather' | 'font-awesome' | 'foundation' | 'ionicon' | 'material' | 'material-community' | 'octicon' | 'simple-line-icon' | 'zocial';
declare class SingletonTheme extends EventListener<ThemeEvent> implements ThemeItem {
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
    iconType: IconType;
    protected themes: ThemeItem[];
    init(themes: ThemeItem[]): void;
    setTheme(name: string): void;
    getAllThemes(): ThemeItem[];
    setDefaultIconSet(value: IconType): void;
}
declare const Theme: SingletonTheme;
export { Theme, };
