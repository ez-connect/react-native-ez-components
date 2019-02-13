import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Badge as BBadge } from 'react-native-elements';
import { theme } from './Theme';
export const Badge = (props) => {
    const { badgeStyle, textStyle, clear, ...rest } = props;
    const backgroundColor = clear ? theme.background : theme.secondaryLight;
    const borderColor = theme.secondaryLight;
    const color = clear ? theme.backgroundText : theme.secondaryText;
    const themeBadgeStyle = StyleSheet.flatten([
        styles.badge,
        { backgroundColor, borderColor },
        badgeStyle,
    ]);
    const themeTextStyle = StyleSheet.flatten([styles.text, { color }, textStyle]);
    return (<BBadge badgeStyle={themeBadgeStyle} textStyle={themeTextStyle} {...rest}/>);
};
const styles = StyleSheet.create({
    badge: {
        borderWidth: 0.5,
    },
    text: {
        fontSize: 12,
    },
});
