import * as React from 'react';
import { Linking, StyleSheet, TextProps, TextStyle } from 'react-native';

import { Text } from './Text';
import { Theme } from './Theme';

interface Props extends TextProps {
  style: TextStyle;
  url?: string;
}

export class Hyperlink extends React.PureComponent<Props> {
  public render() {
    const { style, onPress, ...rest } = this.props;
    const themeStyle = StyleSheet.flatten([{ color: Theme.secondary }, style]);
    return <Text style={themeStyle} onPress={onPress || this._handleOnPress} {...rest} />;
  }

  private _handleOnPress = () => {
    Linking.openURL(this.props.url);
  }
}
