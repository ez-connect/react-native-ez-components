import * as React from 'react';
import { StyleSheet, Text as BText } from 'react-native';
import { Theme } from './Theme';
export const Text = (props) => {
    const { style, primary, secondary, surface, fontSize, fontStyle, fontWeight, textAlign, ...rest } = props;
    const themeStyle = StyleSheet.flatten([
        { color: (style && style.color) || Theme.backgroundText },
        primary && { color: Theme.primaryText },
        secondary && { color: Theme.secondaryText },
        surface && { color: Theme.surfaceText },
        fontSize && { fontSize },
        fontStyle && { fontStyle },
        fontWeight && { fontWeight },
        textAlign && { textAlign },
        style && style,
    ]);
    return (<BText style={themeStyle} {...rest}/>);
};
