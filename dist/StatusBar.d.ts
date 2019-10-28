import * as React from 'react';
import { StatusBarProps as BProps } from 'react-native';
export interface StatusBarProps extends BProps {
    backgroundColor?: string;
    height: number;
    isIphoneX: boolean;
}
export interface StatusBarState {
    hidden: boolean;
}
export declare class StatusBar extends React.PureComponent<StatusBarProps, StatusBarState> {
    static setInstance(ref: StatusBar | null): void;
    static setHidden(hidden: boolean): void;
    private static _instance;
    constructor(props: StatusBarProps);
    render(): JSX.Element;
}
