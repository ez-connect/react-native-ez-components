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
import { StyleSheet } from 'react-native';
import theme from './Theme';
export const ScrollView = (props) => {
    const { style } = props, rest = __rest(props, ["style"]);
    const backgroundColor = (style && style.backgroundColor) || theme.surface;
    const themeStyle = StyleSheet.flatten([
        { backgroundColor },
        style && style,
    ]);
    return (<ScrollView style={themeStyle} {...rest}/>);
};
