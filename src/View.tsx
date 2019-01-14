import * as React from 'react';
import { StyleSheet, View as BView, ViewStyle } from 'react-native';

import { theme } from './Theme';

interface IViewProps {
  style?: ViewStyle;
  primary?: boolean;
  secondary?: boolean;
  children?: any;
}

export const View = (props: IViewProps) => {
  const { style, primary, secondary, ...rest } = props;
  let backgroundColor = primary ? theme.primary : secondary ? theme.secondary : theme.background;
  backgroundColor = (style && style.backgroundColor) || backgroundColor;
  let borderColor = primary ? theme.primary : secondary ? theme.secondary : theme.primaryDark;
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
