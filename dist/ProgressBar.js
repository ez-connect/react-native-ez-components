import React from 'react';
import { Platform, ProgressBarAndroid, ProgressViewIOS } from 'react-native';
const Component = Platform.select({
    android: ProgressBarAndroid,
    ios: ProgressViewIOS,
});
export const ProgressBar = (props) => {
    return <Component {...props}/>;
};
