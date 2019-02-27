import * as React from 'react';
import { ViewProps, ViewStyle } from 'react-native';
interface SafeAreaViewProps extends ViewProps {
    style?: ViewStyle;
    children?: React.ReactNode;
}
export declare const SafeAreaView: (props: SafeAreaViewProps) => JSX.Element;
export {};
