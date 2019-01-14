import { NavigationActions, StackActions } from 'react-navigation';
export class NavigationService {
    static setTopLevelNavigator(navigatorRef) {
        NavigationService.s_navigator = navigatorRef;
    }
    static navigate(routeName, params) {
        NavigationService.s_navigator.dispatch(NavigationActions.navigate({
            routeName,
            params,
        }));
    }
    static push(routeName, params) {
        NavigationService.s_navigator.dispatch(StackActions.push({
            routeName,
            params,
        }));
    }
    static resetAndPushToTop(routeName, params) {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName, params })],
        });
        NavigationService.s_navigator.dispatch(resetAction);
    }
    static goBack() {
        NavigationService.s_navigator.dispatch(NavigationActions.back());
    }
}
