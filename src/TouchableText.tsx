import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text, TextProps } from './Text';
import { Theme } from './Theme';
import { TouchableFeedback } from './TouchableFeedback';

// TODO: Use View instead of SafeAreaView because it has a placeholder for statusbar although it's hidden
export const TouchableText = (props: TextProps) => {
  const {
    style,
    onPress,
    ...rest
  } = props;
  const themeStyle = StyleSheet.flatten([
    { color: Theme.secondary },
    styles.container,
    style && style,
  ]);

  return (
    <TouchableFeedback onPress={onPress}>
      <Text style={themeStyle} {...rest} />
    </TouchableFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 6,
    paddingBottom: 6,
  },
});
