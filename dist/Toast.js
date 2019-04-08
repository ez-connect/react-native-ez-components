import * as React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Theme } from './Theme';
import { TouchableText } from './TouchableText';
const kInterval = 500;
const kDefaultTimeOut = 3000;
export var ToastType;
(function (ToastType) {
    ToastType[ToastType["Info"] = 1] = "Info";
    ToastType[ToastType["Warning"] = 2] = "Warning";
    ToastType[ToastType["Error"] = 3] = "Error";
})(ToastType || (ToastType = {}));
export class Toast extends React.Component {
    constructor(props) {
        super(props);
        this._intervalHandler = null;
        this._handleCheckTimeout = () => {
            const now = new Date().getTime();
            for (const item of this.state.items) {
                if (now > item.timeout) {
                    this._removeItem(item);
                    item.onDismiss && item.onDismiss();
                }
            }
            if (this.state.items.length === 0) {
                clearInterval(this._intervalHandler);
            }
        };
        this._handleOnDismiss = (item) => () => {
            this._removeItem(item);
            item.onDismiss && item.onDismiss();
        };
        this.state = { items: [] };
    }
    static setInstance(ref) {
        Toast._instance = ref;
    }
    static show(item) {
        Toast._instance.show(item);
    }
    render() {
        if (this.state.items.length > 0) {
            const style = StyleSheet.flatten([styles.mainContainer, this.props.containerStyle]);
            return (<View style={style}>
          {this._renderItems()}
        </View>);
        }
        return null;
    }
    show(item) {
        if (item.delay && item.delay > 0) {
            setTimeout(() => {
                item.delay = 0;
                this.show(item);
            }, item.delay);
        }
        else {
            const { items } = this.state;
            item.timeout = new Date().getTime() + (item.timeout || kDefaultTimeOut);
            items.unshift(item);
            this.setState({ items });
            this._intervalHandler && clearInterval(this._intervalHandler);
            this._intervalHandler = setInterval(this._handleCheckTimeout, kInterval);
        }
    }
    _renderItems() {
        return this.state.items.map((item, index) => {
            return this._renderItem(item, index);
        });
    }
    _renderItem(item, index) {
        let { itemStyle, titleStyle, messageStyle } = this.props;
        const backgroundColor = Theme.secondaryLight;
        const color = Theme.secondaryText;
        itemStyle = StyleSheet.flatten([styles.item, itemStyle, { backgroundColor }]);
        titleStyle = StyleSheet.flatten([styles.title, titleStyle, { color }]);
        messageStyle = StyleSheet.flatten([styles.message, messageStyle, { color }]);
        const dismissStyle = StyleSheet.flatten([styles.dismiss, { color }]);
        const { title, message, dismiss } = item;
        return (<TouchableOpacity key={index} onPress={this._handleOnDismiss(item)}>
        <View style={itemStyle}>
          {title && <Text style={titleStyle}>{title}</Text>}
          <Text style={messageStyle}>{message}</Text>
          {dismiss && <TouchableText style={dismissStyle} onPress={this._handleOnDismiss(item)}>{dismiss}</TouchableText>}
        </View>
      </TouchableOpacity>);
    }
    _removeItem(item) {
        const { items } = this.state;
        const index = items.indexOf(item);
        items.splice(index, 1);
        this.setState({ items });
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        position: 'absolute',
        width: Dimensions.get('window').width,
        bottom: 50,
        elevation: 2,
        zIndex: 1,
    },
    item: {
        flex: 1,
        padding: 12,
        marginLeft: 12,
        marginRight: 12,
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
    dismiss: {
        fontWeight: 'bold',
        textAlign: 'right',
    },
});
