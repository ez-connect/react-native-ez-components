import * as React from 'react';
import { Animated, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import { Theme } from './Theme';
import { TouchableText } from './TouchableText';

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
    const backgroundColor = Theme.secondaryLight;
    const color = Theme.secondaryText;

    itemStyle = StyleSheet.flatten([styles.item, itemStyle, { backgroundColor }]);
    titleStyle = StyleSheet.flatten([styles.title, titleStyle, { color }]);
    messageStyle = StyleSheet.flatten([styles.message, messageStyle, { color }]);

    const { title, message } = this.state.item;

    return (
      <TouchableOpacity onPress={this._handleOnPress}>
        <Animated.View style={{ bottom: this._anim }}>
          <View style={itemStyle}>
            {title && <Text style={titleStyle}>{title}</Text>}
            <Text style={messageStyle}>{message}</Text>
            {this._renderItemAction()}
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }

  private _renderItemAction() {
    const color = Theme.secondaryText;
    const actionStyle = StyleSheet.flatten([styles.action, { color }]);
    const action = this.state.item.action;
    if (action) {
      return (
        <TouchableText style={actionStyle} onPress={this._handleOnAction}>
          {action.title}
        </TouchableText>
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
    this._timeoutHandler = setTimeout(this._handleOnTimeout, item.duration);
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
    this.state.item.action.onPress();
  }
}

///////////////////////////////////////////////////////////////////

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
