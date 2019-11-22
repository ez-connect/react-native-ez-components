import * as React from 'react';
import { IconProps } from 'react-native-elements';
interface Props {
    backgroundColor?: string;
    borderColor?: string;
    clearIcon?: IconProps;
    height?: number;
    icon?: IconProps;
    loadingEnabled?: boolean;
    onBackgroundColor?: string;
    placeholder?: string;
    placeholderTextColor?: string;
    progress?: number;
    rightElement?: React.ReactNode;
    searchEnabled?: boolean;
    searchIcon?: IconProps;
    title?: string;
    onPressIcon?(): void;
    onSearch?(query: string): void;
}
interface State {
    progress?: number;
    searchEnabled?: boolean;
    text?: string;
}
export declare class Header extends React.PureComponent<Props, State> {
    private _progressHandler;
    private _isMounted;
    private _input;
    private _lastSearchAt;
    constructor(props: Props);
    setState(value: State): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private _renderIcon;
    private _renderTitle;
    private _renderRightComponent;
    private _renderSearchComponent;
    private _handleOnPressSearch;
    private _handleOnPressClear;
    private _handleOnSearch;
    private _handleOnPressIcon;
    private _handleOnProgressInterval;
}
export {};
