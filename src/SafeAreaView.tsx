import { SafeAreaView as BSafeAreaView, StyleSheet } from 'react-native';

import theme from './Theme';

interface IProps {
  style: any;
}

// TODO: Use View instead of SafeAreaView because it has a placeholder for statusbar although it's hidden
export const SafeAreaView = (props: IProps) => {
  const { style, ...rest } = props;
  return (
    <BSafeAreaView
      style={StyleSheet.flatten([
        (style && style.backgroundColor) || { backgroundColor: theme.surface },
        style && style,
      ])}
      {...rest}
    />
  );
};
