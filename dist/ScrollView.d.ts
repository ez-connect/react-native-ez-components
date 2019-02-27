import * as React from 'react';
import { ScrollViewProps, ViewStyle } from 'react-native';
interface ScrollViewExProps extends ScrollViewProps {
    style?: ViewStyle;
    children?: React.ReactNode;
}
export declare const ScrollView: (props: ScrollViewExProps) => JSX.Element;
export {};
