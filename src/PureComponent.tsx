import React from 'react';

export class PureComponent<P = {}, S = {}, SS = {}> extends React.PureComponent<P, S, SS> {
  private _isMounted = false;

  public componentDidMount() {
    this._isMounted = true;
  }

  public componentWillMount() {
    this._isMounted = false;
  }

  public setState(S) {
    if (this._isMounted) {
      super.setState(S);
    }
  }
}
