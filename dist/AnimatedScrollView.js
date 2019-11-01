import React, { Component } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
const DEFAULT_SCROLL_THROTTLE = 16;
export class AnimatedScrollView extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            offsetAnim: new Animated.Value(0),
            scrollAnim: new Animated.Value(0),
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
        const headerStyle = [
            styles.header,
            {
                height: this.props.headerHeight, transform: [{ translateY }],
            },
        ];
        return (<View style={styles.container}>
        {this._renderScrollView()}
        <Animated.View style={headerStyle}>
          {this.props.headerComponent}
        </Animated.View>
      </View>);
    }
    _renderScrollView() {
        return React.cloneElement(this.props.children, {
            onScroll: Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }]),
            scrollEventThrottle: DEFAULT_SCROLL_THROTTLE,
            onMomentumScrollBegin: this._handleMomentumScrollBegin,
            onMomentumScrollEnd: this._handleMomentumScrollEnd,
            onScrollEndDrag: this._handleScrollEndDrag,
        });
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
