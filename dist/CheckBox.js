import * as React from 'react';
import { StyleSheet } from 'react-native';
import { CheckBox as BCheckBox } from 'react-native-elements';
import { Theme } from './Theme';
export const CheckBox = (props) => {
    const { containerStyle, textStyle, checkedColor, uncheckedColor, ...rest } = props;
    const themeContainerStyle = StyleSheet.flatten([containerStyle, { backgroundColor: Theme.background }]);
    const color = Theme.backgroundText;
    const themeTextStyle = StyleSheet.flatten([textStyle, { color }]);
    return (<BCheckBox containerStyle={themeContainerStyle} textStyle={themeTextStyle} checkedColor={checkedColor || color} uncheckedColor={uncheckedColor || color} {...rest}/>);
};
