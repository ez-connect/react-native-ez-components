import * as React from 'react';
import { IconProps } from 'react-native-elements';
interface TouchableIconProps extends IconProps {
    onPress: () => void;
}
export declare class TouchableIcon extends React.PureComponent<TouchableIconProps, {}> {
    render(): JSX.Element;
}
export {};
