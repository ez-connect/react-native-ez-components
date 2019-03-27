import React from 'react';
import { Platform, ProgressBarAndroid, ProgressViewIOS } from 'react-native';
const Component = Platform.select({
    android: ProgressBarAndroid,
    ios: ProgressViewIOS,
});
export const ProgressBar = (props) => {
    const { visible, ...rest } = props;
    if (visible) {
        return <Component {...rest}/>;
    }
    return null;
};
