import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Badge as BBadge } from 'react-native-elements';
import { theme } from './Theme';
export const Badge = (props) => {
    const { containerStyle, textStyle, ...rest } = props;
    const themeContainerStyle = StyleSheet.flatten([{ backgroundColor: theme.secondaryLight }, containerStyle]);
    const themeTextStyle = StyleSheet.flatten([styles.text, { color: theme.secondaryText }, textStyle]);
    return (<BBadge containerStyle={themeContainerStyle} textStyle={themeTextStyle} {...rest}/>);
};
const styles = StyleSheet.create({
    text: {
        fontSize: 12,
    },
});
