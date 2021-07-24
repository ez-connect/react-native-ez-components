import * as React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface Props extends TouchableNativeFeedbackProps, TouchableOpacityProps {
  backgroundColor?: string;
}

export class TouchableFeedback extends React.PureComponent<Props, {}> {
  public static setRippleColor(value: string) {
    TouchableFeedback._rippleColor = value;
  }

  private static _rippleColor: string = 'grey';

  public render() {
    if (Platform.OS === 'android') {
      const background =
        Platform.Version >= 21
          ? TouchableNativeFeedback.Ripple(
              TouchableFeedback._rippleColor,
              false,
            )
          : TouchableNativeFeedback.SelectableBackground();
      return (
        <TouchableNativeFeedback background={background} {...this.props} />
      );
    }

    return <TouchableOpacity {...this.props} />;
  }
}
