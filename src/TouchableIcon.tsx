import * as React from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { IconProps } from '../node_modules/react-native-elements/src/index';
import theme from './Theme';

let Component: any;
const attributes: any = {};

if (Platform.OS === 'android') {
  Component = TouchableNativeFeedback;
  if (Platform.Version >= 21) {
    attributes.background = TouchableNativeFeedback.Ripple('ThemeAttrAndroid', true);
  } else {
    attributes.background = TouchableNativeFeedback.SelectableBackground();
  }
} else {
  Component = TouchableHighlight;
}

interface IProps {
  style?: StyleProp<TextStyle>;
  icon?: IconProps;
  onPress?(): void;
}

export default class TouchableIcon extends React.PureComponent<IProps, {}> {
  public render() {
    const { style, icon, onPress } = this.props;
    icon && !icon.color && Object.assign(icon, { color: theme.secondary });

    if (onPress) {
      return (
        <Component
          {...attributes}
          underlayColor='transparent'
          onPress={onPress}
          style={[styles.container, style]}
        >
          <View style={[styles.container, style]} pointerEvents={'box-none'}>
            <Icon {...icon} />
          </View>
        </Component>
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
