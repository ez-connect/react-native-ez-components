import * as React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { IconProps } from '../node_modules/react-native-elements/src/index';
interface IProps {
    style?: StyleProp<TextStyle>;
    icon?: IconProps;
    onPress?(): void;
}
export default class TouchableIcon extends React.PureComponent<IProps, {}> {
    render(): JSX.Element;
}
export {};
