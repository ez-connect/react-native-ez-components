import React from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import { View } from './View';

interface Props {
  containerStyle?: ViewStyle;
}

interface State {
  visible?: boolean;
}

interface Options {
  animation?: 'slide-up' | 'slide-down';
  backgroundColor?: string;
  duration?: number;
  useHideAnimation?: boolean;
}

// TODO: Compute offset base on layout, add `duration` to props
const ANIM_OFFSET = 0;
const ANIM_DURATION = 300;

export class PopupContainer extends React.PureComponent<Props, State> {
  public static setInstance(ref: PopupContainer | null) {
    PopupContainer._instance = ref;
  }

  public static show(children: JSX.Element) {
    if (PopupContainer._instance) {
      PopupContainer._instance.show(children);
    } else {
      console.warn('PopupContainer must be added into App container');
    }
  }

  public static hide(callback?: () => void) {
    if (PopupContainer._instance) {
      PopupContainer._instance.hide(callback);
    } else {
      console.warn('PopupContainer must be added into App container');
    }
  }

  private static _instance: PopupContainer | null;

  ///////////////////////////////////////////////////////////////////

  private _anim = new Animated.Value(ANIM_OFFSET);
  private _children?: JSX.Element;
  private _options?: Options;

  constructor(props: Props) {
    super(props);
    this.state = { visible: false };
  }

  public render() {
    if (this.state.visible) {
      const animation = (this._options && this._options.animation) || 'slide-up';
      const position = animation === 'slide-up'
        ? { bottom: this._anim } : { top: this._anim };
      const style = StyleSheet.flatten([styles.mainContainer, this.props.containerStyle]);
      return (
        <TouchableWithoutFeedback onPress={this._handleOnPress}>
          <View style={style}>
            <Animated.View style={position}>
              {this._children}
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
    return null;
  }

  public show(children: JSX.Element, options?: Options) {
    Animated.timing(this._anim, {
      toValue: 0,
      duration: (options && options.duration) || ANIM_DURATION,
      // useNativeDriver: true,
    }).start();

    this._children = children;
    this._options = options;
    this.setState({ visible: true });
  }

  public hide(callback?: () => void) {
    if (this._options && this._options.useHideAnimation) {
      Animated.timing(this._anim, {
        toValue: ANIM_OFFSET,
        duration: this._options && this._options.duration || ANIM_DURATION,
      }).start(() => this._hide(callback));
    } else {
      this._hide();
    }
  }

  ///////////////////////////////////////////////////////////////////

  private _hide = (callback?: () => void) => {
    this._children = undefined;
    this._options = undefined;
    this.setState({ visible: false });
    callback && callback();
  }

  private _handleOnPress = () => {
    this.hide();
  }
}

///////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'grey', // 'transparent',
    elevation: 2,
    flex: 1,
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
});
