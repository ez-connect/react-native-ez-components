import * as React from 'react';
import { SafeAreaView as BSafeAreaView, StyleSheet } from 'react-native';
import theme from './Theme';
export const SafeAreaView = (props) => {
    const { style, ...rest } = props;
    const backgroundColor = (style && style.backgroundColor) || theme.surface;
    const themeStyle = StyleSheet.flatten([
        { backgroundColor },
        style && style,
    ]);
    return (<BSafeAreaView style={themeStyle} {...rest}/>);
};
