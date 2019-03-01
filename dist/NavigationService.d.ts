import { NavigationAction, NavigationContainerComponent, NavigationState } from 'react-navigation';
export declare class NavigationService {
    static setTopLevelNavigator(navigatorRef: NavigationContainerComponent | null): void;
    static navigate(routeName: string, params?: any): void;
    static push(routeName: string, params?: any): void;
    static resetAndPushToTop(routeName: string, params?: any): void;
    static goBack(): void;
    static getPrevRoute(): string;
    static getCurrentRoute(): string;
    static handleOnNavigationStateChange(prevState: NavigationState, currentState: NavigationState, action: NavigationAction): void;
    private static _navigator;
    private static _prevRoute?;
    private static _currentRoute?;
    private static _getActiveRouteName;
}
