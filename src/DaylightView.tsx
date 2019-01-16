import * as React from 'react';

import { Dimensions, StyleSheet, View, ViewProps } from 'react-native';
import { daylight, DaylightEvent } from './Daylight';

export interface IDaylightState extends ViewProps {
  enable: boolean;
  backgroundColor?: string;
  opacity?: number;
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
      const { backgroundColor, opacity } = this.state;
      const style = StyleSheet.flatten([styles.mainContainer, { backgroundColor, opacity }]);
      return <View style={style} pointerEvents='none' {...this.props} />;
    }

    return null;
  }

  private _handleOnDaylightEnableChange = (enable: boolean) => {
    this.setState({ enable });
  }

  private _handleOnDaylightChange = ({ opacity, red, green, blue }) => {
    const backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    this.setState({ opacity, backgroundColor });
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
