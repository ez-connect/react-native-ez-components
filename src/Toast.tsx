import * as React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native';

import theme from './Theme';

const kInterval = 500; // check all items every 0.5s
const kDefaultTimeOut = 3000; // 3 sec

export enum ToastType {
  Info = 1,
  Warning = 2,
  Error = 3,
}

export interface IToastItem {
  title?: string;
  message: string;
  type?: ToastType;
  timeout?: number;
}

export interface IToastState {
  items: IToastItem[];
}

export class Toast extends React.Component<ViewProps, IToastState> {
  public static setInstance(ref: Toast) {
    Toast.s_instance = ref;
  }

  public static show(item: IToastItem) {
    Toast.s_instance.show(item);
  }

  // tslint:disable-next-line:variable-name
  private static s_instance: Toast;

  ///////////////////////////////////////////////////////////////////

  private _intervalHandler: any = null;

  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  public render() {
    if (this.state.items.length > 0) {
      return (
        <View style={styles.mainContainer}>
          {this._renderItems()}
        </View>
      );
    }
    return null;
  }

  ///////////////////////////////////////////////////////////////////

  public show(item: IToastItem) {
    const { items } = this.state;
    item.timeout = new Date().getTime() + (item.timeout || kDefaultTimeOut);
    items.unshift(item);
    this.setState({ items });

    this._intervalHandler && clearInterval(this._intervalHandler);
    this._intervalHandler = setInterval(this._handleCheckTimeout, kInterval);
  }

  ///////////////////////////////////////////////////////////////////

  private _renderItems() {
    return this.state.items.map((item, index) => {
      return this._renderItem(item, index);
    });
  }

  private _renderItem(item: IToastItem, index: number) {
    const { title, message, timeout } = item;
    const backgroundColor = theme.secondaryLight;
    const color = theme.secondaryText;
    return (
      <TouchableOpacity
        key={index}
        onPress={this._handleOnDismiss(item)}
      >
        <View style={[styles.item, { backgroundColor }]}>
          {title && <Text style={[styles.title, { color }]}>{title}</Text>}
          <Text style={[styles.message, { color }]}>{message}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  private _removeItem(item: IToastItem) {
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
      }
    }

    if (this.state.items.length === 0) {
      clearInterval(this._intervalHandler);
    }
  }

  private _handleOnDismiss = (item: IToastItem) => () => {
    this._removeItem(item);
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
