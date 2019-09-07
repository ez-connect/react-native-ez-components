import * as React from 'react';
import { StyleSheet, View as BView, ViewProps, ViewStyle } from 'react-native';
import { Theme } from './Theme';

export const View = (props: ViewProps | any) => {
  const { style, ...rest } = props;
  const viewStyle = style as ViewStyle;
  const backgroundColor = (style && viewStyle.backgroundColor) || Theme.getTheme().colors.primary;
  const borderColor = (style && viewStyle.borderColor) || Theme.getTheme().colors.grey0;

  const themeStyle = StyleSheet.flatten([
    { backgroundColor },
    { borderColor },
    style && style,
  ]);

  return (
    <BView
      style={themeStyle}
      {...rest}
    />
  );
};
