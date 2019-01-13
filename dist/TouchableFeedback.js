import * as React from 'react';
import { Platform, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
import theme from './Theme';
let Component;
if (Platform.OS === 'android') {
    Component = TouchableNativeFeedback;
}
else {
    Component = TouchableHighlight;
}
export class TouchableFeedback extends React.PureComponent {
    static getAttribs(color) {
        if (Platform.OS === 'android') {
            const attributes = {};
            if (Platform.Version >= 21) {
                attributes.background = TouchableNativeFeedback.Ripple(color, true);
            }
            else {
                attributes.background = TouchableNativeFeedback.SelectableBackground();
            }
            return attributes;
        }
        return undefined;
    }
    render() {
        const attributes = TouchableFeedback.getAttribs(theme.secondary);
        return <Component {...attributes} {...this.props}/>;
    }
}
