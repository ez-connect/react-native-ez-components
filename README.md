# react-native-ez-components

A collection of some components based on `react-native-elements` that support Theme.

## Getting started

`$npm i react-native-elements react-native-ez-components`

Or

`$ yarn add react-native-elements react-native-ez-components`

## Components

Almost components of `react-native-elements` and:

- `Daylight`: a simple helper to allow set color temperature following sunset/sunrise
- `DaylightView`: a view used to apply daylight to apps
- `EventListener`: a base class, used to add event listeners
- `Header`
- `Hyperlink`: clickable an url
- `NavigationService`: a helper to help navigation between screens easy without use `react-navigation` props
- `ProgressBar`: simple wrap `ProgressBarAndroid` and `ProgressViewIOS`
- `Storage`: load and save objects to disks
- `Theme`
- `Toast`: like Toast on Android use pure JS
- `TouchableFeedback`: uses `TouchableNativeFeedback` and `TouchableOpacity` based on platforms
- `TouchableIcon`: an `Icon` uses `TouchableFeedback`
- `TouchableText`: touchable text uses `TouchableFeedback`

## Theme

Define your colors, see more in `/example/Colors.js`.

```javascript
const colors = [
  ///////////////////////////////////////////////////////////////////
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
    surfaceText: '#616161',
  },
  {
    name: 'Dark',
    primary: '#000000',
    primaryLight: '#212121',
    primaryDark: '#000000',
    primaryText: '#ffffff',

    secondary: '#fafafa',
    secondaryLight: '#ffffff',
    secondaryDark: '#c7c7c7',
    secondaryText: '#000000',

    background: '#000000',
    surface: '#0f0f0f',
    backgroundText: '#bdbdbd',
    surfaceText: '#8d8d8d',
  },
  // ...
];
```

Init `Theme` when init an application.

```javascript
Theme.init(colors);
Theme.setTheme('a-theme-name');
Theme.setDefaultIconSet('material-community');
```

Handle on changes

```javascript
Theme.addListener(ThemeEvent.OnChange, this._handleOnThemeChange);

_handleOnThemeChange = (name: string) {
  // Setting navigation options to match with new theme for example
};
```

Use a new theme in the runtime.

```javascript
Theme.setTheme('a-new-theme-name');
```

That's all. All components will be use the color that has been set.

## Example

See the `example` in this repository.

## API

All of them have types. Please check [react-native-elements](https://react-native-training.github.io/react-native-elements/docs/overview.html) and the source.

Thanks!
