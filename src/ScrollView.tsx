import * as React from 'react';
import { ScrollView as BScrollView, ScrollViewProps, StyleSheet, ViewStyle } from 'react-native';

import { theme } from './Theme';

interface ScrollViewExProps  extends ScrollViewProps {
  style?: ViewStyle;
  children?: any;
}

export const ScrollView = (props: ScrollViewExProps) => {
  const { style, ...rest } = props;
  const backgroundColor = (style && style.backgroundColor) || theme.surface;
  const themeStyle = StyleSheet.flatten([
    { backgroundColor },
    style && style,
  ]);

  return (
    <BScrollView
      style={themeStyle}
      {...rest}
    />
  );
};
