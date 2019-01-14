import * as React from 'react';
import { ScrollView as BScrollView, StyleSheet } from 'react-native';
import { theme } from './Theme';
export const ScrollView = (props) => {
    const { style, ...rest } = props;
    const backgroundColor = (style && style.backgroundColor) || theme.surface;
    const themeStyle = StyleSheet.flatten([
        { backgroundColor },
        style && style,
    ]);
    return (<BScrollView style={themeStyle} {...rest}/>);
};
