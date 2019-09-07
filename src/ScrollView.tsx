import * as React from 'react';
import { ScrollView as BScrollView, ScrollViewProps, StyleSheet, ViewStyle } from 'react-native';

import { Theme } from './Theme';

export const ScrollView = (props: ScrollViewProps) => {
  const { style, ...rest } = props;
  const viewStyle = style as ViewStyle;
  const backgroundColor = (style && viewStyle.backgroundColor)
    ? viewStyle.backgroundColor
    : Theme.background;
  const themeStyle = StyleSheet.flatten<ViewStyle>([
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
