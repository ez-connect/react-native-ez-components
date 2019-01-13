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
import { StyleSheet, View } from 'react-native';
import { Text } from './Text';
import theme from './Theme';
import { TouchableFeedback } from './TouchableFeedback';
export const TouchableText = (props) => {
    const { style, onPress } = props, rest = __rest(props, ["style", "onPress"]);
    const themeStyle = StyleSheet.flatten([
        { color: theme.secondary },
        styles.container,
        style && style,
    ]);
    return (<TouchableFeedback onPress={onPress}>
      <View>
        <Text style={themeStyle} {...rest}/>
      </View>
    </TouchableFeedback>);
};
const styles = StyleSheet.create({
    container: {
        paddingTop: 6,
        paddingBottom: 6,
    },
});
