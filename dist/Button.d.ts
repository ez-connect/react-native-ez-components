/// <reference types="react" />
import { ButtonProps as BProps } from 'react-native-elements';
export interface ButtonProps extends BProps {
    clear?: boolean;
}
export declare const Button: (props: ButtonProps) => JSX.Element;
