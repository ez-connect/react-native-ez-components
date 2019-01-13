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
import { Button as BButton } from 'react-native-elements';
import theme from './Theme';
export const Button = (props) => {
    const { containerStyle, buttonStyle, titleStyle, clear } = props, rest = __rest(props, ["containerStyle", "buttonStyle", "titleStyle", "clear"]);
    const backgroundColor = clear ? theme.background : theme.secondary;
    const color = clear ? theme.backgroundText : theme.secondaryText;
    const themeContainerStyle = StyleSheet.flatten([styles.container, containerStyle]);
    const themeButtonStyle = StyleSheet.flatten([
        styles.button,
        { backgroundColor, borderColor: theme.secondary },
        buttonStyle,
    ]);
    const themeTitleStyle = StyleSheet.flatten([styles.title, { color }, titleStyle]);
    return (<BButton containerStyle={themeContainerStyle} buttonStyle={themeButtonStyle} titleStyle={themeTitleStyle} {...rest}/>);
};
const styles = StyleSheet.create({
    container: {
        padding: 12,
    },
    button: {
        borderWidth: 0.5,
    },
    title: {
        fontSize: 12,
        fontWeight: 'normal',
    },
});
