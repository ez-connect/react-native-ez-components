import * as React from 'react';
import { SafeAreaView as BSafeAreaView, StyleSheet, ViewStyle } from 'react-native';

import { theme } from './Theme';

interface IProps {
  style: ViewStyle;
}

// TODO: Use View instead of SafeAreaView because it has a placeholder for statusbar although it's hidden
export const SafeAreaView = (props: IProps) => {
  const { style, ...rest } = props;
  const backgroundColor = (style && style.backgroundColor) || theme.surface;
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
