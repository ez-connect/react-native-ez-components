import * as React from 'react';
import { StatusBar as Status, View } from 'react-native';
export class StatusBar extends React.PureComponent {
    static setInstance(ref) {
        StatusBar.s_instance = ref;
    }
    static setHidden(hidden) {
        StatusBar.s_instance.setState({ hidden });
    }
    constructor(props) {
        super(props);
        this.state = { hidden: false };
    }
    render() {
        const height = this.props.isIphoneX ? this.props.height : this.state.hidden ? 0 : this.props.height;
        return (<View style={{ height }}>
        <Status hidden={this.state.hidden}/>
      </View>);
    }
}
