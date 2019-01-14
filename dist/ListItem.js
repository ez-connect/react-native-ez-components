import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem as BListItem } from 'react-native-elements';
import { theme } from './Theme';
export const ListItem = (props) => {
    const { containerStyle, titleStyle, subtitleStyle, ...rest } = props;
    const backgroundColor = theme.background;
    const color = theme.backgroundText;
    const colorSubTitle = theme.surfaceText;
    return (<BListItem containerStyle={StyleSheet.flatten([{ backgroundColor }, containerStyle])} titleStyle={StyleSheet.flatten([{ color }, titleStyle])} subtitleStyle={StyleSheet.flatten([{ color: colorSubTitle }, subtitleStyle])} {...rest}/>);
};
