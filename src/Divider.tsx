import * as React from 'react';
import {  StyleSheet } from 'react-native';
import { Divider as BDivider, DividerProps } from 'react-native-elements';

import { Theme } from './Theme';

export const Divider = (props: DividerProps) => {
  const themeStyle = StyleSheet.flatten([styles.container, { backgroundColor: Theme.primaryDark }]);

  return <BDivider style={themeStyle} />;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 12,
  },
});
