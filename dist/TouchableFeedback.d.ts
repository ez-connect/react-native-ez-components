import * as React from 'react';
import { TouchableNativeFeedbackProps, TouchableOpacityProps } from 'react-native';
interface Props extends TouchableNativeFeedbackProps, TouchableOpacityProps {
    backgroundColor?: string;
}
export declare class TouchableFeedback extends React.PureComponent<Props, {}> {
    static setRippleColor(value: string): void;
    private static _rippleColor;
    render(): JSX.Element;
}
export {};
