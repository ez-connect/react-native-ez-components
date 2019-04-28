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
        const { style, onPress, ...rest } = this.props;
        return <TouchableText onPress={onPress || this._handleOnPress} {...rest}/>;
    }
}
