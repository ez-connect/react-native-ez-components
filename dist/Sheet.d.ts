import * as React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
export interface SheetItem {
    disabled?: boolean;
    icon?: string;
    subtitle?: string;
    title?: string;
    value?: any;
}
interface Options {
    animation?: 'none' | 'fade' | 'slide';
    bottomDivider?: boolean;
    containerStyle?: ViewStyle;
    itemsStyle?: ViewStyle;
    itemStyle?: ViewStyle;
    position?: 'top' | 'bottom';
    titleStyle?: TextStyle;
}
interface State {
    items: SheetItem[];
    title?: string;
    visible: boolean;
}
export declare class Sheet extends React.PureComponent<{}, State> {
    static setInstance(value: Sheet | null): void;
    static open(items: SheetItem[], onSelectHandler?: (value: any) => void, title?: string, options?: Options): void;
    private static _instance;
    state: State;
    private _anim;
    private _onSelectHandler?;
    private _options?;
    private _backHandler?;
    componentDidMount(): void;
    componentWillUnmount(): void;
    open(items: SheetItem[], onSelectHandler?: (value: any) => void, title?: string, option?: Options): void;
    close: () => void;
    render(): JSX.Element;
    private _renderItems;
    private _handleOnPressItem;
    private _handleOnBackPress;
}
export {};
