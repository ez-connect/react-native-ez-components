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
import { StyleSheet, View as BView } from 'react-native';
import theme from './Theme';
export const View = (props) => {
    const { style, isPrimary, isSecondary } = props, rest = __rest(props, ["style", "isPrimary", "isSecondary"]);
    const backgroundColor = (style && style.backgroundColor) || theme.background;
    let borderColor = isPrimary ? theme.primary : isSecondary ? theme.secondary : theme.background;
    borderColor = (style && style.borderColor) || borderColor;
    const themeStyle = StyleSheet.flatten([
        { backgroundColor },
        { borderColor },
        style && style,
    ]);
    return (<BView style={themeStyle} {...rest}/>);
};
