import * as React from 'react';
import { StyleSheet, View, } from 'react-native';
import { Icon } from 'react-native-elements';
import { theme } from './Theme';
import { TouchableFeedback } from './TouchableFeedback';
export class TouchableIcon extends React.PureComponent {
    render() {
        const { style, name, color, onPress, ...rest } = this.props;
        const themeColor = color || theme.secondary;
        return (<TouchableFeedback onPress={onPress} style={[styles.container, style]}>
        <View style={[styles.container, style]} pointerEvents={'box-none'}>
          <Icon name={name} color={themeColor} {...rest}/>
        </View>
      </TouchableFeedback>);
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
