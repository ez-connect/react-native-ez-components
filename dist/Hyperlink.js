import * as React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Text } from './Text';
import { Theme } from './Theme';
export class Hyperlink extends React.PureComponent {
    constructor() {
        super(...arguments);
        this._handleOnPress = () => {
            Linking.openURL(this.props.url);
        };
    }
    render() {
        const { style, onPress, ...rest } = this.props;
        const themeStyle = StyleSheet.flatten([{ color: Theme.secondary }, style]);
        return <Text style={themeStyle} onPress={onPress || this._handleOnPress} {...rest}/>;
    }
}
