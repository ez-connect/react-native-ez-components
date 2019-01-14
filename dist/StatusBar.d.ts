import * as React from 'react';
import { StatusBarProps } from 'react-native';
export interface IStatusBarProps extends StatusBarProps {
    height: number;
    isIphoneX: boolean;
}
export interface IStatusBarState {
    hidden: boolean;
}
export declare class StatusBar extends React.PureComponent<IStatusBarProps, IStatusBarState> {
    static setInstance(ref: StatusBar): void;
    static setHidden(hidden: boolean): void;
    private static s_instance;
    constructor(props: IStatusBarProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private _handleOnThemeChange;
}
