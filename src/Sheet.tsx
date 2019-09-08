import * as React from 'react';
import { Animated, Dimensions, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ListItem, Text } from 'react-native-elements';

import { Theme } from './Theme';

export interface SheetItem {
  disabled?: boolean;
  icon?: string;
  subtitle?: string;
  title?: string;
  value?: any;
}

interface Options {
  animation?: 'none' | 'fade' | 'slide'; // TODO: support none & fade animations
  bottomDivider?: boolean;
  containerStyle?: ViewStyle;
  itemsStyle?: ViewStyle;
  itemStyle?: ViewStyle;
  position?: 'top' | 'bottom';
  titleStyle?: TextStyle;
}

interface State {
  items: SheetItem[];
  title?: string;
  visible: boolean;
}

const CONTAINER_OPACITY = 80; // rgba, #00000080 for example
const ANIM_DURATION = 300;

export class Sheet extends React.PureComponent<{}, State> {
  public static setInstance(value: Sheet | null) {
    Sheet._instance = value;
  }

  public static open(items: SheetItem[], onSelectHandler?: (value: any) => void, title?: string, options?: Options) {
    Sheet._instance && Sheet._instance.open(items, onSelectHandler, title, options);
  }

  private static _instance: Sheet | null;

  ///////////////////////////////////////////////////////////////////

  private _anim = new Animated.Value(1000);
  private _onSelectHandler?: (value: any) => void;
  private _options?: Options;

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      visible: false,
    };
  }

  public open(items: SheetItem[], onSelectHandler?: (value: any) => void, title?: string, option?: Options) {
    this._onSelectHandler = onSelectHandler;
    this._options = option;
    this._anim = new Animated.Value(-Dimensions.get('screen').height);
    Animated.timing(this._anim, {
      toValue: 0,
      duration: ANIM_DURATION,
    }).start();

    this.setState({ items, title, visible: true });
  }

  public close = () => {
    this.setState({ visible: false });
  }

  public render() {
    if (this.state.visible) {
      const containerStyle = StyleSheet.flatten([
        styles.mainContainer,
        { backgroundColor: `${Theme.secondary}${CONTAINER_OPACITY}` },
        this._options && this._options.containerStyle,
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
    const items = this.state.items;

    const menuItems = items.map((item, index) => {
      const { icon, title, value, disabled } = item;
      const containerStyle = StyleSheet.flatten([
        styles.item,
        { backgroundColor: Theme.background },
        this._options && this._options.itemsStyle,
      ]);

      if (title) {
        const color = disabled ? Theme.onSurface : Theme.onBackground;
        return (
          <ListItem
            bottomDivider={this._options && this._options.bottomDivider}
            containerStyle={containerStyle}
            key={index}
            leftIcon={{ type: Theme.iconset, name: icon, color }}
            onPress={disabled ? undefined : this._handleOnPressItem(value)}
            subtitle={item.subtitle}
            title={title}
            titleStyle={{ color }}
          />
        );
      } else {
        return <View key={index} style={{ backgroundColor: Theme.onSurface, ...styles.divider }} />;
      }
    });


    const titleStyle = StyleSheet.flatten([styles.title, { backgroundColor: Theme.background }]);
    const style: ViewStyle = { position: 'absolute', width: '100%' };
    if (this._options && this._options.position === 'top') {
      Object.assign(style, { top: this._anim });
    } else {
      Object.assign(style, { bottom: this._anim });
    }

    const itemsStyle = StyleSheet.flatten([
      style,
      this._options && this._options.itemsStyle,
    ]);
    return (
      <Animated.View style={itemsStyle}>
        {this.state.title && <Text style={titleStyle}>{this.state.title}</Text>}
        {menuItems}
      </Animated.View>
    );
  }

  ///////////////////////////////////////////////////////////////////

  private _handleOnPressItem = (value) => () => {
    this.close();
    this._onSelectHandler && this._onSelectHandler(value);
  }
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
