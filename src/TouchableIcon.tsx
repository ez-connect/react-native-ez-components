import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, IconProps} from 'react-native-elements';

import {Theme} from './Theme';
import {TouchableFeedback} from './TouchableFeedback';

interface TouchableIconProps extends IconProps {
  onPress: () => void;
}

export class TouchableIcon extends React.PureComponent<TouchableIconProps, {}> {
  public render() {
    const {color, reverse, reverseColor, onPress, ...rest} = this.props;
    const themeColor = color || Theme.secondary;
    const themeReverseColor = reverse && (reverseColor || Theme.onSecondary);
    return (
      <TouchableFeedback onPress={onPress} style={styles.container}>
        <View style={styles.container} pointerEvents={'box-none'}>
          <Icon
            color={themeColor}
            reverse={reverse}
            reverseColor={themeReverseColor}
            {...rest}
          />
        </View>
      </TouchableFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minWidth: 48,
    minHeight: 48,
    // borderRadius: 24, // TouchableNativeFeedback.Ripple(color, true) to enable
    justifyContent: 'center',
    alignContent: 'center',
  },
});
