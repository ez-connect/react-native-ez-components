import { Component } from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent, ViewStyle } from 'react-native';
export interface AnimatedScrollViewChilrenProps {
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onMomentumScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onMomentumScrollBegin?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onScrollEndDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onScrollBeginDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}
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
