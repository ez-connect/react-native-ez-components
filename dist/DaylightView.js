import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { daylight, DaylightEvent } from './Daylight';
export class DaylightView extends React.PureComponent {
    constructor(props) {
        super(props);
        this._handleOnDaylightEnableChange = (enable) => {
            this.setState({ enable });
        };
        this._handleOnDaylightChange = ({ color }) => {
            const { red, green, blue, alpha } = color;
            const backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
            this.setState({ backgroundColor });
        };
        this.state = { enable: false };
    }
    componentDidMount() {
        daylight.addListener(DaylightEvent.OnEnableChange, this._handleOnDaylightEnableChange);
        daylight.addListener(DaylightEvent.OnChange, this._handleOnDaylightChange);
    }
    componentWillUnmount() {
        daylight.removeAllListeners();
    }
    render() {
        if (this.state.enable) {
            const { backgroundColor } = this.state;
            const style = StyleSheet.flatten([styles.mainContainer, { backgroundColor }]);
            return <View style={style} pointerEvents='none' {...this.props}/>;
        }
        return null;
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
});
