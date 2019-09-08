import color from 'color';
import { StyleSheet } from 'react-native';
import { FullTheme, ThemeProvider } from 'react-native-elements';

import EventListener from './EventListener';

interface ThemeItem {
  name: string;

  // A primary color is the color displayed most frequently across your app’s screens and components.
  // If you don’t have a secondary color, your primary color can also be used to accent elements.
  //
  // You can make a color theme for your app using your primary color,
  // as well as dark and light primary variants.
  primary: string;
  primaryDark?: string;
  primaryLight?: string;
  onPrimary: string;

  // A secondary color provides more ways to accent and distinguish your product.
  // Having a secondary color is optional, and should be applied sparingly
  // to accent select parts of your UI.
  //
  // Secondary colors are best for:
  // - Floating action buttons
  // - Selection controls, like sliders and switches
  // - Highlighting selected text
  // - Progress bars
  // - Links and headlines
  //
  // Just like the primary color, your secondary color can have dark and light variants.
  // You can make a color theme by using your primary color, secondary color, and dark and light variants of each color.
  secondary: string;
  secondaryDark?: string;
  secondaryLight?: string;
  onSecondary: string;

  // Surface, background, and error colors typically don’t represent brand:
  // - Surface colors affect surfaces of components, such as cards, sheets, and menus.
  // - The background color appears behind scrollable content.
  //   The baseline background and surface color is #FFFFFF.
  // - Error color indicates errors in components, such as invalid text in a text field.
  //   The baseline error color is #B00020.
  background: string;
  onBackground: string;

  surface: string;
  onSurface: string;

  iconset?: string;
}

enum ThemeEvent {
  OnChange = 2,
}

class Theme extends EventListener<ThemeEvent> implements ThemeItem {
  public name: string;
  public primary: string;
  public primaryDark?: string;
  public primaryLight: string;
  public onPrimary: string;
  public secondary: string;
  public secondaryDark?: string;
  public secondaryLight?: string;
  public onSecondary: string;
  public background: string;
  public onBackground: string;

  public surface: string;
  public onSurface: string;

  public iconset?: string;

  private _themeProvider?: ThemeProvider<any>;

  public init(provider: ThemeProvider<any>) {
    this._themeProvider = provider;
  }

  public setTheme(value: Partial<FullTheme>) {
    this._themeProvider.updateTheme(value);
    super.emit(ThemeEvent.OnChange);
  }

  public setThemeItem(value: ThemeItem) {
    Object.assign(this, value);

    const { primary, secondary, background, onBackground, onSurface } = value;
    const theme: Partial<FullTheme> = {
      Icon: {
        type: this.iconset,
      },
      Text: {
        style: {
          color: onBackground,
        },
      },
      colors: {
        primary,
        secondary,
        grey0: color(background).darken(0.8).toString(),
        grey1: color(background).darken(0.6).toString(),
        grey2: color(background).darken(0.4).toString(),
        grey3: color(background).darken(0.8).toString(),
        grey4: color(background).darken(0.6).toString(),
        grey5: color(background).darken(0.4).toString(),
        greyOutline: color(background).darken(0.5).toString(),
        disabled: color(background).darken(0.2).toString(),
        // TODO: Darker color if hairlineWidth is not thin enough
        divider: onSurface,
      },
    };

    this.setTheme(theme);
  }


  public getTheme(): FullTheme | undefined {
    const theme = this._themeProvider
      ? this._themeProvider.getTheme()
      : undefined;
    return theme;
  }
}

const themeStatic = new Theme();
export {
  themeStatic as Theme,
  ThemeEvent,
  ThemeItem,
};
