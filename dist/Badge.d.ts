/// <reference types="react" />
import { BadgeProps } from '../node_modules/react-native-elements/src/index';
export interface IBadgeProps extends BadgeProps {
    clear?: boolean;
}
export declare const Badge: (props: IBadgeProps) => JSX.Element;
