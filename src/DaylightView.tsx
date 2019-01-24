import * as React from 'react';
import { Dimensions, StyleSheet, View, ViewProps } from 'react-native';

import { daylight, DaylightEvent } from './Daylight';

export interface IDaylightState extends ViewProps {
  enable: boolean;
  backgroundColor?: string;
}

export class DaylightView extends React.PureComponent<ViewProps, IDaylightState> {
  constructor(props) {
    super(props);
    this.state = { enable: false };
  }

  public componentDidMount() {
    daylight.addListener(DaylightEvent.OnEnableChange, this._handleOnDaylightEnableChange);
    daylight.addListener(DaylightEvent.OnChange, this._handleOnDaylightChange);
  }

  public componentWillUnmount() {
    daylight.removeAllListeners();
  }

  public render() {
    if (this.state.enable) {
      const { backgroundColor } = this.state;
      const style = StyleSheet.flatten([styles.mainContainer, { backgroundColor }]);
      return <View style={style} pointerEvents='none' {...this.props} />;
    }

    return null;
  }

  private _handleOnDaylightEnableChange = (enable: boolean) => {
    this.setState({ enable });
  }

  private _handleOnDaylightChange = ({ color }) => {
    const { red, green, blue, alpha } = color;
    const backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    this.setState({ backgroundColor });
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
