/// <reference types="react" />
import { ButtonProps } from '../node_modules/react-native-elements/src/index';
export interface IButtonProps extends ButtonProps {
    clear?: boolean;
}
export declare const Button: (props: IButtonProps) => JSX.Element;
