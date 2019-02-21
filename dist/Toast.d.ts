import * as React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
export declare enum ToastType {
    Info = 1,
    Warning = 2,
    Error = 3
}
export interface IToastItem {
    title?: string;
    message: string;
    type?: ToastType;
    delay?: number;
    timeout?: number;
    dismiss?: string;
    onDismiss?(): void;
}
export interface IToastProps {
    containerStyle?: ViewStyle;
    itemStyle?: ViewStyle;
    titleStyle?: TextStyle;
    messageStyle?: TextStyle;
}
export interface IToastState {
    items: IToastItem[];
}
export declare class Toast extends React.Component<IToastProps, IToastState> {
    static setInstance(ref: Toast | null): void;
    static show(item: IToastItem): void;
    private static _instance;
    private _intervalHandler;
    constructor(props: any);
    render(): JSX.Element;
    show(item: IToastItem): void;
    private _renderItems;
    private _renderItem;
    private _removeItem;
    private _handleCheckTimeout;
    private _handleOnDismiss;
}
