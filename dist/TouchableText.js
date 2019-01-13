import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from './Text';
import theme from './Theme';
import { TouchableFeedback } from './TouchableFeedback';
export const TouchableText = (props) => {
    const { style, onPress, ...rest } = props;
    const themeStyle = StyleSheet.flatten([
        { color: theme.secondary },
        styles.container,
        style && style,
    ]);
    return (<TouchableFeedback onPress={onPress}>
      <View>
        <Text style={themeStyle} {...rest}/>
      </View>
    </TouchableFeedback>);
};
const styles = StyleSheet.create({
    container: {
        paddingTop: 6,
        paddingBottom: 6,
    },
});
