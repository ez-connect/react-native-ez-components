import * as React from 'react';
import { ScrollView as BScrollView, StyleSheet } from 'react-native';
import { Theme } from './Theme';
export const ScrollView = (props) => {
    const { style, ...rest } = props;
    const viewStyle = style;
    const backgroundColor = (style && viewStyle.backgroundColor)
        ? viewStyle.backgroundColor
        : Theme.background;
    const themeStyle = StyleSheet.flatten([
        { backgroundColor },
        style && style,
    ]);
    return (<BScrollView style={themeStyle} {...rest}/>);
};
