import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem as BListItem, ListItemProps } from 'react-native-elements';

import { Theme } from './Theme';

export const ListItem = (props: ListItemProps) => {
  const { containerStyle, titleStyle, subtitleStyle, ...rest } = props;
  const backgroundColor = Theme.background;
  const color =  Theme.backgroundText;
  const colorSubTitle =  Theme.surfaceText;

  return (
    <BListItem
      containerStyle={StyleSheet.flatten([{ backgroundColor }, containerStyle])}
      titleStyle={StyleSheet.flatten([{ color }, titleStyle])}
      subtitleStyle={StyleSheet.flatten([{ color: colorSubTitle }, subtitleStyle])}
      {...rest}
    />
  );
};
