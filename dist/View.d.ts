/// <reference types="react" />
import { ViewStyle } from 'react-native';
interface IViewProps {
    style?: ViewStyle;
    primary?: boolean;
    secondary?: boolean;
    children?: any;
}
export declare const View: (props: IViewProps) => JSX.Element;
export {};
