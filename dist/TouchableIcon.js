import * as React from 'react';
import { Platform, StyleSheet, TouchableHighlight, TouchableNativeFeedback, View, } from 'react-native';
import { Icon } from 'react-native-elements';
import theme from './Theme';
let Component;
const attributes = {};
if (Platform.OS === 'android') {
    Component = TouchableNativeFeedback;
    if (Platform.Version >= 21) {
        attributes.background = TouchableNativeFeedback.Ripple('ThemeAttrAndroid', true);
    }
    else {
        attributes.background = TouchableNativeFeedback.SelectableBackground();
    }
}
else {
    Component = TouchableHighlight;
}
export default class TouchableIcon extends React.PureComponent {
    render() {
        const { style, icon, onPress } = this.props;
        icon && !icon.color && Object.assign(icon, { color: theme.secondary });
        if (onPress) {
            return (<Component {...attributes} underlayColor='transparent' onPress={onPress} style={[styles.container, style]}>
          <View style={[styles.container, style]} pointerEvents={'box-none'}>
            <Icon {...icon}/>
          </View>
        </Component>);
        }
        return (<View style={[styles.container, style]} pointerEvents={'none'}>
        <Icon {...icon}/>
      </View>);
    }
}
const styles = StyleSheet.create({
    container: {
        minWidth: 48,
        minHeight: 48,
        borderRadius: 18,
        justifyContent: 'center',
        alignContent: 'center',
    },
});
