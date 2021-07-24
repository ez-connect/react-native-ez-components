import * as React from 'react';
import { ViewProps } from 'react-native';
export interface DaylightState extends ViewProps {
    enable: boolean;
    backgroundColor?: string;
}
export declare class DaylightView extends React.PureComponent<ViewProps, DaylightState> {
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private _handleOnDaylightEnableChange;
    private _handleOnDaylightChange;
}
