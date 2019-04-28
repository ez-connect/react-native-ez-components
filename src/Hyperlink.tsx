import * as React from 'react';
import { Linking } from 'react-native';

import { TouchableText, TouchableTextProps } from './TouchableText';

interface Props extends TouchableTextProps {
  url: string;
}

export class Hyperlink extends React.PureComponent<Props> {
  public render() {
    return <TouchableText onPress={this._handleOnPress} {...this.props} />;
  }

  private _handleOnPress = () => {
    Linking.openURL(this.props.url);
  }
}
