var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import { StyleSheet, Text as BText } from 'react-native';
import theme from './Theme';
export const Text = (props) => {
    const { style, isPrimary, isSecondary, isSurface, fontSize, fontStyle, fontWeight, textAlign } = props, rest = __rest(props, ["style", "isPrimary", "isSecondary", "isSurface", "fontSize", "fontStyle", "fontWeight", "textAlign"]);
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
