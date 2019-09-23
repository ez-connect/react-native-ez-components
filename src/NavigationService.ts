import {
  NavigationActions, NavigationBackActionPayload, NavigationContainerComponent,
  NavigationNavigateActionPayload, NavigationPopActionPayload,
  NavigationPushActionPayload, StackActions,
} from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';

export class NavigationService {
  public static setTopLevelNavigator(navigatorRef: NavigationContainerComponent | null) {
    NavigationService._navigator = navigatorRef;
  }

  public static navigate(options: NavigationNavigateActionPayload) {
    NavigationService._navigator.dispatch(NavigationActions.navigate(options));
  }

  public static push(options: NavigationPushActionPayload) {
    NavigationService._navigator.dispatch(
      StackActions.push(options),
    );
  }

  public static pop(options?: NavigationPopActionPayload) {
    if (!options) {
      options = { n: 1, immediate: true };
    }

    NavigationService._navigator.dispatch(
      StackActions.pop(options),
    );
  }

  public static resetAndPushToTop(options: NavigationNavigateActionPayload) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate(options)],
    });
    NavigationService._navigator.dispatch(resetAction);
  }

  public static goBack(options?: NavigationBackActionPayload) {
    NavigationService._navigator.dispatch(NavigationActions.back(options));
  }

  public static openDrawer() {
    NavigationService._navigator.dispatch(DrawerActions.openDrawer());
  }

  public static closeDrawer() {
    NavigationService._navigator.dispatch(DrawerActions.closeDrawer());
  }

  public static toggleDrawer() {
    NavigationService._navigator.dispatch(DrawerActions.toggleDrawer());
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

  private static _navigator: NavigationContainerComponent;
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
