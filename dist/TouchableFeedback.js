import * as React from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { Theme } from './Theme';
export class TouchableFeedback extends React.PureComponent {
    render() {
        if (Platform.OS === 'android') {
            const background = Platform.Version >= 21
                ? TouchableNativeFeedback.Ripple(Theme.secondary, false)
                : TouchableNativeFeedback.SelectableBackground();
            return <TouchableNativeFeedback background={background} {...this.props}/>;
        }
        return <TouchableOpacity {...this.props}/>;
    }
}
