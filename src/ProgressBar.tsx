import React from 'react';
import {Platform} from 'react-native';
import {
  ProgressView,
  ProgressViewProps,
} from '@react-native-community/progress-view';
import {
  ProgressBar as ProgressBarAndroid,
  ProgressBarAndroidProps,
} from '@react-native-community/progress-bar-android';

const Component = Platform.select({
  android: ProgressBarAndroid,
  ios: ProgressView,
});

interface ProgressBarProps extends ProgressBarAndroidProps, ProgressViewProps {
  visible?: boolean;
}

export const ProgressBar = (props: ProgressBarProps) => {
  const {visible, ...rest} = props;
  if (visible) {
    return <Component {...rest} />;
  }
  return null;
};
