import * as React from 'react';
import { Dimensions, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import { theme } from './Theme';
import { TouchableText } from './TouchableText';

const kInterval = 500; // check all items every 0.5s
const kDefaultTimeOut = 3000; // 3 sec

export enum ToastType {
  Info = 1,
  Warning = 2,
  Error = 3,
}

export interface ToastItem {
  title?: string;
  message: string;
  type?: ToastType;
  delay?: number;
  timeout?: number;
  dismiss?: string;
  onDismiss?(): void;
}

export interface ToastProps {
  containerStyle?: ViewStyle;
  itemStyle?: ViewStyle;
  titleStyle?: TextStyle;
  messageStyle?: TextStyle;
}

export interface ToastState {
  items: ToastItem[];
}

export class Toast extends React.Component<ToastProps, ToastState> {
  public static setInstance(ref: Toast|null) {
    Toast._instance = ref;
  }

  public static show(item: ToastItem) {
    Toast._instance.show(item);
  }

  private static _instance: Toast|null;

  ///////////////////////////////////////////////////////////////////

  private _intervalHandler: any = null;

  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  public render() {
    if (this.state.items.length > 0) {
      const style = StyleSheet.flatten([styles.mainContainer, this.props.containerStyle]);
      return (
        <View style={style}>
          {this._renderItems()}
        </View>
      );
    }
    return null;
  }

  ///////////////////////////////////////////////////////////////////

  public show(item: ToastItem) {
    if (item.delay && item.delay > 0) {
      setTimeout(() => {
        item.delay = 0;
        this.show(item);
      }, item.delay);
    } else {
      const { items } = this.state;
      item.timeout = new Date().getTime() + (item.timeout || kDefaultTimeOut);
      items.unshift(item);
      this.setState({ items });

      this._intervalHandler && clearInterval(this._intervalHandler);
      this._intervalHandler = setInterval(this._handleCheckTimeout, kInterval);
    }
  }

  ///////////////////////////////////////////////////////////////////

  private _renderItems() {
    return this.state.items.map((item, index) => {
      return this._renderItem(item, index);
    });
  }

  private _renderItem(item: ToastItem, index: number) {
    let { itemStyle, titleStyle, messageStyle } = this.props;
    const backgroundColor = theme.secondaryLight;
    const color = theme.secondaryText;

    itemStyle = StyleSheet.flatten([styles.item, itemStyle, { backgroundColor }]);
    titleStyle = StyleSheet.flatten([styles.title, titleStyle, { color }]);
    messageStyle = StyleSheet.flatten([styles.message, messageStyle, { color }]);
    const dismissStyle = StyleSheet.flatten([styles.dismiss, { color }]);

    const { title, message, dismiss } = item;

    return (
      <TouchableOpacity
        key={index}
        onPress={this._handleOnDismiss(item)}
      >
        <View style={itemStyle}>
          {title && <Text style={titleStyle}>{title}</Text>}
          <Text style={messageStyle}>{message}</Text>
          {dismiss && <TouchableText style={dismissStyle} onPress={this._handleOnDismiss(item)}>{dismiss}</TouchableText>}
        </View>
      </TouchableOpacity>
    );
  }

  ///////////////////////////////////////////////////////////////////

  private _removeItem(item: ToastItem) {
    const { items } = this.state;
    const index = items.indexOf(item);
    items.splice(index, 1);
    this.setState({ items });
  }

  ///////////////////////////////////////////////////////////////////

  private _handleCheckTimeout = () => {
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
  }

  private _handleOnDismiss = (item: ToastItem) => () => {
    this._removeItem(item);
    item.onDismiss && item.onDismiss();
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
