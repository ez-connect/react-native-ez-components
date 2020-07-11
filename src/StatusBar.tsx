import * as React from 'react';
import {
  StatusBar as Status,
  StatusBarProps as BProps,
  View,
} from 'react-native';

export interface StatusBarProps extends BProps {
  backgroundColor?: string;
  height: number;
  isIphoneX: boolean;
}

export interface StatusBarState {
  hidden: boolean;
}

export class StatusBar extends React.PureComponent<
  StatusBarProps,
  StatusBarState
> {
  public static setInstance(ref: StatusBar | null) {
    StatusBar._instance = ref;
  }

  public static setHidden(hidden: boolean) {
    StatusBar._instance && StatusBar._instance.setState({hidden});
  }

  private static _instance: StatusBar | null;

  ///////////////////////////////////////////////////////////////////

  constructor(props: StatusBarProps) {
    super(props);
    this.state = {hidden: false};
  }

  public render() {
    const {isIphoneX, height, ...rest} = this.props;
    const statusHeight = isIphoneX ? height : this.state.hidden ? 0 : height;

    return (
      <View
        style={{
          backgroundColor: this.props.backgroundColor,
          height: statusHeight,
        }}>
        <Status hidden={this.state.hidden} {...rest} />
      </View>
    );
  }
}
