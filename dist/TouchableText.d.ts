/// <reference types="react" />
import { ITextProps } from './Text';
export interface ITouchableTextProps extends ITextProps {
    onPress(): void;
}
export declare const TouchableText: (props: ITouchableTextProps) => JSX.Element;
