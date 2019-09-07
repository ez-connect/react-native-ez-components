import * as React from 'react';
import { Icon as BIcon, IconProps } from 'react-native-elements';

import { Theme } from './Theme';

export const Icon = (props: IconProps) => {
  const { color, type, ...rest } = props;

  return (
    <BIcon
      type={type || Theme.iconset}
      {...rest}
    />
  );
};
