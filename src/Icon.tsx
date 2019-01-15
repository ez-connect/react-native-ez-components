import * as React from 'react';
import { Icon as BIcon } from 'react-native-elements';
import { IconProps } from '../node_modules/react-native-elements/src/index';

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
