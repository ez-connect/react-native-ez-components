import * as React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Theme } from './Theme';
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
    ToastDuration[ToastDuration["Forever"] = -1] = "Forever";
})(ToastDuration || (ToastDuration = {}));
export class Toast extends React.Component {
    constructor(props) {
        super(props);
        this._timeoutHandler = null;
        this._anim = new Animated.Value(ANIM_OFFSET);
        this._show = (item) => () => {
            Animated.timing(this._anim, {
                useNativeDriver: true,
                toValue: 0,
                duration: ANIM_DURATION,
            }).start();
            this._add(item);
        };
        this._add = (item) => {
            item.duration = item.duration || ToastDuration.Length;
            this._timeoutHandler && clearTimeout(this._timeoutHandler);
            if (item.duration !== ToastDuration.Forever) {
                this._timeoutHandler = setTimeout(this._handleOnTimeout, item.duration);
            }
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
            const callback = this.state.item.action.onPress || this._handleOnPress;
            callback();
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
        const backgroundColor = Theme.secondary;
        const color = Theme.onSecondary;
        itemStyle = StyleSheet.flatten([styles.item, { backgroundColor }, itemStyle]);
        titleStyle = StyleSheet.flatten([styles.title, { color }, titleStyle]);
        messageStyle = StyleSheet.flatten([styles.message, { color }, messageStyle]);
        const { title, message } = this.state.item;
        return (<TouchableOpacity onPress={this._handleOnPress}>
        <Animated.View style={{ bottom: this._anim }}>
          <View style={itemStyle}>
            <View style={styles.body}>
              {title && <Text style={titleStyle}>{title}</Text>}
              <Text style={messageStyle}>{message}</Text>
            </View>
            {this._renderItemAction()}
          </View>
        </Animated.View>
      </TouchableOpacity>);
    }
    _renderItemAction() {
        const action = this.state.item.action;
        const color = (action && action.color) || Theme.onSecondary;
        const titleStyle = StyleSheet.flatten([styles.button, { color }]);
        if (action) {
            return (<View style={styles.action}>
          <Button title={action.title} titleStyle={titleStyle} type='clear' onPress={this._handleOnAction}/>
        </View>);
        }
        return null;
    }
    _hide(callback) {
        this._timeoutHandler && clearTimeout(this._timeoutHandler);
        Animated.timing(this._anim, {
            useNativeDriver: true,
            toValue: ANIM_OFFSET,
            duration: ANIM_DURATION,
        }).start(callback);
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        elevation: 2,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
    },
    body: {
        flex: 1,
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
        alignItems: 'center',
    },
    button: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingLeft: 12,
        paddingRight: 12,
    },
});
