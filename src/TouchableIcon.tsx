import * as React from 'react';
import { StyleSheet} from 'react-native';
import { Icon, IconProps } from 'react-native-elements';

import { TouchableFeedback } from './TouchableFeedback';
import { View } from './View';

interface TouchableIconProps extends IconProps {
  onPress: () => void;
}

export class TouchableIcon extends React.PureComponent<TouchableIconProps, {}> {
  public render() {
    const { onPress, ...rest } = this.props;
    return (
      <TouchableFeedback
        onPress={onPress}
        style={styles.container}
      >
        <View style={styles.container} pointerEvents={'box-none'}>
          <Icon {...rest} />
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
