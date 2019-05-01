import * as React from 'react';
import { Platform, TouchableNativeFeedback, TouchableNativeFeedbackProps, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Theme } from './Theme';

interface Props extends TouchableNativeFeedbackProps, TouchableOpacityProps {
  backgroundColor: string;
}

export class TouchableFeedback extends React.PureComponent<TouchableNativeFeedbackProps | TouchableOpacityProps, {}> {
  public render() {
    if (Platform.OS === 'android') {
      const background = Platform.Version >= 21
        ? TouchableNativeFeedback.Ripple(Theme.secondary, false)
        : TouchableNativeFeedback.SelectableBackground();
      return <TouchableNativeFeedback background={background} {...this.props} />;
    }

    return <TouchableOpacity {...this.props} />;
  }
}
