import {
  NavigationContainerRef,
  StackActions,
  NavigationState,
  PartialState,
  DrawerActions,
} from '@react-navigation/native';

export class NavigationService {
  public static setTopLevelNavigator(
    navigatorRef: React.RefObject<NavigationContainerRef>,
  ) {
    NavigationService._navigator = navigatorRef;
  }

  public static navigate(name: string, params?: object) {
    NavigationService._navigator.current?.navigate(name, params);
  }

  public static push(name: string, params?: object) {
    NavigationService._navigator.current?.dispatch(
      StackActions.push(name, params),
    );
  }

  public static pop(count?: number) {
    NavigationService._navigator.current?.dispatch(StackActions.pop(count));
  }

  public static resetAndPushToTop(state: PartialState<NavigationState>) {
    NavigationService._navigator.current?.reset(state);
  }

  public static goBack() {
    NavigationService._navigator.current?.goBack();
  }

  public static openDrawer() {
    NavigationService._navigator.current?.dispatch(DrawerActions.openDrawer());
  }

  public static closeDrawer() {
    NavigationService._navigator.current?.dispatch(DrawerActions.closeDrawer());
  }

  public static toggleDrawer() {
    NavigationService._navigator.current?.dispatch(
      DrawerActions.toggleDrawer(),
    );
  }

  // public static getPrevRoute(): string {
  //   return this._prevRoute;
  // }

  // public static getCurrentRoute(): string {
  //   return this._currentRoute;
  // }

  // public static handleOnNavigationStateChange(prevState: NavigationState, nextState: NavigationState) {
  //   NavigationService._prevRoute = NavigationService._getActiveRouteName(prevState);
  //   const currentRoute = NavigationService._getActiveRouteName(nextState);
  //   if (this._currentRoute !== currentRoute) {
  //     this._currentRoute = currentRoute;
  //   }
  // }

  ///////////////////////////////////////////////////////////////////

  private static _navigator: React.RefObject<NavigationContainerRef>;
  // private static _prevRoute?: string;
  // private static _currentRoute?: string;

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
