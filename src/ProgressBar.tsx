import React from 'react';
import { Platform, ProgressBarAndroid, ProgressBarAndroidProps, ProgressViewIOS, ProgressViewIOSProps } from 'react-native';

const Component = Platform.select({
  android: ProgressBarAndroid,
  ios: ProgressViewIOS,
});

interface ProgressBarProps extends ProgressBarAndroidProps, ProgressViewIOSProps {
  visible?: boolean;
}

export const ProgressBar = (props: ProgressBarProps) => {
  const { visible, ...rest } = props;
  if (visible) {
    return <Component {...rest} />;
  }
  return null;
};
