import * as React from 'react';
import {  StyleSheet } from 'react-native';
import { Divider as BDivider } from 'react-native-elements';
import { DividerProps } from '../node_modules/react-native-elements/src/index';

import { theme } from './Theme';

export const Divider = (props: DividerProps) => {
  const themeStyle = StyleSheet.flatten([styles.container, { backgroundColor: theme.primaryDark }]);

  return <BDivider style={themeStyle} />;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 12,
  },
});
