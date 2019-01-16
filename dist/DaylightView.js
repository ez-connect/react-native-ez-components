import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { daylight, DaylightEvent } from './Daylight';
export class DaylightView extends React.PureComponent {
    constructor(props) {
        super(props);
        this._handleOnDaylightEnableChange = (enable) => {
            this.setState({ enable });
        };
        this._handleOnDaylightChange = ({ opacity, red, green, blue }) => {
            const backgroundColor = `rgb(${red}, ${green}, ${blue})`;
            this.setState({ opacity, backgroundColor });
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
            const { backgroundColor, opacity } = this.state;
            const style = StyleSheet.flatten([styles.mainContainer, { backgroundColor, opacity }]);
            return <View style={style} pointerEvents='none' {...this.props}/>;
        }
        return null;
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
