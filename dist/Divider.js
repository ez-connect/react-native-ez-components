import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Divider as BDivider } from 'react-native-elements';
import { theme } from './Theme';
export const Divider = (props) => {
    const themeStyle = StyleSheet.flatten([styles.container, { backgroundColor: theme.primaryDark }]);
    return <BDivider style={themeStyle}/>;
};
const styles = StyleSheet.create({
    container: {
        marginTop: 12,
        marginBottom: 12,
    },
});
