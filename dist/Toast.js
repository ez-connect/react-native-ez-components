import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Theme } from './Theme';
import { TouchableText } from './TouchableText';
const kInterval = 500;
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
        this._intervalHandler = null;
        this._handleCheckDuration = () => {
            const now = new Date().getTime();
            for (const item of this.state.items) {
                if (now > item.duration) {
                    this._removeItem(item);
                    item.action && item.action.onPress();
                }
            }
            if (this.state.items.length === 0) {
                clearInterval(this._intervalHandler);
            }
        };
        this._handleOnAction = (item) => () => {
            this._removeItem(item);
            item.action && item.action.onPress();
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
        if (item.timeout && item.timeout > 0) {
            setTimeout(() => {
                item.timeout = 0;
                this.show(item);
            }, item.timeout);
        }
        else {
            const { items } = this.state;
            item.duration = new Date().getTime() + (item.duration || ToastDuration.Length);
            items.unshift(item);
            this.setState({ items });
            this._intervalHandler && clearInterval(this._intervalHandler);
            this._intervalHandler = setInterval(this._handleCheckDuration, kInterval);
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
        const { title, message } = item;
        return (<TouchableOpacity key={index} onPress={this._handleOnAction(item)}>
        <View style={itemStyle}>
          {title && <Text style={titleStyle}>{title}</Text>}
          <Text style={messageStyle}>{message}</Text>
          {this._renderItemAction(item)}
        </View>
      </TouchableOpacity>);
    }
    _renderItemAction(item) {
        const color = Theme.secondaryText;
        const actionStyle = StyleSheet.flatten([styles.action, { color }]);
        const action = item.action;
        if (action) {
            return (<TouchableText style={actionStyle} onPress={this._handleOnAction(item)}>
          {action.title}
        </TouchableText>);
        }
        return null;
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
