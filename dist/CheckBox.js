import * as React from 'react';
import { CheckBox as BCheckBox } from 'react-native-elements';
import { theme } from './Theme';
import { StyleSheet } from 'react-native';
export const CheckBox = (props) => {
    const { containerStyle, textStyle, checkedColor, uncheckedColor, ...rest } = props;
    const themeContainerStyle = StyleSheet.flatten([containerStyle, { backgroundColor: theme.background }]);
    const color = theme.backgroundText;
    const themeTextStyle = StyleSheet.flatten([textStyle, { color }]);
    return (<BCheckBox containerStyle={themeContainerStyle} textStyle={themeTextStyle} checkedColor={checkedColor || color} uncheckedColor={uncheckedColor || color} {...rest}/>);
};
