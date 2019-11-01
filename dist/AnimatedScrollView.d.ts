import { Component } from 'react';
import { Animated, ViewStyle } from 'react-native';
interface Props {
    headerComponent: JSX.Element;
    headerHeight: number;
    style?: ViewStyle;
    children: JSX.Element;
}
interface State {
    offsetAnim: Animated.Value;
    scrollAnim: Animated.Value;
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
    private _renderScrollView;
    private _handleScroll;
    private _handleScrollEndDrag;
    private _handleMomentumScrollBegin;
    private _handleMomentumScrollEnd;
}
export {};
