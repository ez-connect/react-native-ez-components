import * as React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { IconProps } from 'react-native-elements';
interface TouchableIconProps {
    style?: StyleProp<TextStyle>;
    icon?: IconProps;
    onPress?: () => any;
}
export declare class TouchableIcon extends React.PureComponent<TouchableIconProps, {}> {
    render(): JSX.Element;
}
export {};
