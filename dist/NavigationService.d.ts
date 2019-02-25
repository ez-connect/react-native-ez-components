import { NavigationContainerComponent } from 'react-navigation';
export declare class NavigationService {
    static setTopLevelNavigator(navigatorRef: NavigationContainerComponent): void;
    static navigate(routeName: string, params?: any): void;
    static push(routeName: string, params?: any): void;
    static resetAndPushToTop(routeName: string, params?: any): void;
    static goBack(): void;
    private static s_navigator;
}
