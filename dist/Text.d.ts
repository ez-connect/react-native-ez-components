/// <reference types="react" />
import { TextStyle } from 'react-native';
interface IProps {
    style?: TextStyle;
    isPrimary?: boolean;
    isSecondary?: boolean;
    isSurface?: boolean;
    fontSize?: number;
    fontStyle?: 'normal' | 'italic';
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}
export declare const Text: (props: IProps) => JSX.Element;
export {};
