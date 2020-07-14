import { StackActions, DrawerActions, } from '@react-navigation/native';
export class NavigationService {
    static setTopLevelNavigator(navigatorRef) {
        NavigationService._navigator = navigatorRef;
    }
    static navigate(name, params) {
        NavigationService._navigator.current?.navigate(name, params);
    }
    static push(name, params) {
        NavigationService._navigator.current?.dispatch(StackActions.push(name, params));
    }
    static pop(count) {
        NavigationService._navigator.current?.dispatch(StackActions.pop(count));
    }
    static resetAndPushToTop(state) {
        NavigationService._navigator.current?.reset(state);
    }
    static goBack() {
        NavigationService._navigator.current?.goBack();
    }
    static openDrawer() {
        NavigationService._navigator.current?.dispatch(DrawerActions.openDrawer());
    }
    static closeDrawer() {
        NavigationService._navigator.current?.dispatch(DrawerActions.closeDrawer());
    }
    static toggleDrawer() {
        NavigationService._navigator.current?.dispatch(DrawerActions.toggleDrawer());
    }
    static _getActiveRouteName(navigationState) {
        if (!navigationState) {
            return null;
        }
        const route = navigationState.routes[navigationState.index];
        if (route.routes) {
            return NavigationService._getActiveRouteName(route);
        }
        return route.routeName;
    }
}
