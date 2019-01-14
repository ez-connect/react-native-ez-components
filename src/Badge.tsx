import * as React from 'react';
import {  StyleSheet } from 'react-native';
import { Badge as BBadge } from 'react-native-elements';
import { BadgeProps } from '../node_modules/react-native-elements/src/index';

import { theme } from './Theme';

export interface IBadgeProps extends BadgeProps {
  clear?: boolean;
}

export const Badge = (props: IBadgeProps) => {
  const { containerStyle, textStyle, clear, ...rest } = props;
  const backgroundColor = clear ? theme.background : theme.secondaryLight;
  const borderColor = theme.secondaryLight;
  const color = clear ? theme.backgroundText : theme.secondaryText;

  const themeContainerStyle = StyleSheet.flatten([
    styles.container,
    { backgroundColor, borderColor },
    containerStyle,
  ]);
  const themeTextStyle = StyleSheet.flatten([styles.text, { color }, textStyle]);

  return (
    <BBadge
      containerStyle={themeContainerStyle}
      textStyle={themeTextStyle}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
  },
  text: {
    fontSize: 12,
  },
});
