import * as React from 'react';
import { TouchableTextProps } from './TouchableText';
interface Props extends TouchableTextProps {
    url: string;
}
export declare class Hyperlink extends React.PureComponent<Props> {
    render(): JSX.Element;
    private _handleOnPress;
}
export {};
