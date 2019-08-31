import * as React from 'react';
import { Linking, TextProps, TextStyle } from 'react-native';

import { TouchableText } from './TouchableText';

interface Props extends TextProps {
  style: TextStyle;
  url?: string;
}

export class Hyperlink extends React.PureComponent<Props> {
  public render() {
    const { onPress, ...rest } = this.props;
    return <TouchableText onPress={onPress || this._handleOnPress} {...rest} />;
  }

  private _handleOnPress = () => {
    Linking.openURL(this.props.url);
  }
}
