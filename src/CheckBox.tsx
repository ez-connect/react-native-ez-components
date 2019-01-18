import * as React from 'react';
import { StyleSheet } from 'react-native';
import { CheckBox as BCheckBox } from 'react-native-elements';
import { CheckBoxProps } from '../node_modules/react-native-elements/src/index';

import { theme } from './Theme';

export const CheckBox = (props: CheckBoxProps) => {
  const { containerStyle, textStyle, checkedColor, uncheckedColor, ...rest } = props;
  const themeContainerStyle = StyleSheet.flatten([containerStyle, { backgroundColor: theme.background }]);
  const color = theme.backgroundText;
  const themeTextStyle = StyleSheet.flatten([textStyle, { color }]);

  return (
    <BCheckBox
      containerStyle={themeContainerStyle}
      textStyle={themeTextStyle}
      checkedColor={checkedColor || color}
      uncheckedColor={uncheckedColor || color}
      {...rest}
    />
  );
};
