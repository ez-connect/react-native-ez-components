import * as React from 'react';
import { StyleSheet, Text as BText, TextProps, TextStyle } from 'react-native';

import theme from './Theme';

export interface ITextProps extends TextProps {
  style: TextStyle;
  color?: string;
  primary?: boolean;
  secondary?: boolean;
  surface?: boolean;
  fontSize?: number;
  fontStyle?: 'normal' | 'italic';
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const Text = (props: ITextProps) => {
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
    { color: (style && style.color) || theme.backgroundText },
    primary && { color: theme.primaryText },
    secondary && { color: theme.secondaryText },
    surface && { color: theme.surfaceText },
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
