import React from 'react';
import { Platform } from 'react-native';
import { ProgressView, } from '@react-native-community/progress-view';
import { ProgressBar as ProgressBarAndroid, } from '@react-native-community/progress-bar-android';
const Component = Platform.select({
    android: ProgressBarAndroid,
    ios: ProgressView,
});
export const ProgressBar = (props) => {
    const { visible, ...rest } = props;
    if (visible) {
        return <Component {...rest}/>;
    }
    return null;
};
