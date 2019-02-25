import * as React from 'react';
import { IconProps } from 'react-native-elements';
export interface HeaderProps {
    icon?: IconProps;
    height?: number;
    title?: string;
    searchable?: boolean;
    placeholder?: string;
    rightComponent?: React.Component;
    loadingEnabled?: boolean;
    onSearch?(): void;
    onBack?(): void;
}
export interface HeaderState {
    loading?: number;
    isSearching?: boolean;
}
export declare class Header extends React.PureComponent<HeaderProps, HeaderState> {
    static debounce(fn: any, wait?: number, immediate?: boolean): () => void;
    private static s_debounceTimeout;
    private _debounceOnSearch;
    private _animated;
    constructor(props: HeaderProps);
    componentWillUnmount(): void;
    render(): JSX.Element;
    private _renderTitle;
    private _renderSearchComponent;
    private _renderLoading;
    private _search;
    private _handleAnimated;
    private _handleOnPressBack;
    private _handleOnPressSearch;
}
