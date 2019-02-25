import React from 'react';
export declare class PureComponent<P = {}, S = {}, SS = {}> extends React.PureComponent<P, S, SS> {
    private _isMounted;
    componentDidMount(): void;
    componentWillMount(): void;
    setState(S: any): void;
}
