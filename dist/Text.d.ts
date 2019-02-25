import * as React from 'react';
import { TextProps as BProps, TextStyle } from 'react-native';
export interface TextProps extends BProps {
    style?: TextStyle;
    primary?: boolean;
    secondary?: boolean;
    surface?: boolean;
    fontSize?: number;
    fontStyle?: 'normal' | 'italic';
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
    children?: React.ReactNode;
}
export declare const Text: (props: TextProps) => JSX.Element;
