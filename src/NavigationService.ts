import { NavigationAction, NavigationActions, NavigationContainerComponent, NavigationState, StackActions } from 'react-navigation';

export class NavigationService {
  public static setTopLevelNavigator(navigatorRef: NavigationContainerComponent | null) {
    NavigationService._navigator = navigatorRef;
  }

  public static navigate(routeName: string, params?: any) {
    NavigationService._navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    );
  }

  public static push(routeName: string, params?: any) {
    NavigationService._navigator.dispatch(
      StackActions.push({
        routeName,
        params,
      }),
    );
  }

  public static resetAndPushToTop(routeName: string, params?: any) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName, params })],
    });
    NavigationService._navigator.dispatch(resetAction);
  }

  public static goBack() {
    NavigationService._navigator.dispatch(NavigationActions.back());
  }

  public static getPrevRoute(): string {
    return this._prevRoute;
  }

  public static getCurrentRoute(): string {
    return this._currentRoute;
  }

  public static handleOnNavigationStateChange(prevState: NavigationState, currentState: NavigationState, action: NavigationAction) {
    NavigationService._prevRoute = NavigationService._getActiveRouteName(prevState);
    NavigationService._currentRoute = NavigationService._getActiveRouteName(currentState);
  }

  ///////////////////////////////////////////////////////////////////

  private static _navigator: NavigationContainerComponent;
  private static _prevRoute?: string;
  private static _currentRoute?: string;

  // Gets the current screen from navigation state
  // https://reactnavigation.org/docs/en/screen-tracking.html#listening-to-state-changes
  private static _getActiveRouteName(navigationState /*: NavigationState */) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return NavigationService._getActiveRouteName(route);
    }
    return route.routeName;
  }
}
