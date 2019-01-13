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
import { Badge as BBadge } from 'react-native-elements';
import theme from './Theme';
export const Badge = (props) => {
    const { containerStyle, textStyle } = props, rest = __rest(props, ["containerStyle", "textStyle"]);
    const themeContainerStyle = StyleSheet.flatten([{ backgroundColor: theme.secondaryLight }, containerStyle]);
    const themeTextStyle = StyleSheet.flatten([styles.text, { color: theme.secondaryText }, textStyle]);
    return (<BBadge containerStyle={themeContainerStyle} textStyle={themeTextStyle} {...rest}/>);
};
const styles = StyleSheet.create({
    text: {
        fontSize: 12,
    },
});
