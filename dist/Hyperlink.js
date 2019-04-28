import * as React from 'react';
import { Linking } from 'react-native';
import { TouchableText } from './TouchableText';
export class Hyperlink extends React.PureComponent {
    constructor() {
        super(...arguments);
        this._handleOnPress = () => {
            Linking.openURL(this.props.url);
        };
    }
    render() {
        return <TouchableText onPress={this._handleOnPress} {...this.props}/>;
    }
}
