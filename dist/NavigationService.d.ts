import { NavigationContainerComponent } from 'react-navigation';
export declare class NavigationService {
    static setTopLevelNavigator(navigatorRef: NavigationContainerComponent): void;
    static navigate(routeName: any, params: any): void;
    static push(routeName: any, params: any): void;
    static resetAndPushToTop(routeName: any, params: any): void;
    static goBack(): void;
    private static s_navigator;
}
