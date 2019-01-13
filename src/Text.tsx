import * as React from 'react';
import { StyleSheet, Text as BText, TextProps, TextStyle } from 'react-native';

import theme from './Theme';

export interface ITextProps extends TextProps {
  style: TextStyle;
  color?: string;
  isPrimary?: boolean;
  isSecondary?: boolean;
  isSurface?: boolean;
  fontSize?: number;
  fontStyle?: 'normal' | 'italic';
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const Text = (props: ITextProps) => {
  const {
    style,
    isPrimary,
    isSecondary,
    isSurface,
    fontSize,
    fontStyle,
    fontWeight,
    textAlign,
    ...rest
  } = props;
  const themeStyle = StyleSheet.flatten([
    { color: (style && style.color) || theme.backgroundText },
    isPrimary && { color: theme.primaryText },
    isSecondary && { color: theme.secondaryText },
    isSurface && { color: theme.surfaceText },
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
