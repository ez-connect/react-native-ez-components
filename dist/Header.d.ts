import * as React from 'react';
import { IconProps } from 'react-native-elements';
interface Props {
    backgroundColor?: string;
    borderColor?: string;
    height?: number;
    icon: IconProps;
    loadingEnabled?: boolean;
    onBackgroundColor?: string;
    placeholder?: string;
    placeholderTextColor?: string;
    progress?: number;
    rightElement?: React.ReactNode;
    searchable?: boolean;
    searchCancelIcon?: IconProps;
    title?: string;
    onBack?(): void;
    onSearch?(query: string): void;
}
interface State {
    isSearching?: boolean;
    progress?: number;
    text?: string;
}
export declare class Header extends React.PureComponent<Props, State> {
    static debounce(fn: any, wait?: number, immediate?: boolean): () => void;
    private static s_debounceTimeout;
    private _debounceOnSearch;
    private _progressHandler;
    private _isMounted;
    constructor(props: Props);
    setState(value: State): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    collapse(): void;
    expand(): void;
    private _renderTitle;
    private _renderCancelSearchComponent;
    private _handleOnSearch;
    private _handleOnPressBack;
    private _handleOnPressCancelSearch;
    private _handleOnProgressInterval;
}
export {};
