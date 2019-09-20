// https://snack.expo.io/B1v5RS7ix

import React, { Component } from 'react';
import { Animated, ScrollViewProps, StyleSheet, View, ViewStyle } from 'react-native';

interface Props extends ScrollViewProps {
  header: JSX.Element; // auto hide when reach to range
  headerHeight: number;
  style?: ViewStyle;
}

interface State {
  scrollAnim: Animated.Value;
  offsetAnim: Animated.Value;
}

const DEFAULT_SCROLL_THROTTLE = 20;

export class AnimatedScrollView extends Component<Props, State> {
  public state: State = {
    scrollAnim: new Animated.Value(0),
    offsetAnim: new Animated.Value(0),
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

    const { style, scrollEventThrottle, ...rest } = this.props;
    const themeStyle = StyleSheet.flatten([
      { paddingTop: this.props.headerHeight },
      style && style,
    ]);
    const headerStyle = [
      styles.header,
      {
        height: this.props.headerHeight, transform: [{ translateY }],
      },
    ];

    return (
      <View style={styles.container}>
        <Animated.ScrollView
          style={themeStyle}
          scrollEventThrottle={scrollEventThrottle || DEFAULT_SCROLL_THROTTLE}
          // tslint:disable-next-line: jsx-no-multiline-js
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
          )}
          onMomentumScrollBegin={this._handleMomentumScrollBegin}
          onMomentumScrollEnd={this._handleMomentumScrollEnd}
          onScrollEndDrag={this._handleScrollEndDrag}

          {...rest}
        >
          {this.props.children}
        </Animated.ScrollView>

        <Animated.View style={headerStyle}>
          {this.props.header}
        </Animated.View>
      </View>
    );
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
        toValue: -current,
        tension: 300,
        friction: 35,
      }).start();
    } else {
      Animated.timing(this.state.offsetAnim, {
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
