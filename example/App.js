import React from 'react';
import { StyleSheet,  } from 'react-native';
import { SafeAreaView, View, Text, TouchableIcon, theme } from 'react-native-ez-components';

console.debug(TouchableIcon)

export default class App extends React.Component {
  constructor(props) {
    super(props);

    theme.init(kThemes);
    theme.setTheme('Default');
    // theme.setTheme('Dark');

  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text isOnSurface>On Surface text</Text>
          <Text>Default text</Text>
          <View isPrimary>
            <Text isPrimary fontSize={20}>On primary text</Text>
          </View>
          <View isSecondary>
            <Text>On secondary text</Text>
          </View>

          <TouchableIcon icon={{ name: 'react', type: 'material-community' }} onPress={() => console.debug('Clicked TouchableIcon!')} />

        </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const kThemes = [
  {
    name: 'Default',
    primary: '#fafafa',
    primaryLight: '#ffffff',
    primaryDark: '#c7c7c7',
    primaryText: '#000000',

    secondary: '#212121',
    secondaryLight: '#484848',
    secondaryDark: '#000000',
    secondaryText: '#ffffff',

    background: '#ffffff',
    surface: '#fafafa',
    backgroundText: '#000000',
    surfaceText: '#fafafa',

    // // errorText: 'red',
  },
  {
    name: 'Dark',
    primary: '#212121',
    primaryLight: '#484848',
    primaryDark: '#000000',
    primaryText: '#ffffff',

    secondary: '#fafafa',
    secondaryLight: '#ffffff',
    secondaryDark: '#c7c7c7',
    secondaryText: '#000000',

    background: '#000000',
    surface: '#212121',
    backgroundText: '#ffffff',
    surfaceText: '#c6c6c6',
  },
  {
    name: 'Blue',
    primary: '#fafafa',
    primaryLight: '#ffffff',
    primaryDark: '#c7c7c7',
    primaryText: '#000000',

    secondary: '#ef5350',
    secondaryLight: '#ff867c',
    secondaryDark: '#b61827',
    secondaryText: '#ffffff',
  },
  {
    name: 'Red',
    primary: '#fafafa',
    primaryLight: '#ffffff',
    primaryDark: '#c7c7c7',
    primaryText: '#000000',

    secondary: '#ef5350',
    secondaryLight: '#ff867c',
    secondaryDark: '#b61827',
    secondaryText: '#ffffff',
  },
];