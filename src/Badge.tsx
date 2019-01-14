import * as React from 'react';
import {  StyleSheet } from 'react-native';
import { Badge as BBadge } from 'react-native-elements';
import { BadgeProps } from '../node_modules/react-native-elements/src/index';

import { theme } from './Theme';

export const Badge = (props: BadgeProps) => {
  const { containerStyle, textStyle, ...rest } = props;
  const themeContainerStyle = StyleSheet.flatten([{ backgroundColor: theme.secondaryLight }, containerStyle]);
  const themeTextStyle = StyleSheet.flatten([styles.text, { color: theme.secondaryText }, textStyle]);

  return (
    <BBadge
      containerStyle={themeContainerStyle}
      textStyle={themeTextStyle}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
  },
});
