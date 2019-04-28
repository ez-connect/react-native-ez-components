import * as React from 'react';
import { TextProps, TextStyle } from 'react-native';
interface Props extends TextProps {
    style: TextStyle;
    url?: string;
}
export declare class Hyperlink extends React.PureComponent<Props> {
    render(): JSX.Element;
    private _handleOnPress;
}
export {};
