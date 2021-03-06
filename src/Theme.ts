import color from 'color';
import {FullTheme, ThemeProvider} from 'react-native-elements';

import {EventListener} from './EventListener';
import {TouchableFeedback} from './TouchableFeedback';

export interface ThemeItem {
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

export enum ThemeEvent {
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
    if (this._themeProvider) {
      this._themeProvider.updateTheme(value);
      super.emit(ThemeEvent.OnChange);
    }
  }

  public setThemeItem(value: ThemeItem) {
    Object.assign(this, value);

    const {
      primary,
      onPrimary,
      secondary,
      onSecondary,
      background,
      onBackground,
      surface,
      onSurface,
    } = value;
    const theme: Partial<FullTheme> = {
      Badge: {
        badgeStyle: {
          backgroundColor: surface,
          borderRadius: 24,
          borderWidth: 0,
          padding: 12,
        },
        // !DEV: without height not working on iOS
        textStyle: {color: onBackground, height: 16},
      },
      Button: {
        titleStyle: {color: onPrimary, fontSize: 14},
        TouchableComponent: TouchableFeedback,
      },
      ButtonGroup: {
        buttonStyle: {backgroundColor: background},
        containerStyle: {height: 32},
        innerBorderStyle: {width: 0},
        selectedButtonStyle: {backgroundColor: secondary},
        selectedTextStyle: {color: onSecondary, fontSize: 14},
        textStyle: {color: onBackground, fontSize: 14},
      },
      CheckBox: {
        containerStyle: {backgroundColor: background, borderWidth: 0},
        textStyle: {color: onBackground, fontWeight: 'normal'},
      },
      Divider: {
        style: {backgroundColor: surface},
      },
      Icon: {
        type: this.iconset,
        color: onBackground,
      },
      Input: {
        containerStyle: {paddingBottom: 12},
        inputStyle: {color: onBackground},
        labelStyle: {fontSize: 14, fontWeight: 'normal'},
      },
      ListItem: {
        Component: TouchableFeedback,
        containerStyle: {backgroundColor: 'transparent'},
        leftIcon: {color: onBackground},
        rightTitleStyle: {color: onBackground},
        subtitleStyle: {color: onSurface},
        titleStyle: {color: onBackground},
      },
      Text: {
        style: {color: onBackground},
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

const singleton = new Theme();
export {singleton as Theme};
