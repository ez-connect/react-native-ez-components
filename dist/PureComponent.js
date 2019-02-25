import React from 'react';
export class PureComponent extends React.PureComponent {
    constructor() {
        super(...arguments);
        this._isMounted = false;
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillMount() {
        this._isMounted = false;
    }
    setState(S) {
        if (this._isMounted) {
            super.setState(S);
        }
    }
}
