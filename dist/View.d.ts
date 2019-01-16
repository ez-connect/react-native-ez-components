/// <reference types="react" />
import { ViewProps, ViewStyle } from 'react-native';
interface IViewProps extends ViewProps {
    style?: ViewStyle;
    primary?: boolean;
    secondary?: boolean;
    children?: any;
}
export declare const View: (props: IViewProps) => JSX.Element;
export {};
