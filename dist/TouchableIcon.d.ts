import * as React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { IconProps } from 'react-native-elements';
interface IProps {
    style?: StyleProp<TextStyle>;
    icon?: IconProps;
    onPress?(): void;
}
export declare class TouchableIcon extends React.PureComponent<IProps, {}> {
    render(): JSX.Element;
}
export {};
