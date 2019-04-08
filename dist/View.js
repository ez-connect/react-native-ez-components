import * as React from 'react';
import { StyleSheet, View as BView } from 'react-native';
import { Theme } from './Theme';
export const View = (props) => {
    const { style, primary, secondary, ...rest } = props;
    let backgroundColor = primary ? Theme.primary : secondary ? Theme.secondary : Theme.background;
    backgroundColor = (style && style.backgroundColor) || backgroundColor;
    let borderColor = primary ? Theme.primary : secondary ? Theme.secondary : Theme.primaryDark;
    borderColor = (style && style.borderColor) || borderColor;
    const themeStyle = StyleSheet.flatten([
        { backgroundColor },
        { borderColor },
        style && style,
    ]);
    return (<BView style={themeStyle} {...rest}/>);
};
