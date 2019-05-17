import React from 'react';
import { ViewStyle } from 'react-native';
interface Props {
    containerStyle?: ViewStyle;
}
interface State {
    visible?: boolean;
}
interface Options {
    animation?: 'slide-up' | 'slide-down';
    backgroundColor?: string;
    duration?: number;
    useHideAnimation?: boolean;
}
export declare class PopupContainer extends React.PureComponent<Props, State> {
    static setInstance(ref: PopupContainer | null): void;
    static show(children: JSX.Element): void;
    static hide(callback?: () => void): void;
    private static _instance;
    private _anim;
    private _children?;
    private _options?;
    constructor(props: Props);
    render(): JSX.Element;
    show(children: JSX.Element, options?: Options): void;
    hide(callback?: () => void): void;
    private _hide;
    private _handleOnPress;
}
export {};
