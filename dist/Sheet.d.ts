import * as React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
export interface SheetItem {
    disabled?: boolean;
    icon?: string;
    subtitle?: string;
    title?: string;
    value?: any;
}
interface Props {
    animation?: 'none' | 'fade' | 'slide';
    position?: 'top' | 'bottom';
    bottomDivider?: boolean;
    containerStyle?: ViewStyle;
    items?: SheetItem[];
    itemsStyle?: ViewStyle;
    itemStyle?: ViewStyle;
    title?: string;
    titleStyle?: TextStyle;
    component?: JSX.Element;
    onSelect?: (value: any) => void;
}
interface State {
    props?: Props;
    visible: boolean;
}
export declare class Sheet extends React.PureComponent<{}, State> {
    static setInstance(value: Sheet | null): void;
    static open(props: Props): void;
    private static _instance;
    state: State;
    private _anim;
    private _backHandler?;
    componentDidMount(): void;
    componentWillUnmount(): void;
    open(props: Props): void;
    close: () => void;
    render(): JSX.Element;
    private _renderItems;
    private _renderItem;
    private _handleOnPressItem;
    private _handleOnBackPress;
}
export {};
