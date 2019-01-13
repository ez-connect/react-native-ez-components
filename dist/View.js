import * as React from 'react';
import { StyleSheet, View as BView } from 'react-native';
import theme from './Theme';
export const View = (props) => {
    const { style, isPrimary, isSecondary, ...rest } = props;
    const backgroundColor = (style && style.backgroundColor) || theme.background;
    let borderColor = isPrimary ? theme.primary : isSecondary ? theme.secondary : theme.primaryDark;
    borderColor = (style && style.borderColor) || borderColor;
    const themeStyle = StyleSheet.flatten([
        { backgroundColor },
        { borderColor },
        style && style,
    ]);
    return (<BView style={themeStyle} {...rest}/>);
};
