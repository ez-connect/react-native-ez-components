import * as React from 'react';
import { StatusBar as Status, StatusBarProps, View } from 'react-native';
import { theme, ThemeEvent } from './Theme';

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

  public componentDidMount() {
    theme.addListener(ThemeEvent.OnChange, this._handleOnThemeChange);
  }

  public componentWillUnmount() {
    theme.removeListener(ThemeEvent.OnChange, this._handleOnThemeChange);
  }

  public render() {
    const { isIphoneX, ...rest } = this.props;
    let { backgroundColor, height } = this.props;
    backgroundColor = backgroundColor || theme.primaryDark;
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
