import * as React from 'react';
import { StyleSheet, View as BView, ViewStyle } from 'react-native';

import theme from './Theme';

interface IProps {
  style: ViewStyle;
  isPrimary: boolean;
  isSecondary: boolean;
}

export const View = (props: IProps) => {
  const { style, isPrimary, isSecondary, ...rest } = props;
  const backgroundColor = (style && style.backgroundColor) || theme.background;
  let borderColor = isPrimary ? theme.primary : isSecondary ? theme.secondary : theme.background;
  borderColor = (style && style.borderColor) || borderColor;

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
