import * as React from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon, IconProps } from 'react-native-elements';

import { theme } from './Theme';
import { TouchableFeedback } from './TouchableFeedback';

let Component: any;
const attributes: any = {};

if (Platform.OS === 'android') {
  Component = TouchableNativeFeedback;
  if (Platform.Version >= 21) {
    attributes.background = TouchableNativeFeedback.Ripple(theme.secondary, true);
  } else {
    attributes.background = TouchableNativeFeedback.SelectableBackground();
  }
} else {
  Component = TouchableOpacity;
}

interface TouchableIconProps {
  style?: StyleProp<TextStyle>;
  icon?: IconProps;
  onPress?(): void;
}

export class TouchableIcon extends React.PureComponent<TouchableIconProps, {}> {
  public render() {
    const { style, icon, onPress } = this.props;
    icon && !icon.color && Object.assign(icon, { color: theme.secondary });

    if (onPress) {
      return (
        <TouchableFeedback
          onPress={onPress}
          style={[styles.container, style]}
        >
          <View style={[styles.container, style]} pointerEvents={'box-none'}>
            <Icon {...icon} />
          </View>
        </TouchableFeedback>
      );
    }

    return (
      <View style={[styles.container, style]} pointerEvents={'none'}>
        <Icon {...icon} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minWidth: 48,
    minHeight: 48,
    borderRadius: 18,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
