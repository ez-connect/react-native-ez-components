/// <reference types="react" />
import { NavigationContainerRef, NavigationState, PartialState } from '@react-navigation/native';
export declare class NavigationService {
    static setTopLevelNavigator(navigatorRef: React.RefObject<NavigationContainerRef>): void;
    static navigate(name: string, params?: object): void;
    static push(name: string, params?: object): void;
    static pop(count?: number): void;
    static resetAndPushToTop(state: PartialState<NavigationState>): void;
    static goBack(): void;
    static openDrawer(): void;
    static closeDrawer(): void;
    static toggleDrawer(): void;
    private static _navigator;
    private static _getActiveRouteName;
}
