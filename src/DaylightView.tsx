import * as React from 'react';
import {Dimensions, StyleSheet, View, ViewProps} from 'react-native';

import {Daylight, DaylightEvent} from './Daylight';

export interface DaylightState extends ViewProps {
  enable: boolean;
  backgroundColor?: string;
}

export class DaylightView extends React.PureComponent<
  ViewProps,
  DaylightState
> {
  constructor(props) {
    super(props);
    this.state = {enable: false};
  }

  public componentDidMount() {
    Daylight.addListener(
      DaylightEvent.OnEnableChange,
      this._handleOnDaylightEnableChange,
    );
    Daylight.addListener(DaylightEvent.OnChange, this._handleOnDaylightChange);
  }

  public componentWillUnmount() {
    Daylight.removeAllListeners();
  }

  public render() {
    if (this.state.enable) {
      const {backgroundColor} = this.state;
      const style = StyleSheet.flatten([
        styles.mainContainer,
        {backgroundColor},
      ]);
      return <View style={style} pointerEvents="none" {...this.props} />;
    }

    return null;
  }

  private _handleOnDaylightEnableChange = (enable: boolean) => {
    this.setState({enable});
  };

  private _handleOnDaylightChange = ({color}) => {
    const {red, green, blue, alpha} = color;
    const backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    this.setState({backgroundColor});
  };
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
});
