import { NavigationActions, NavigationContainerComponent, StackActions } from 'react-navigation';

export class NavigationService {
  public static setTopLevelNavigator(navigatorRef: NavigationContainerComponent) {
    NavigationService.s_navigator = navigatorRef;
  }

  public static navigate(routeName, params) {
    NavigationService.s_navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      })
    );
  }

  public static push(routeName, params) {
    NavigationService.s_navigator.dispatch(
      StackActions.push({
        routeName,
        params,
      })
    );
  }

  public static resetAndPushToTop(routeName, params) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName, params })],
    });
    NavigationService.s_navigator.dispatch(resetAction);
  }

  public static goBack() {
    NavigationService.s_navigator.dispatch(NavigationActions.back());
  }

  // tslint:disable-next-line:variable-name
  private static s_navigator: NavigationContainerComponent;
}
