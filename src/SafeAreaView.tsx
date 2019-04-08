import * as React from 'react';
import { SafeAreaView as BSafeAreaView, StyleSheet, ViewProps, ViewStyle } from 'react-native';

import { Theme } from './Theme';

interface SafeAreaViewProps extends ViewProps {
  style?: ViewStyle;
  children?: React.ReactNode;
}

// TODO: Use View instead of SafeAreaView because it has a placeholder for statusbar although it's hidden
export const SafeAreaView = (props: SafeAreaViewProps) => {
  const { style, ...rest } = props;
  const backgroundColor = (style && style.backgroundColor) || Theme.surface;
  const themeStyle = StyleSheet.flatten([
    { backgroundColor },
    style && style,
  ]);

  return (
    <BSafeAreaView
      style={themeStyle}
      {...rest}
    />
  );
};
