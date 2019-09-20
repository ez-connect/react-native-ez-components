import { NavigationActions, StackActions, } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
export class NavigationService {
    static setTopLevelNavigator(navigatorRef) {
        NavigationService._navigator = navigatorRef;
    }
    static navigate(options) {
        NavigationService._navigator.dispatch(NavigationActions.navigate(options));
    }
    static push(options) {
        NavigationService._navigator.dispatch(StackActions.push(options));
    }
    static resetAndPushToTop(options) {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate(options)],
        });
        NavigationService._navigator.dispatch(resetAction);
    }
    static goBack(options) {
        NavigationService._navigator.dispatch(NavigationActions.back(options));
    }
    static openDrawer() {
        NavigationService._navigator.dispatch(DrawerActions.openDrawer());
    }
    static closeDrawer() {
        NavigationService._navigator.dispatch(DrawerActions.closeDrawer());
    }
    static toggleDrawer() {
        NavigationService._navigator.dispatch(DrawerActions.toggleDrawer());
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
