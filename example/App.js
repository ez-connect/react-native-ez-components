import React from 'react';
import { StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { Header,
  Badge,
  Button,
  Divider,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  Toast,
  TouchableFeedback,
  TouchableIcon,
  TouchableText,
  View,
  theme,

} from 'react-native-ez-components';
import colors from './Colors';
import { ToastType } from 'react-native-ez-components/dist/Toast';

export default class App extends React.Component {
  state = {
    selectedTheme: 'Blue Red',
  }

  constructor(props) {
    super(props);

    theme.init(colors);
    theme.setTheme(this.state.selectedTheme);
  }

  componentDidMount() {
    theme.addListener(theme)
  }

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar height={Constants.statusBarHeight} hidden={true} />
        <ScrollView>
          <Header
            title="Example"
            ready
            searchable
            placeholder="Seach here..."
            onBack={this._handleOnBack}
            onSearch={this._handleOnSearch}
          />

          <View style={styles.row}>
            {this._renderThemes()}
          </View>

          <View style={styles.container}>
            <Text isOnSurface>On Surface text</Text>
            <Text>Default text</Text>
            <View primary>
              <Text primary fontSize={20}>On primary text size 20</Text>
            </View>
            <View secondary>
              <Text secondary fontSize={28}>On secondary text size 28</Text>
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

          <View style={styles.container}>
            <Button title="Toast" onPress={this._handleOnPressToast} />
          </View>
          <Toast ref={x => Toast.setInstance(x)} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  ///////////////////////////////////////////////////////////////////

  _renderThemes() {
    return theme.getAllThemes().map(item => {
      const borderWidth = item.name == this.state.selectedTheme ? 1 : 0;
      return (
        <TouchableFeedback key={item.name} onPress={this._handleOnPressTheme(item.name)}>
          <View style={[styles.item, { borderWidth, borderColor: theme.secondaryLight }]}>
            <Text
              style={StyleSheet.flatten([
                styles.theme,
                { backgroundColor: item.primary, color: item.primaryText },
              ])}>
              P
            </Text>
            <Text
              style={StyleSheet.flatten([
                styles.theme,
                { backgroundColor: item.secondary, color: item.secondaryText },
              ])}>
              S
            </Text>
            <Text
              style={StyleSheet.flatten([
                styles.theme,
                { backgroundColor: item.background, color: item.backgroundText },
              ])}>
              {item.name}
            </Text>
          </View>
        </TouchableFeedback>
      );
    });
  }

  ///////////////////////////////////////////////////////////////////

  _handleOnBack = () => {
    console.log('Back');
  };

  _handleOnSearch = text => {
    console.log(text);
  };

  _handleOnPressTheme = selectedTheme => () => {
    console.log(`Select theme: ${selectedTheme}`);
    this.setState({ selectedTheme });
    theme.setTheme(selectedTheme);
  };

  _toastMessageIndex = 1;
  _handleOnPressToast = () => {
    Toast.show({ title: `Title ${this._toastMessageIndex}`, message: 'Message', type: ToastType.Info, timeout: 5000 });
    this._toastMessageIndex++;
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
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    margin: 6,
  },
  icon: {
    width: 48,
    height: 48,
  },
  theme: {
    width: 90,
    height: 30,
    textAlign: 'center',
    textAlignVertical: 'center', //android
  },
});
