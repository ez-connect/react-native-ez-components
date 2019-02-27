import * as React from 'react';
import { Icon as BIcon } from 'react-native-elements';
import { theme } from './Theme';
export const Icon = (props) => {
    const { color, reverse, reverseColor, ...rest } = props;
    const themeColor = color || theme.backgroundText;
    const themeReverseColor = reverseColor || theme.secondaryText;
    return (<BIcon color={themeColor} reverse={reverse} reverseColor={themeReverseColor} {...rest}/>);
};
