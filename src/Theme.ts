import { FullTheme, ThemeProvider } from 'react-native-elements';

import EventListener from './EventListener';

export enum ThemeEvent {
  OnChange = 2,
}

class Theme extends EventListener<ThemeEvent> {
  protected themeProvider?: ThemeProvider<any>;

  public init(provider: ThemeProvider<any>) {
    this.themeProvider = provider;
  }

  public setTheme(value: Partial<FullTheme>) {
    this.themeProvider.updateTheme(value);
    super.emit(ThemeEvent.OnChange);
  }

  public getTheme(): FullTheme {
    return this.themeProvider.getTheme();
  }
}

const themeStatic = new Theme();
export {
  themeStatic as Theme,
};
