import { FullTheme, ThemeProvider } from 'react-native-elements';
import EventListener from './EventListener';
export declare enum ThemeEvent {
    OnChange = 2
}
declare class Theme extends EventListener<ThemeEvent> {
    protected themeProvider?: ThemeProvider<any>;
    init(provider: ThemeProvider<any>): void;
    setTheme(value: Partial<FullTheme>): void;
    getTheme(): FullTheme;
}
declare const themeStatic: Theme;
export { themeStatic as Theme, };
