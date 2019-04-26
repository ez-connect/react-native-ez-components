import * as React from 'react';
import { Dimensions, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import { Theme } from './Theme';
import { TouchableText } from './TouchableText';

const kInterval = 500; // check all items every 0.5s
const kDefaultTimeOut = 3000; // 3 sec

export enum ToastType {
  Info = 1,
  Warning = 2,
  Error = 3,
}

export enum ToastDuration {
  Short = 1000, // 1 sec
  Length = 3000, // 3sec
  Forever = 0, // until dismiss
}

interface ToastItem {
  title?: string;
  message: string;
  type?: ToastType;
  timeout?: number;
  duration?: ToastDuration | number;
  action?: {
    title: string;
    color: string;
    onPress: () => void;
  };
}

interface ToastProps {
  containerStyle?: ViewStyle;
  itemStyle?: ViewStyle;
  titleStyle?: TextStyle;
  messageStyle?: TextStyle;
}

interface ToastState {
  items: ToastItem[];
}

export class Toast extends React.Component<ToastProps, ToastState> {
  public static setInstance(ref: Toast | null) {
    Toast._instance = ref;
  }

  public static show(item: ToastItem) {
    Toast._instance.show(item);
  }

  private static _instance: Toast | null;

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
    if (item.timeout && item.timeout > 0) {
      setTimeout(() => {
        item.timeout = 0;
        this.show(item);
      }, item.timeout);
    } else {
      const { items } = this.state;
      item.duration = new Date().getTime() + (item.duration || ToastDuration.Length);
      items.unshift(item);
      this.setState({ items });

      this._intervalHandler && clearInterval(this._intervalHandler);
      this._intervalHandler = setInterval(this._handleCheckDuration, kInterval);
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
    const backgroundColor = Theme.secondaryLight;
    const color = Theme.secondaryText;

    itemStyle = StyleSheet.flatten([styles.item, itemStyle, { backgroundColor }]);
    titleStyle = StyleSheet.flatten([styles.title, titleStyle, { color }]);
    messageStyle = StyleSheet.flatten([styles.message, messageStyle, { color }]);
    const dismissStyle = StyleSheet.flatten([styles.action, { color }]);

    const { title, message, action } = item;

    return (
      <TouchableOpacity
        key={index}
        onPress={this._handleOnAction(item)}
      >
        <View style={itemStyle}>
          {title && <Text style={titleStyle}>{title}</Text>}
          <Text style={messageStyle}>{message}</Text>
          {this._renderItemAction(item)}
        </View>
      </TouchableOpacity>
    );
  }

  ///////////////////////////////////////////////////////////////////

  private _renderItemAction(item: ToastItem) {
    const color = Theme.secondaryText;
    const actionStyle = StyleSheet.flatten([styles.action, { color }]);
    const action = item.action;
    if (action) {
      return (
        <TouchableText style={actionStyle} onPress={this._handleOnAction(item)}>
          {action.title}
        </TouchableText>
      );
    }
    return null;
  }

  private _removeItem(item: ToastItem) {
    const { items } = this.state;
    const index = items.indexOf(item);
    items.splice(index, 1);
    this.setState({ items });
  }

  ///////////////////////////////////////////////////////////////////

  private _handleCheckDuration = () => {
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
  }

  private _handleOnAction = (item: ToastItem) => () => {
    this._removeItem(item);
    item.action && item.action.onPress();
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
