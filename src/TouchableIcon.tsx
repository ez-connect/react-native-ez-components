import * as React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
} from 'react-native';
import { Icon, IconProps } from 'react-native-elements';

import { theme } from './Theme';
import { TouchableFeedback } from './TouchableFeedback';

interface TouchableIconProps extends IconProps {
  style?: StyleProp<TextStyle>;
  onPress: () => void;
}

export class TouchableIcon extends React.PureComponent<TouchableIconProps, {}> {
  public render() {
    const { style, name, color, disabled, onPress, ...rest } = this.props;
    const themeColor = color || (disabled ? theme.secondaryLight : theme.secondary);

    return (
      <TouchableFeedback
        onPress={onPress}
        style={[styles.container, style]}
      >
        <View style={[styles.container, style]} pointerEvents={'box-none'}>
          <Icon name={name} color={themeColor} {...rest} />
        </View>
      </TouchableFeedback>
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
