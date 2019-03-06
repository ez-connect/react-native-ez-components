import { NavigationContainerComponent } from 'react-navigation';
export declare class NavigationService {
    static setTopLevelNavigator(navigatorRef: NavigationContainerComponent | null): void;
    static navigate(routeName: string, params?: any): void;
    static push(routeName: string, params?: any): void;
    static resetAndPushToTop(routeName: string, params?: any): void;
    static goBack(): void;
    private static _navigator;
    private static _getActiveRouteName;
}
