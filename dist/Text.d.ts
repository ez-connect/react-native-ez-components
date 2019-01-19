/// <reference types="react" />
import { TextProps, TextStyle } from 'react-native';
export interface ITextProps extends TextProps {
    style?: TextStyle;
    color?: string;
    primary?: boolean;
    secondary?: boolean;
    surface?: boolean;
    fontSize?: number;
    fontStyle?: 'normal' | 'italic';
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}
export declare const Text: (props: ITextProps) => JSX.Element;
