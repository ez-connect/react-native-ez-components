import { ViewProps as BProps, ViewStyle } from 'react-native';
interface ViewProps extends BProps {
    style?: ViewStyle;
    primary?: boolean;
    secondary?: boolean;
    children?: any;
}
export declare const View: (props: ViewProps) => JSX.Element;
export {};
