import * as React from 'react';
import { StyleSheet } from 'react-native';
import { IconProps } from 'react-native-elements';
import Modal from 'react-native-modal';

import { ListItem } from './ListItem';
import { Text } from './Text';
import { theme } from './Theme';
import {TouchableIcon} from './TouchableIcon';
import { View } from './View';

export interface PopupMenuItem {
  icon?: string;
  title?: string;
  subtitle?: string;
  value?: string|number;
  component?: Element;
  disabled?: boolean;
}

export interface PopupMenuProps {
  icon?: IconProps;
  header?: string;
  items: PopupMenuItem[];
  onSelect?(value: string|number): void;
}

export interface PopupMenuState {
  visible?: boolean;
}

export class PopupMenu extends React.PureComponent<PopupMenuProps, PopupMenuState> {
  constructor(props: PopupMenuProps) {
    super(props);
    this.state = { visible: false };
  }

  public show() {
    this.setState({ visible: true });
  }

  public hide() {
    this.setState({ visible: false });
  }

  public render() {
    return (
      <View style={styles.mainContainer}>
        {this._renderIcon()}
        <Modal
          isVisible={this.state.visible}
          style={styles.mainContainer}
          animationIn='zoomInDown'
          animationOut='zoomOutUp'
          backdropColor={theme.secondary}
          backdropOpacity={0.4}
          onBackdropPress={this._handleOnHide}
          onBackButtonPress={this._handleOnHide}
        >
          <View>{this._renderItems()}</View>
        </Modal>
      </View>
    );
  }

  ///////////////////////////////////////////////////////////////////

  private _renderIcon() {
    if (this.props.icon) {
      return (
        <TouchableIcon
          icon={this.props.icon || { name: 'sort', color: theme.primaryText }}
          onPress={this._handleOnShow}
        />
      );
    }

    return null;
  }

  private _renderItems() {
    if (this.state.visible) {
      const { header, items } = this.props;
      const menuItems = items.map((item, index) => {
        const { icon, title, value, component, disabled } = item;
        if (title) {
          const color = disabled ? theme.surfaceText : theme.backgroundText;
          return (
            <ListItem
              key={index}
              leftIcon={{ name: icon, color }}
              title={title}
              titleStyle={{ color }}
              bottomDivider={true}
              subtitle={item.subtitle}
              onPress={disabled ? null : this._handleOnPressItem(value)}
            />
          );
        } else if (component) {
          return component;
        }
      });

      const headerStyle = { backgroundColor: theme.primaryDark, color: theme.primaryText };
      return (
        <View>
          <Text style={StyleSheet.flatten([styles.header, headerStyle])} fontWeight='bold' fontSize={16}>
            {header}
          </Text>
          {menuItems}
        </View>
      );
    }

    return null;
  }

  ///////////////////////////////////////////////////////////////////

  private _handleOnHide = () => {
    this.hide();
  }

  private _handleOnShow = () => {
    this.show();
  }

  private _handleOnPressItem = (value: string|number) => () => {
    this.hide();

    // iOS will be freezed if call Alert after hide the Modal
    // https://github.com/facebook/react-native/issues/10471
    setTimeout(() => this.props.onSelect(value), 500);
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'transparent',
  },
  header: {
    padding: 18,
  },
});
