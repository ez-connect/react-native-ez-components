import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableFeedback } from './TouchableFeedback';
export class TouchableIcon extends React.PureComponent {
    render() {
        const { onPress, ...rest } = this.props;
        return (<TouchableFeedback onPress={onPress} style={styles.container}>
        <View style={styles.container} pointerEvents={'box-none'}>
          <Icon type='ionicon' {...rest}/>
        </View>
      </TouchableFeedback>);
    }
}
const styles = StyleSheet.create({
    container: {
        minWidth: 48,
        minHeight: 48,
        justifyContent: 'center',
        alignContent: 'center',
    },
});
