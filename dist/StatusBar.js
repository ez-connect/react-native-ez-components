import * as React from 'react';
import { StatusBar as Status, View, } from 'react-native';
export class StatusBar extends React.PureComponent {
    static setInstance(ref) {
        StatusBar._instance = ref;
    }
    static setHidden(hidden) {
        StatusBar._instance && StatusBar._instance.setState({ hidden });
    }
    static _instance;
    constructor(props) {
        super(props);
        this.state = { hidden: false };
    }
    render() {
        const { isIphoneX, height, ...rest } = this.props;
        const statusHeight = isIphoneX ? height : this.state.hidden ? 0 : height;
        return (<View style={{
                backgroundColor: this.props.backgroundColor,
                height: statusHeight,
            }}>
        <Status hidden={this.state.hidden} {...rest}/>
      </View>);
    }
}
