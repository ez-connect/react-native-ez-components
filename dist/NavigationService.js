import { NavigationActions, StackActions } from 'react-navigation';
export class NavigationService {
    static setTopLevelNavigator(navigatorRef) {
        NavigationService._navigator = navigatorRef;
    }
    static navigate(routeName, params) {
        NavigationService._navigator.dispatch(NavigationActions.navigate({
            routeName,
            params,
        }));
    }
    static push(routeName, params) {
        NavigationService._navigator.dispatch(StackActions.push({
            routeName,
            params,
        }));
    }
    static resetAndPushToTop(routeName, params) {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName, params })],
        });
        NavigationService._navigator.dispatch(resetAction);
    }
    static goBack() {
        console.warn(NavigationActions.back());
        NavigationService._navigator.dispatch(NavigationActions.back());
    }
    static getPrevRoute() {
        return this._prevRoute;
    }
    static getCurrentRoute() {
        return this._currentRoute;
    }
    static handleOnNavigationStateChange(prevState, currentState, action) {
        NavigationService._prevRoute = NavigationService._getActiveRouteName(prevState);
        NavigationService._currentRoute = NavigationService._getActiveRouteName(currentState);
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
