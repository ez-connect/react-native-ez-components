/// <reference types="react" />
import { ViewProps, ViewStyle } from 'react-native';
interface SafeAreaViewProps extends ViewProps {
    style?: ViewStyle;
    children?: any;
}
export declare const SafeAreaView: (props: SafeAreaViewProps) => JSX.Element;
export {};
