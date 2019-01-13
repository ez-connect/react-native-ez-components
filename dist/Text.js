import * as React from 'react';
import { StyleSheet, Text as BText } from 'react-native';
import theme from './Theme';
export const Text = (props) => {
    const { style, isPrimary, isSecondary, isSurface, fontSize, fontStyle, fontWeight, textAlign, ...rest } = props;
    const themeStyle = StyleSheet.flatten([
        { color: (style && style.color) || theme.backgroundText },
        isPrimary && { color: theme.primaryText },
        isSecondary && { color: theme.secondaryText },
        isSurface && { color: theme.surfaceText },
        fontSize && { fontSize },
        fontStyle && { fontStyle },
        fontWeight && { fontWeight },
        textAlign && { textAlign },
        style && style,
    ]);
    return (<BText style={themeStyle} {...rest}/>);
};
