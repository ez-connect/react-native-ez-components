import * as React from 'react';
import { StatusBar as Status, View } from 'react-native';
export class StatusBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { hidden: false };
    }
    static setInstance(ref) {
        StatusBar._instance = ref;
    }
    static setHidden(hidden) {
        StatusBar._instance && StatusBar._instance.setState({ hidden });
    }
    render() {
        const { isIphoneX, height, ...rest } = this.props;
        const statusHeight = isIphoneX ? height : this.state.hidden ? 0 : height;
        return (<View style={{ height: statusHeight }}>
        <Status hidden={this.state.hidden} {...rest}/>
      </View>);
    }
}
