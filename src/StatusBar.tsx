import * as React from 'react';
import { StatusBar as Status, StatusBarProps as BProps, View } from 'react-native';
import { Theme, ThemeEvent } from './Theme';

export interface StatusBarProps extends BProps {
  height: number;
  isIphoneX: boolean;
}

export interface StatusBarState {
  hidden: boolean;
}

export class StatusBar extends React.PureComponent<StatusBarProps, StatusBarState>  {
  public static setInstance(ref: StatusBar | null) {
    StatusBar.s_instance = ref;
  }

  public static setHidden(hidden: boolean) {
    StatusBar.s_instance && StatusBar.s_instance.setState({ hidden });
  }

  // tslint:disable-next-line:variable-name
  private static s_instance: StatusBar | null;

  ///////////////////////////////////////////////////////////////////

  constructor(props: StatusBarProps) {
    super(props);
    this.state = { hidden: false };
  }

  public componentDidMount() {
    Theme.addListener(ThemeEvent.OnChange, this._handleOnThemeChange);
  }

  public componentWillUnmount() {
    Theme.removeListener(ThemeEvent.OnChange, this._handleOnThemeChange);
  }

  public render() {
    const { isIphoneX, ...rest } = this.props;
    let { backgroundColor, height } = this.props;
    backgroundColor = backgroundColor || Theme.primaryDark;
    height = isIphoneX ? height : this.state.hidden ? 0 : height;

    return (
      <View style={{ backgroundColor, height }}>
        <Status hidden={this.state.hidden} {...rest} />
      </View>
    );
  }

  ///////////////////////////////////////////////////////////////////

  private _handleOnThemeChange = () => {
    this.forceUpdate();
  }
}
