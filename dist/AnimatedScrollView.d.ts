import { Component } from 'react';
import { Animated, ScrollViewProps, ViewStyle } from 'react-native';
interface Props extends ScrollViewProps {
    header: JSX.Element;
    headerHeight: number;
    style?: ViewStyle;
}
interface State {
    scrollAnim: Animated.Value;
    offsetAnim: Animated.Value;
}
export declare class AnimatedScrollView extends Component<Props, State> {
    state: State;
    private _previousScrollvalue;
    private _currentScrollValue;
    private _scrollEndTimer?;
    private _scrollAnimEvent?;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private _handleScroll;
    private _handleScrollEndDrag;
    private _handleMomentumScrollBegin;
    private _handleMomentumScrollEnd;
}
export {};
