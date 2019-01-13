/// <reference types="react" />
import { ViewStyle } from 'react-native';
interface IProps {
    style: ViewStyle;
    isPrimary: boolean;
    isSecondary: boolean;
}
export declare const View: (props: IProps) => JSX.Element;
export {};
