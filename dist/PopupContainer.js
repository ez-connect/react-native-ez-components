import React from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View } from './View';
const ANIM_OFFSET = 0;
const ANIM_DURATION = 300;
export class PopupContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this._anim = new Animated.Value(ANIM_OFFSET);
        this._hide = (callback) => {
            this._children = undefined;
            this._options = undefined;
            this.setState({ visible: false });
            callback && callback();
        };
        this._handleOnPress = () => {
            this.hide();
        };
        this.state = { visible: false };
    }
    static setInstance(ref) {
        PopupContainer._instance = ref;
    }
    static show(children) {
        if (PopupContainer._instance) {
            PopupContainer._instance.show(children);
        }
        else {
            console.warn('PopupContainer must be added into App container');
        }
    }
    static hide(callback) {
        if (PopupContainer._instance) {
            PopupContainer._instance.hide(callback);
        }
        else {
            console.warn('PopupContainer must be added into App container');
        }
    }
    render() {
        if (this.state.visible) {
            const animation = (this._options && this._options.animation) || 'slide-up';
            const position = animation === 'slide-up'
                ? { bottom: this._anim } : { top: this._anim };
            const style = StyleSheet.flatten([styles.mainContainer, this.props.containerStyle]);
            return (<TouchableWithoutFeedback onPress={this._handleOnPress}>
          <View style={style}>
            <Animated.View style={position}>
              {this._children}
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>);
        }
        return null;
    }
    show(children, options) {
        Animated.timing(this._anim, {
            toValue: 0,
            duration: (options && options.duration) || ANIM_DURATION,
        }).start();
        this._children = children;
        this._options = options;
        this.setState({ visible: true });
    }
    hide(callback) {
        if (this._options && this._options.useHideAnimation) {
            Animated.timing(this._anim, {
                toValue: ANIM_OFFSET,
                duration: this._options && this._options.duration || ANIM_DURATION,
            }).start(() => this._hide(callback));
        }
        else {
            this._hide();
        }
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'grey',
        elevation: 2,
        flex: 1,
        height: '100%',
        position: 'absolute',
        width: '100%',
    },
});
