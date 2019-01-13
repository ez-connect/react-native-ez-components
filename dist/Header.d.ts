import * as React from 'react';
import { IconProps } from '../node_modules/react-native-elements/src/index';
export interface IHeaderProps {
    ready: boolean;
    icon?: IconProps;
    height?: number;
    title?: string;
    searchable?: boolean;
    placeholder?: string;
    searchComponent?: React.Component;
    rightComponent?: React.Component;
    onSearch?(): void;
    onBack?(): void;
}
export interface IHeaderState {
    ready?: boolean;
    loading?: number;
    isSearching?: boolean;
}
export declare class Header extends React.PureComponent<IHeaderProps, IHeaderState> {
    static debounce(fn: any, wait?: number, immediate?: boolean): () => void;
    private static s_debounceTimeout;
    private _debounceOnSearch;
    private _animated;
    constructor(props: IHeaderProps);
    componentWillUnmount(): void;
    render(): JSX.Element;
    private _renderTitle;
    private _renderSearchComponent;
    private _renderLoading;
    private _handleAnimated;
    private _handleOnPressBack;
    private _handleOnPressSearch;
    private _search;
}
