import * as React from 'react';
import { ScrollViewProps } from 'react-native';
interface Props extends ScrollViewProps {
    children?: React.ReactNode;
}
export declare const ScrollView: (props: Props) => JSX.Element;
export {};
