import * as React from 'react';
import { ScrollView as BScrollView, ScrollViewProps, StyleSheet, ViewStyle } from 'react-native';

import { Theme } from './Theme';

interface ScrollViewExProps extends ScrollViewProps {
  style?: ViewStyle;
  surface?: boolean;
  children?: React.ReactNode;
}

export const ScrollView = (props: ScrollViewExProps) => {
  const { style, surface, ...rest } = props;
  const backgroundColor = (style && style.backgroundColor)
    ? style.backgroundColor
    : surface ? Theme.surface : Theme.background;
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
