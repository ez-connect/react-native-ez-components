import * as React from 'react';
import { Icon as BIcon } from 'react-native-elements';
import { IconProps } from '../node_modules/react-native-elements/src/index';

import { theme } from './Theme';

export const Icon = (props: IconProps) => {
  const { color, ...rest } = props;
  const themeColor = color || theme.backgroundText;

  return (
    <BIcon
      color={themeColor}
      {...rest}
    />
  );
};
