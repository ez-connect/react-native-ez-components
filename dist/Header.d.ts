import * as React from 'react';
import { IconProps } from 'react-native-elements';
export interface HeaderProps {
    height?: number;
    icon?: IconProps;
    loadingEnabled?: boolean;
    placeholder?: string;
    rightElement?: React.ReactNode;
    searchable?: boolean;
    searchCancelIcon?: IconProps;
    searchIcon?: IconProps;
    title?: string;
    onBack?(): void;
    onSearch?(query: string): void;
}
export interface HeaderState {
    loading?: number;
    isSearching?: boolean;
}
export declare class Header extends React.PureComponent<HeaderProps, HeaderState> {
    static debounce(fn: any, wait?: number, immediate?: boolean): () => void;
    private static s_debounceTimeout;
    private _debounceOnSearch;
    constructor(props: HeaderProps);
    render(): JSX.Element;
    collapse(): void;
    expand(): void;
    private _renderTitle;
    private _renderSearchComponent;
    private _search;
    private _handleOnPressBack;
    private _handleOnPressSearch;
}
