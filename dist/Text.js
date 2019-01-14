import * as React from 'react';
import { StyleSheet, Text as BText } from 'react-native';
import { theme } from './Theme';
export const Text = (props) => {
    const { style, primary, secondary, surface, fontSize, fontStyle, fontWeight, textAlign, ...rest } = props;
    const themeStyle = StyleSheet.flatten([
        { color: (style && style.color) || theme.backgroundText },
        primary && { color: theme.primaryText },
        secondary && { color: theme.secondaryText },
        surface && { color: theme.surfaceText },
        fontSize && { fontSize },
        fontStyle && { fontStyle },
        fontWeight && { fontWeight },
        textAlign && { textAlign },
        style && style,
    ]);
    return (<BText style={themeStyle} {...rest}/>);
};
