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
import { SafeAreaView as BSafeAreaView, StyleSheet } from 'react-native';
import theme from './Theme';
export var SafeAreaView = function (props) {
    var style = props.style, rest = __rest(props, ["style"]);
    var themeStyle = StyleSheet.flatten([
        (style && style.backgroundColor) || { backgroundColor: theme.surface },
        style && style,
    ]);
    return (<BSafeAreaView style={themeStyle} {...rest}/>);
};
