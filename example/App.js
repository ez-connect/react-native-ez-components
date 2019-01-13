import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Header,
  Badge,
  Button,
  Divider,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableFeedback,
  TouchableIcon,
  TouchableText,
  View,
  theme
} from 'react-native-ez-components';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    theme.init(kThemes);
    theme.setTheme('Default');
    // theme.setTheme('Dark');

  }

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar hidden={true} />
        <ScrollView>
          <Header
            title="Example"
            ready
            searchable
            placeholder="Seach here..."
            onBack={this._handleOnBack}
            onSearch={this._handleOnSearch}
          />

          <View style={styles.container}>
            <Text isOnSurface>On Surface text</Text>
            <Text>Default text</Text>
            <View isPrimary>
              <Text isPrimary fontSize={20}>On primary text</Text>
            </View>
            <View isSecondary>
              <Text>On secondary text</Text>
            </View>
          </View>

          <View style={styles.container}>
            <View>
              <TouchableText onPress={() => console.log('Click on TouchableText')}>TouchableText</TouchableText>
            </View>
            <TouchableIcon style={styles.icon} icon={{ name: 'react', type: 'material-community' }} onPress={() => console.debug('Clicked TouchableIcon!')} />
            <View>
              <TouchableFeedback onPress={() => console.log('TouchableFeedback')}>
                <View style={{ flex: 1 }}>
                  <Text>TouchableFeedback</Text>
                </View>
              </TouchableFeedback>
            </View>
          </View>

          <View style={styles.container}>
            <Button title="Button" />
            <Divider />
            <Button title="Button" clear />

            <View style={styles.row}>
              <Badge value="Badge" />
              <Badge value="Badge with textStyle" textStyle={{ fontSize: 20 }} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  _handleOnBack = () => {
    console.log('Back');
  };

  _handleOnSearch = text => {
    console.log(text);
  };
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 12,
    margin: 6,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  icon: {
    width: 48,
    height: 48,
  }
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