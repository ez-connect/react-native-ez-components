import * as React from 'react';
import { Icon as BIcon } from 'react-native-elements';
import { theme } from './Theme';
export const Icon = (props) => {
    const { color, ...rest } = props;
    const themeColor = color || theme.backgroundText;
    return (<BIcon color={themeColor} {...rest}/>);
};
