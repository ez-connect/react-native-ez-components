import * as React from 'react';
import { StatusBar as Status, StatusBarProps, View } from 'react-native';
import { theme } from './Theme';

export interface IStatusBarProps extends StatusBarProps {
  height: number;
  isIphoneX: boolean;
}

export interface IStatusBarState {
  hidden: boolean;
}

export class StatusBar extends React.PureComponent<IStatusBarProps, IStatusBarState>  {
  public static setInstance(ref: StatusBar) {
    StatusBar.s_instance = ref;
  }

  public static setHidden(hidden: boolean) {
    StatusBar.s_instance.setState({ hidden });
  }

  // tslint:disable-next-line:variable-name
  private static s_instance;

  ///////////////////////////////////////////////////////////////////

  constructor(props: IStatusBarProps) {
    super(props);
    this.state = { hidden: false };
  }

  public render() {
    const height = this.props.isIphoneX ? this.props.height : this.state.hidden ? 0 : this.props.height;
    return (
      <View style={{ height }}>
        <Status hidden={this.state.hidden} />
      </View>
    );
  }
}
