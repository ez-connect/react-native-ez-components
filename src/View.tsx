import { StyleSheet, View as BView } from 'react-native';

import theme from './Theme';

interface IProps {
  style: any;
}

export const View = (props: IProps) => {
  const { style, ...rest } = props;
  let borderColor = (style && style.borderColor) || theme.surfaceText;
  return (
    <BView
      style={StyleSheet.flatten([
        (style && style.backgroundColor) || { backgroundColor: theme.background },
        { borderColor },
        style && style,
      ])}
      {...rest}
    />
  );
};
