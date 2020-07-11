import * as React from 'react';
import {
  Animated,
  Dimensions,
  NativeEventSubscription,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {BackHandler} from 'react-native';
import {ListItem, Text} from 'react-native-elements';

import {Theme} from './Theme';

export interface SheetItem {
  disabled?: boolean;
  icon?: string;
  subtitle?: string;
  title?: string;
  value?: any;
}

interface Props {
  animation?: 'none' | 'fade' | 'slide'; // TODO: support none & fade animations
  position?: 'top' | 'bottom';
  bottomDivider?: boolean;
  containerStyle?: ViewStyle;

  items?: SheetItem[];
  itemsStyle?: ViewStyle;
  itemStyle?: ViewStyle;
  title?: string;
  titleStyle?: TextStyle;

  // Component
  component?: JSX.Element;

  onSelect?: (value: any) => void;
}

interface State {
  props?: Props;
  visible: boolean;
}

const CONTAINER_OPACITY = 80; // rgba, #00000080 for example
const ANIM_DURATION = 300;

export class Sheet extends React.PureComponent<{}, State> {
  public static setInstance(value: Sheet | null) {
    Sheet._instance = value;
  }

  public static open(props: Props) {
    if (Sheet._instance) {
      Sheet._instance.open(props);
    }
  }

  private static _instance: Sheet | null;

  ///////////////////////////////////////////////////////////////////

  public state: State = {
    visible: false,
  };

  private _anim = new Animated.Value(1000);
  private _backHandler?: NativeEventSubscription;

  public componentDidMount() {
    this._backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this._handleOnBackPress,
    );
  }

  public componentWillUnmount() {
    this._backHandler.remove();
  }

  public open(props: Props) {
    this._anim = new Animated.Value(-Dimensions.get('screen').height);
    Animated.timing(this._anim, {
      useNativeDriver: false,
      toValue: 0,
      duration: ANIM_DURATION,
    }).start();

    this.setState({props, visible: true});
  }

  public close = () => {
    this.setState({props: undefined, visible: false});
  };

  public render() {
    const {props, visible} = this.state;
    if (visible && props) {
      const containerStyle = StyleSheet.flatten([
        styles.mainContainer,
        {backgroundColor: `${Theme.onBackground}${CONTAINER_OPACITY}`},
        props.containerStyle,
      ]);

      return (
        <View style={containerStyle}>
          <TouchableOpacity onPress={this.close} style={styles.overlay}>
            {this._renderItems()}
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  }

  ///////////////////////////////////////////////////////////////////

  private _renderItems() {
    const props = this.state.props;
    if (props) {
      const titleStyle = StyleSheet.flatten([
        styles.title,
        {backgroundColor: Theme.background},
      ]);
      const style: ViewStyle = {position: 'absolute', width: '100%'};
      if (props.position === 'top') {
        Object.assign(style, {top: this._anim});
      } else {
        Object.assign(style, {bottom: this._anim});
      }

      const itemsStyle = StyleSheet.flatten([style, props.itemsStyle]);

      if (props.items) {
        const menuItems = props.items.map((v, i) => {
          return this._renderItem(v, i);
        });

        return (
          <Animated.View style={itemsStyle}>
            {props.title && <Text style={titleStyle}>{props.title}</Text>}
            {menuItems}
          </Animated.View>
        );
      }

      return (
        <Animated.View style={itemsStyle}>{props.component}</Animated.View>
      );
    }
  }

  private _renderItem(item: SheetItem, index: number) {
    const props = this.state.props;
    const {icon, title, value, disabled} = item;
    const containerStyle = StyleSheet.flatten([
      styles.item,
      {backgroundColor: Theme.background},
      props.itemsStyle,
    ]);

    if (title) {
      const color = disabled ? Theme.onSurface : Theme.onBackground;
      return (
        <ListItem
          bottomDivider={props.bottomDivider}
          containerStyle={containerStyle}
          key={index}
          leftIcon={{type: Theme.iconset, name: icon, color}}
          onPress={disabled ? undefined : this._handleOnPressItem(value)}
          subtitle={item.subtitle}
          title={title}
          titleStyle={{color}}
        />
      );
    } else {
      return (
        <View
          key={index}
          style={{backgroundColor: Theme.onSurface, ...styles.divider}}
        />
      );
    }
  }

  ///////////////////////////////////////////////////////////////////

  private _handleOnPressItem = (value) => () => {
    const props = this.state.props;
    this.close();
    if (props && props.onSelect) {
      props.onSelect(value);
    }
  };

  private _handleOnBackPress = (): boolean => {
    this.close();
    return true;
  };
}

///////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // backgroundColor: '#00000080',
  },
  overlay: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 12,
  },
  item: {
    padding: 12,
  },
  divider: {
    padding: 0.2,
  },
});
