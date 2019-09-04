import * as React from 'react';
import { ScrollView as BScrollView, StyleSheet } from 'react-native';
import { Theme } from './Theme';
export const ScrollView = (props) => {
    const { style, surface, ...rest } = props;
    const backgroundColor = (style && style.backgroundColor)
        ? style.backgroundColor
        : surface ? Theme.surface : Theme.background;
    const themeStyle = StyleSheet.flatten([
        { backgroundColor },
        style && style,
    ]);
    return (<BScrollView style={themeStyle} {...rest}/>);
};
