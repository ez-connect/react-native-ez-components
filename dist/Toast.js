import * as React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Theme } from './Theme';
import { TouchableText } from './TouchableText';
const ANIM_OFFSET = -50;
const ANIM_DURATION = 300;
export var ToastType;
(function (ToastType) {
    ToastType[ToastType["Info"] = 1] = "Info";
    ToastType[ToastType["Warning"] = 2] = "Warning";
    ToastType[ToastType["Error"] = 3] = "Error";
})(ToastType || (ToastType = {}));
export var ToastDuration;
(function (ToastDuration) {
    ToastDuration[ToastDuration["Short"] = 1000] = "Short";
    ToastDuration[ToastDuration["Length"] = 3000] = "Length";
    ToastDuration[ToastDuration["Forever"] = 0] = "Forever";
})(ToastDuration || (ToastDuration = {}));
export class Toast extends React.Component {
    constructor(props) {
        super(props);
        this._timeoutHandler = null;
        this._anim = new Animated.Value(ANIM_OFFSET);
        this._show = (item) => () => {
            Animated.timing(this._anim, {
                toValue: 0,
                duration: ANIM_DURATION,
            }).start();
            this._add(item);
        };
        this._add = (item) => {
            item.duration = item.duration || ToastDuration.Length;
            this._timeoutHandler && clearTimeout(this._timeoutHandler);
            this._timeoutHandler = setTimeout(this._handleOnTimeout, item.duration);
            this.setState({ item });
        };
        this._remove = () => {
            this.setState({ item: undefined });
        };
        this._handleOnTimeout = () => {
            this._hide(this._remove);
        };
        this._handleOnPress = () => {
            this._hide(this._handleOnTimeout);
        };
        this._handleOnAction = () => {
            this._hide(this._remove);
            this.state.item.action.onPress();
        };
        this.state = {};
    }
    static setInstance(ref) {
        Toast._instance = ref;
    }
    static show(item) {
        Toast._instance.show(item);
    }
    render() {
        if (this.state.item) {
            const style = StyleSheet.flatten([styles.mainContainer, this.props.containerStyle]);
            return (<View style={style}>
          {this._renderItem()}
        </View>);
        }
        return null;
    }
    show(item) {
        if (!item.timeout) {
            if (this.state.item) {
                this._hide(this._show(item));
            }
            else {
                this._show(item)();
            }
        }
        else {
            setTimeout(() => {
                item.timeout = 0;
                this.show(item);
            }, item.timeout);
        }
    }
    _renderItem() {
        let { itemStyle, titleStyle, messageStyle } = this.props;
        const backgroundColor = Theme.secondaryLight;
        const color = Theme.secondaryText;
        itemStyle = StyleSheet.flatten([styles.item, itemStyle, { backgroundColor }]);
        titleStyle = StyleSheet.flatten([styles.title, titleStyle, { color }]);
        messageStyle = StyleSheet.flatten([styles.message, messageStyle, { color }]);
        const { title, message } = this.state.item;
        return (<TouchableOpacity onPress={this._handleOnPress}>
        <Animated.View style={{ bottom: this._anim }}>
          <View style={itemStyle}>
            {title && <Text style={titleStyle}>{title}</Text>}
            <Text style={messageStyle}>{message}</Text>
            {this._renderItemAction()}
          </View>
        </Animated.View>
      </TouchableOpacity>);
    }
    _renderItemAction() {
        const color = Theme.secondaryText;
        const actionStyle = StyleSheet.flatten([styles.action, { color }]);
        const action = this.state.item.action;
        if (action) {
            return (<TouchableText style={actionStyle} onPress={this._handleOnAction}>
          {action.title}
        </TouchableText>);
        }
        return null;
    }
    _hide(callback) {
        this._timeoutHandler && clearTimeout(this._timeoutHandler);
        Animated.timing(this._anim, {
            toValue: ANIM_OFFSET,
            duration: ANIM_DURATION,
        }).start(callback);
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        bottom: 6,
        elevation: 2,
    },
    item: {
        flex: 1,
        padding: 12,
        marginLeft: 6,
        marginRight: 6,
        marginTop: 6,
        marginBottom: 6,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    message: {
        paddingTop: 6,
        paddingBottom: 6,
        fontSize: 14,
    },
    action: {
        fontWeight: 'bold',
        textAlign: 'right',
        paddingLeft: 12,
        paddingRight: 12,
    },
});
