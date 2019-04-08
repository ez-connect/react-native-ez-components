import * as React from 'react';
import { StatusBar as Status, View } from 'react-native';
import { Theme, ThemeEvent } from './Theme';
export class StatusBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this._handleOnThemeChange = () => {
            this.forceUpdate();
        };
        this.state = { hidden: false };
    }
    static setInstance(ref) {
        StatusBar.s_instance = ref;
    }
    static setHidden(hidden) {
        StatusBar.s_instance && StatusBar.s_instance.setState({ hidden });
    }
    componentDidMount() {
        Theme.addListener(ThemeEvent.OnChange, this._handleOnThemeChange);
    }
    componentWillUnmount() {
        Theme.removeListener(ThemeEvent.OnChange, this._handleOnThemeChange);
    }
    render() {
        const { isIphoneX, ...rest } = this.props;
        let { backgroundColor, height } = this.props;
        backgroundColor = backgroundColor || Theme.primaryDark;
        height = isIphoneX ? height : this.state.hidden ? 0 : height;
        return (<View style={{ backgroundColor, height }}>
        <Status hidden={this.state.hidden} {...rest}/>
      </View>);
    }
}
