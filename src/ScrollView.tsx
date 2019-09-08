import * as React from 'react';
import { ScrollView as BScrollView, ScrollViewProps, StyleSheet, ViewStyle } from 'react-native';

import { Theme } from './Theme';

interface Props extends ScrollViewProps {
  children?: React.ReactNode; // add here because not found children in ScroolViewProps when lint
}

export const ScrollView = (props: Props) => {
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
