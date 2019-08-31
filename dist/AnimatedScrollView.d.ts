import { Component } from 'react';
import { Animated, ScrollViewProps } from 'react-native';
interface Props extends ScrollViewProps {
    header: JSX.Element;
    range: number;
}
interface State {
    scrollAnim: Animated.Value;
    offsetAnim: Animated.Value;
}
export declare class AnimatedScrollView extends Component<Props, State> {
    private _previousScrollvalue;
    private _currentScrollValue;
    private _scrollEndTimer?;
    private _scrollAnimEvent?;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private _handleScroll;
    private _handleScrollEndDrag;
    private _handleMomentumScrollBegin;
    private _handleMomentumScrollEnd;
}
export {};
