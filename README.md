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
- `NavigationService`: a helper to help navigation between screens easy without use `react-navigation` props
- `ProgressBar`: simple wrap `ProgressBarAndroid` and `ProgressViewIOS`
- `Storage`: load and save objects to disks
- `Theme`
- `Toast`: like Toast on Android use pure JS
- `TouchableFeedback`: uses `TouchableNativeFeedback` and `TouchableOpacity` based on platforms
- `TouchableIcon`: an `Icon` uses `TouchableFeedback`

## Theme

Define your `ThemeItem`

```javascript
const themes = [
  {
    name: 'Light',
    primary: '#212121',
    onPrimary: '#ffffff',
    secondary: '#212121',
    onSecondary: '#ffffff',
    background: '#ffffff',
    onBackground: '#000000',
    surface: '#eceff1',
    onSurface: '#616161',
    iconset: 'ionicon',
  },
  {
    name: 'Dark',
    primary: '#fafafa',
    onPrimary: '#000000',
    secondary: '#fafafa',
    onSecondary: '#000000',
    background: '#000000',
    onBackground: '#bdbdbd',
    surface: '#0f0f0f',
    onSurface: '#8d8d8d',
    iconset: 'ionicon',
  },
  // ...
];
```

Add `ThemeProvider` to your root component

```javascript
import { ThemeProvider } from 'react-native-elements';
...
<ThemeProvider ref={v => Theme.init(v)}>
  ...
</ThemeProvider>
```

Init a `Theme`.

```javascript
// Apply color
const item = themes[0]; // or pick one of them
Theme.setThemeItem(item);

// Override
Theme.setTheme({
  Badge: {
    containerStyle: { marginRight: 6 },
  },
  Button: {
    titleStyle: {
      fontSize: 14,
    },
  },
  ...
});

```

Add listeners to do what you want then

```javascript
Theme.addListener(ThemeEvent.OnChange, this._handleOnThemeChange);

_handleOnThemeChange = (name: string) {
  // Setting navigation options to match with new theme for example
};
```

Apply another theme

```javascript
Theme.setThemeItem(<another-theme>);
```

That's all. All components will be use the colors that has been set.

## Example

See the `example` in this repository.

## References

[react-native-elements](https://react-native-training.github.io/react-native-elements/docs/overview.html)
