import * as React from 'react';
import { StatusBarProps as BProps } from 'react-native';
export interface StatusBarProps extends BProps {
    height: number;
    isIphoneX: boolean;
}
export interface StatusBarState {
    hidden: boolean;
}
export declare class StatusBar extends React.PureComponent<StatusBarProps, StatusBarState> {
    static setInstance(ref: StatusBar): void;
    static setHidden(hidden: boolean): void;
    private static s_instance;
    constructor(props: StatusBarProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private _handleOnThemeChange;
}
