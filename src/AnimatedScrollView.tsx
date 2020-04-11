// https://snack.expo.io/B1v5RS7ix
// https://github.com/fengliu222/react-native-swipe-hidden-header

import React, { Component } from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View, ViewStyle } from 'react-native';

export interface AnimatedScrollViewChilrenProps {
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onMomentumScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onMomentumScrollBegin?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onScrollEndDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onScrollBeginDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

interface Props {
  headerComponent: JSX.Element; // auto hide when reach to range
  headerHeight: number;
  style?: ViewStyle;

  children: JSX.Element;
}

interface State {
  offsetAnim: Animated.Value;
  scrollAnim: Animated.Value;
}

const DEFAULT_SCROLL_THROTTLE = 16;

export class AnimatedScrollView extends Component<Props, State> {
  public state: State = {
    offsetAnim: new Animated.Value(0),
    scrollAnim: new Animated.Value(0),
  };

  private _previousScrollvalue: number = 0;
  private _currentScrollValue: number = 0;
  private _scrollEndTimer?: any;
  private _scrollAnimEvent?: string;

  public componentDidMount() {
    this._scrollAnimEvent = this.state.scrollAnim.addListener(this._handleScroll);
  }

  public componentWillUnmount() {
    this._scrollAnimEvent && this.state.scrollAnim.removeListener(this._scrollAnimEvent);
  }

  public render() {
    const { scrollAnim, offsetAnim } = this.state;
    const translateY = Animated.add(scrollAnim, offsetAnim).interpolate({
      inputRange: [0, this.props.headerHeight],
      outputRange: [0, -this.props.headerHeight],
      extrapolate: 'clamp',
    });

    const headerStyle = [
      styles.header,
      {
        height: this.props.headerHeight, transform: [{ translateY }],
      },
    ];

    return (
      <View style={styles.container}>
        {this._renderScrollView()}
        <Animated.View style={headerStyle}>
          {this.props.headerComponent}
        </Animated.View>
      </View >
    );
  }

  private _renderScrollView() {
    const style = [this.props.children.props.style, { paddingTop: this.props.headerHeight }];
    return React.cloneElement(this.props.children as any, {
      style,
      onScroll: Animated.event(
        [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
      ),
      scrollEventThrottle: DEFAULT_SCROLL_THROTTLE,
      onMomentumScrollBegin: this._handleMomentumScrollBegin,
      onMomentumScrollEnd: this._handleMomentumScrollEnd,
      onScrollEndDrag: this._handleScrollEndDrag,
    });
  }

  ///////////////////////////////////////////////////////////////////

  private _handleScroll = ({ value }) => {
    this._previousScrollvalue = this._currentScrollValue;
    this._currentScrollValue = value;
  }

  private _handleScrollEndDrag = () => {
    this._scrollEndTimer = setTimeout(this._handleMomentumScrollEnd, 250);
  }

  private _handleMomentumScrollBegin = () => {
    clearTimeout(this._scrollEndTimer);
  }

  private _handleMomentumScrollEnd = () => {
    const previous = this._previousScrollvalue;
    const current = this._currentScrollValue;

    if (previous > current || current < this.props.headerHeight) {
      // User scrolled down or scroll amount was too less, lets snap back our header
      Animated.spring(this.state.offsetAnim, {
        useNativeDriver: false,
        toValue: -current,
        tension: 300,
        friction: 35,
      }).start();
    } else {
      Animated.timing(this.state.offsetAnim, {
        useNativeDriver: false,
        toValue: 0,
        duration: 500,
      }).start();
    }
  }
}

///////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
