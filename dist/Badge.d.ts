/// <reference types="react" />
import { BadgeProps } from 'react-native-elements';
export interface IBadgeProps extends BadgeProps {
    clear?: boolean;
}
export declare const Badge: (props: IBadgeProps) => JSX.Element;
