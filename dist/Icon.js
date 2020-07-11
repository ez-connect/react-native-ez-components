import * as React from 'react';
import { Icon as BIcon } from 'react-native-elements';
import { Theme } from './Theme';
export const Icon = (props) => {
    const { type, ...rest } = props;
    return <BIcon type={type || Theme.iconset} {...rest}/>;
};
