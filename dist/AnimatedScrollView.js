import React, { Component } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
const DEFAULT_SCROLL_THROTTLE = 20;
export class AnimatedScrollView extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            scrollAnim: new Animated.Value(0),
            offsetAnim: new Animated.Value(0),
        };
        this._previousScrollvalue = 0;
        this._currentScrollValue = 0;
        this._handleScroll = ({ value }) => {
            this._previousScrollvalue = this._currentScrollValue;
            this._currentScrollValue = value;
        };
        this._handleScrollEndDrag = () => {
            this._scrollEndTimer = setTimeout(this._handleMomentumScrollEnd, 250);
        };
        this._handleMomentumScrollBegin = () => {
            clearTimeout(this._scrollEndTimer);
        };
        this._handleMomentumScrollEnd = () => {
            const previous = this._previousScrollvalue;
            const current = this._currentScrollValue;
            if (previous > current || current < this.props.headerHeight) {
                Animated.spring(this.state.offsetAnim, {
                    toValue: -current,
                    tension: 300,
                    friction: 35,
                }).start();
            }
            else {
                Animated.timing(this.state.offsetAnim, {
                    toValue: 0,
                    duration: 500,
                }).start();
            }
        };
    }
    componentDidMount() {
        this._scrollAnimEvent = this.state.scrollAnim.addListener(this._handleScroll);
    }
    componentWillUnmount() {
        this._scrollAnimEvent && this.state.scrollAnim.removeListener(this._scrollAnimEvent);
    }
    render() {
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
        return (<View style={styles.container}>
        <Animated.ScrollView style={themeStyle} scrollEventThrottle={scrollEventThrottle || DEFAULT_SCROLL_THROTTLE} onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }])} onMomentumScrollBegin={this._handleMomentumScrollBegin} onMomentumScrollEnd={this._handleMomentumScrollEnd} onScrollEndDrag={this._handleScrollEndDrag} {...rest}>
          {this.props.children}
        </Animated.ScrollView>

        <Animated.View style={headerStyle}>
          {this.props.header}
        </Animated.View>
      </View>);
    }
}
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
