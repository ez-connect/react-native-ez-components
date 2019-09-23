import { NavigationBackActionPayload, NavigationContainerComponent, NavigationNavigateActionPayload, NavigationPopActionPayload, NavigationPushActionPayload } from 'react-navigation';
export declare class NavigationService {
    static setTopLevelNavigator(navigatorRef: NavigationContainerComponent | null): void;
    static navigate(options: NavigationNavigateActionPayload): void;
    static push(options: NavigationPushActionPayload): void;
    static pop(options?: NavigationPopActionPayload): void;
    static resetAndPushToTop(options: NavigationNavigateActionPayload): void;
    static goBack(options?: NavigationBackActionPayload): void;
    static openDrawer(): void;
    static closeDrawer(): void;
    static toggleDrawer(): void;
    private static _navigator;
    private static _getActiveRouteName;
}
