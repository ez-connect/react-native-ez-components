import * as React from 'react';
import {  StyleSheet } from 'react-native';
import { Badge as BBadge, BadgeProps as BProps } from 'react-native-elements';

import { Theme } from './Theme';

export interface BadgeProps extends BProps {
  clear?: boolean;
}

export const Badge = (props: BadgeProps) => {
  const { badgeStyle, textStyle, clear, ...rest } = props;
  const backgroundColor = clear ? Theme.background : Theme.secondaryLight;
  const borderColor = Theme.secondaryLight;
  const color = clear ? Theme.backgroundText : Theme.secondaryText;

  const themeBadgeStyle = StyleSheet.flatten([
    styles.badge,
    { backgroundColor, borderColor },
    badgeStyle,
  ]);
  const themeTextStyle = StyleSheet.flatten([styles.text, { color }, textStyle]);

  return (
    <BBadge
      badgeStyle={themeBadgeStyle}
      textStyle={themeTextStyle}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  badge: {
    borderWidth: 0.5,
  },
  text: {
    fontSize: 12,
  },
});
