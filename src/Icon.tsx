import * as React from 'react';
import { Icon as BIcon, IconProps } from 'react-native-elements';

import { theme } from './Theme';

export const Icon = (props: IconProps) => {
  const { color, reverse, ...rest } = props;
  const themeColor = color || reverse ? theme.secondary : theme.backgroundText;

  return (
    <BIcon
      color={themeColor}
      reverse={reverse}
      {...rest}
    />
  );
};
