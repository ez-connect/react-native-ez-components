import * as React from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
export class TouchableFeedback extends React.PureComponent {
    static setRippleColor(value) {
        TouchableFeedback._rippleColor = value;
    }
    render() {
        if (Platform.OS === 'android') {
            const background = Platform.Version >= 21
                ? TouchableNativeFeedback.Ripple(TouchableFeedback._rippleColor, false)
                : TouchableNativeFeedback.SelectableBackground();
            return <TouchableNativeFeedback background={background} {...this.props}/>;
        }
        return <TouchableOpacity {...this.props}/>;
    }
}
TouchableFeedback._rippleColor = 'grey';
