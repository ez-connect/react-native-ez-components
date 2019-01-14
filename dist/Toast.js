import * as React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from './Theme';
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
                }
            }
            if (this.state.items.length === 0) {
                clearInterval(this._intervalHandler);
            }
        };
        this._handleOnDismiss = (item) => () => {
            this._removeItem(item);
        };
        this.state = { items: [] };
    }
    static setInstance(ref) {
        Toast.s_instance = ref;
    }
    static show(item) {
        Toast.s_instance.show(item);
    }
    render() {
        if (this.state.items.length > 0) {
            return (<View style={styles.mainContainer}>
          {this._renderItems()}
        </View>);
        }
        return null;
    }
    show(item) {
        const { items } = this.state;
        item.timeout = new Date().getTime() + (item.timeout || kDefaultTimeOut);
        items.unshift(item);
        this.setState({ items });
        this._intervalHandler && clearInterval(this._intervalHandler);
        this._intervalHandler = setInterval(this._handleCheckTimeout, kInterval);
    }
    _renderItems() {
        return this.state.items.map((item, index) => {
            return this._renderItem(item, index);
        });
    }
    _renderItem(item, index) {
        const { title, message, timeout } = item;
        const backgroundColor = theme.secondaryLight;
        const color = theme.secondaryText;
        return (<TouchableOpacity key={index} onPress={this._handleOnDismiss(item)}>
        <View style={[styles.item, { backgroundColor }]}>
          {title && <Text style={[styles.title, { color }]}>{title}</Text>}
          <Text style={[styles.message, { color }]}>{message}</Text>
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
        margin: 12,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    message: {
        fontSize: 14,
    },
});
