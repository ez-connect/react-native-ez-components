import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Badge as BBadge } from 'react-native-elements';
import { Theme } from './Theme';
export const Badge = (props) => {
    const { badgeStyle, textStyle, clear, ...rest } = props;
    const backgroundColor = clear ? Theme.surface : Theme.secondaryLight;
    const borderColor = Theme.secondaryLight;
    const color = clear ? Theme.backgroundText : Theme.secondaryText;
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
        alignItems: 'flex-start',
        borderRadius: 24,
        borderWidth: 0.5,
        padding: 12,
    },
    text: {
        fontSize: 12,
    },
});
