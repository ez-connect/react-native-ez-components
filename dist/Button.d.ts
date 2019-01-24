/// <reference types="react" />
import { ButtonProps } from 'react-native-elements';
export interface IButtonProps extends ButtonProps {
    clear?: boolean;
}
export declare const Button: (props: IButtonProps) => JSX.Element;
