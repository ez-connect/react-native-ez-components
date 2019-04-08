import * as React from 'react';
import { Icon as BIcon, IconProps } from 'react-native-elements';

import { Theme } from './Theme';

export const Icon = (props: IconProps) => {
  const { color, reverse, reverseColor, type, ...rest } = props;
  const themeColor = color || Theme.backgroundText;
  const themeReverseColor = reverseColor || Theme.secondaryText;

  return (
    <BIcon
      color={themeColor}
      reverse={reverse}
      reverseColor={themeReverseColor}
      type={type || Theme.iconType}
      {...rest}
    />
  );
};
