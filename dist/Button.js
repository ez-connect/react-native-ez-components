import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button as BButton } from 'react-native-elements';
import { Theme } from './Theme';
export const Button = (props) => {
    const { containerStyle, buttonStyle, titleStyle, clear, ...rest } = props;
    const backgroundColor = clear ? Theme.background : Theme.secondary;
    const color = clear ? Theme.backgroundText : Theme.secondaryText;
    const borderWidth = clear ? 1 : 0;
    const borderColor = Theme.secondary;
    const themeContainerStyle = StyleSheet.flatten([styles.container, containerStyle]);
    const themeButtonStyle = StyleSheet.flatten([
        styles.button,
        { backgroundColor, borderWidth, borderColor },
        buttonStyle,
    ]);
    const themeTitleStyle = StyleSheet.flatten([styles.title, { color }, titleStyle]);
    return (<BButton containerStyle={themeContainerStyle} buttonStyle={themeButtonStyle} titleStyle={themeTitleStyle} {...rest}/>);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
