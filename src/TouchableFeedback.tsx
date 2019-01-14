import * as React from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import theme from './Theme';

let Component;

if (Platform.OS === 'android') {
  Component = TouchableNativeFeedback;
} else {
  Component = TouchableOpacity;
}

export class TouchableFeedback extends React.PureComponent<TouchableOpacityProps, {}> {
  public static getAttribs(color: string) {
    if (Platform.OS === 'android') {
      const attributes: any = {};
      if (Platform.Version >= 21) {
        attributes.background = TouchableNativeFeedback.Ripple(color, true);
      } else {
        attributes.background = TouchableNativeFeedback.SelectableBackground();
      }

      return attributes;
    }

    return undefined;
  }

  public render() {
    const attributes = TouchableFeedback.getAttribs(theme.secondary);
    return <Component {...attributes} {...this.props} />;
  }
}
