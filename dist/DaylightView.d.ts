import * as React from 'react';
import { ViewProps } from 'react-native';
export interface IDaylightState extends ViewProps {
    enable: boolean;
    backgroundColor?: string;
}
export declare class DaylightView extends React.PureComponent<ViewProps, IDaylightState> {
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private _handleOnDaylightEnableChange;
    private _handleOnDaylightChange;
}
