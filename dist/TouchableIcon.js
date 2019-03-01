import * as React from 'react';
import { StyleSheet, View, } from 'react-native';
import { Icon } from 'react-native-elements';
import { theme } from './Theme';
import { TouchableFeedback } from './TouchableFeedback';
export class TouchableIcon extends React.PureComponent {
    render() {
        const { style, icon, onPress } = this.props;
        icon && !icon.color && Object.assign(icon, { color: theme.secondary });
        if (onPress) {
            return (<TouchableFeedback onPress={onPress} style={[styles.container, style]}>
          <View style={[styles.container, style]} pointerEvents={'box-none'}>
            <Icon {...icon}/>
          </View>
        </TouchableFeedback>);
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
