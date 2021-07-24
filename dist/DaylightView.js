import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Daylight, DaylightEvent } from './Daylight';
export class DaylightView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { enable: false };
    }
    componentDidMount() {
        Daylight.addListener(DaylightEvent.OnEnableChange, this._handleOnDaylightEnableChange);
        Daylight.addListener(DaylightEvent.OnChange, this._handleOnDaylightChange);
    }
    componentWillUnmount() {
        Daylight.removeAllListeners();
    }
    render() {
        if (this.state.enable) {
            const { backgroundColor } = this.state;
            const style = StyleSheet.flatten([
                styles.mainContainer,
                { backgroundColor },
            ]);
            return <View style={style} pointerEvents="none" {...this.props}/>;
        }
        return null;
    }
    _handleOnDaylightEnableChange = (enable) => {
        this.setState({ enable });
    };
    _handleOnDaylightChange = ({ color }) => {
        const { red, green, blue, alpha } = color;
        const backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        this.setState({ backgroundColor });
    };
}
const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
});
