import * as React from 'react';
import { TouchableNativeFeedbackProps, TouchableOpacityProps } from 'react-native';
export declare class TouchableFeedback extends React.PureComponent<TouchableNativeFeedbackProps | TouchableOpacityProps, {}> {
    static setRippleColor(value: string): void;
    private static _rippleColor;
    render(): JSX.Element;
}
