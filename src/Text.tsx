import * as React from 'react';
import { StyleProp, StyleSheet, Text as BText, TextProps as BProps, TextStyle } from 'react-native';

import { Theme } from './Theme';

export interface TextProps extends BProps {
  style?: TextStyle;
  primary?: boolean;
  secondary?: boolean;
  surface?: boolean;
  fontSize?: number;
  fontStyle?: 'normal' | 'italic';
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  children?: React.ReactNode;
}

export const Text = (props: TextProps) => {
  const {
    style,
    primary,
    secondary,
    surface,
    fontSize,
    fontStyle,
    fontWeight,
    textAlign,
    ...rest
  } = props;
  const themeStyle = StyleSheet.flatten([
    { color: (style && style.color) || Theme.backgroundText },
    primary && { color: Theme.primaryText },
    secondary && { color: Theme.secondaryText },
    surface && { color: Theme.surfaceText },
    fontSize && { fontSize },
    fontStyle && { fontStyle },
    fontWeight && { fontWeight },
    textAlign && { textAlign },
    style && style,
  ]);

  return (
    <BText
      style={themeStyle}
      {...rest}
    />
  );
};
