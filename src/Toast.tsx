import * as React from 'react';
import { Animated, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Button } from 'react-native-elements';

import { Theme } from './Theme';

const ANIM_OFFSET = -50;
const ANIM_DURATION = 300;

export enum ToastType {
  Info = 1,
  Warning = 2,
  Error = 3,
}

export enum ToastDuration {
  Short = 1000, // 1 sec
  Length = 3000, // 3sec
  Forever = -1, // until dismiss
}

interface ToastItem {
  title?: string;
  message: string;
  type?: ToastType;
  timeout?: number;
  duration?: ToastDuration | number;
  action?: {
    title: string;
    color?: string;
    onPress?: () => void;
  };
}

interface ToastProps {
  containerStyle?: ViewStyle;
  itemStyle?: ViewStyle;
  titleStyle?: TextStyle;
  messageStyle?: TextStyle;
}

interface ToastState {
  item?: ToastItem;
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

  private _timeoutHandler: any = null;
  private _anim = new Animated.Value(ANIM_OFFSET);

  constructor(props) {
    super(props);
    this.state = {};
  }

  public render() {
    if (this.state.item) {
      const style = StyleSheet.flatten([styles.mainContainer, this.props.containerStyle]);
      return (
        <View style={style}>
          {this._renderItem()}
        </View>
      );
    }
    return null;
  }

  ///////////////////////////////////////////////////////////////////

  public show(item: ToastItem) {
    if (!item.timeout) { // immediately
      if (this.state.item) {
        this._hide(this._show(item));
      } else {
        this._show(item)();
      }
    } else { // delay to show
      setTimeout(() => {
        item.timeout = 0;
        this.show(item);
      }, item.timeout);
    }
  }

  ///////////////////////////////////////////////////////////////////

  private _renderItem() {
    let { itemStyle, titleStyle, messageStyle } = this.props;
    const backgroundColor = Theme.secondary;
    const color = Theme.onSecondary;

    itemStyle = StyleSheet.flatten([styles.item, { backgroundColor }, itemStyle]);
    titleStyle = StyleSheet.flatten([styles.title, { color }, titleStyle]);
    messageStyle = StyleSheet.flatten([styles.message, { color }, messageStyle]);

    const { title, message } = this.state.item;

    return (
      <TouchableOpacity onPress={this._handleOnPress}>
        <Animated.View style={{ bottom: this._anim }}>
          <View style={itemStyle}>
            <View style={styles.body}>
              {title && <Text style={titleStyle}>{title}</Text>}
              <Text style={messageStyle}>{message}</Text>
            </View>
            {this._renderItemAction()}
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }

  private _renderItemAction() {
    const action = this.state.item.action;
    const color = (action && action.color) || Theme.onSecondary;
    const titleStyle = StyleSheet.flatten([styles.button, { color }]);

    if (action) {
      return (
        <View style={styles.action}>
          <Button
            title={action.title}
            titleStyle={titleStyle}
            type='clear'
            onPress={this._handleOnAction}
          />
        </View>
      );
    }
    return null;
  }

  ///////////////////////////////////////////////////////////////////

  private _show = (item: ToastItem) => () => {
    Animated.timing(this._anim, {
      toValue: 0,
      duration: ANIM_DURATION,
    }).start();

    this._add(item);
  }

  private _hide(callback: Animated.EndCallback) {
    this._timeoutHandler && clearTimeout(this._timeoutHandler);
    Animated.timing(this._anim, {
      toValue: ANIM_OFFSET,
      duration: ANIM_DURATION,
    }).start(callback);
  }

  private _add = (item: ToastItem) => {
    item.duration = item.duration || ToastDuration.Length;
    this._timeoutHandler && clearTimeout(this._timeoutHandler);
    if (item.duration != ToastDuration.Forever) {
      this._timeoutHandler = setTimeout(this._handleOnTimeout, item.duration);
    }

    this.setState({ item });
  }

  private _remove = () => {
    this.setState({ item: undefined });
  }

  ///////////////////////////////////////////////////////////////////

  private _handleOnTimeout = () => {
    this._hide(this._remove);
  }

  private _handleOnPress = () => {
    this._hide(this._handleOnTimeout);
  }

  private _handleOnAction = () => {
    this._hide(this._remove);
    const callback = this.state.item.action.onPress || this._handleOnPress;
    callback();
  }
}

///////////////////////////////////////////////////////////////////

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
