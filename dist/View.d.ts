/// <reference types="react" />
import { ViewStyle } from 'react-native';
interface IViewProps {
    style?: ViewStyle;
    isPrimary?: boolean;
    isSecondary?: boolean;
    children?: any;
}
export declare const View: (props: IViewProps) => JSX.Element;
export {};
