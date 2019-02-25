/// <reference types="react" />
import { TextProps } from './Text';
export interface TouchableTextProps extends TextProps {
    onPress: () => void;
}
export declare const TouchableText: (props: TouchableTextProps) => JSX.Element;
