import * as React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
export declare enum ToastType {
    Info = 1,
    Warning = 2,
    Error = 3
}
export declare enum ToastDuration {
    Short = 1000,
    Length = 3000,
    Forever = -1
}
interface ToastItem {
    title?: string;
    message: string;
    type?: ToastType;
    timeout?: number;
    duration?: ToastDuration | number;
    action?: {
        title: string;
        color?: string;
        onPress?: () => void;
    };
}
interface ToastProps {
    containerStyle?: ViewStyle;
    itemStyle?: ViewStyle;
    titleStyle?: TextStyle;
    messageStyle?: TextStyle;
}
interface ToastState {
    item?: ToastItem;
}
export declare class Toast extends React.Component<ToastProps, ToastState> {
    static setInstance(ref: Toast | null): void;
    static show(item: ToastItem): void;
    private static _instance;
    private _timeoutHandler;
    private _anim;
    constructor(props: any);
    render(): JSX.Element;
    show(item: ToastItem): void;
    private _renderItem;
    private _renderItemAction;
    private _show;
    private _hide;
    private _add;
    private _remove;
    private _handleOnTimeout;
    private _handleOnPress;
    private _handleOnAction;
}
export {};
