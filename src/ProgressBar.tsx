import React from 'react';
import { Platform, ProgressBarAndroid, ProgressBarAndroidProps, ProgressViewIOS, ProgressViewIOSProps } from 'react-native';

const Component = Platform.select({
  android: ProgressBarAndroid,
  ios: ProgressViewIOS,
});

export const ProgressBar = (props: ProgressBarAndroidProps | ProgressViewIOSProps) => {
  return <Component {...props} />;
};
