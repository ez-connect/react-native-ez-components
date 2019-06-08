/// <reference types="react" />
import { BadgeProps as BProps } from 'react-native-elements';
export interface BadgeProps extends BProps {
    clear?: boolean;
}
export declare const Badge: (props: BadgeProps) => JSX.Element;
