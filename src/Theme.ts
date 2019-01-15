import EventListener from './EventListener';

interface ITheme {
  name: string;

  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryText: string;

  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  secondaryText: string;

  background: string;
  backgroundText: string;

  surface: string;
  surfaceText: string;

  transparent?: string;
}

enum ThemeEvent {
  OnInit = 1,
  OnChange = 2,
}

class Theme extends EventListener implements ITheme {
  public name: string;

  public primary: string;
  public primaryLight: string;
  public primaryDark: string;
  public primaryText: string;

  public secondary: string;
  public secondaryLight: string;
  public secondaryDark: string;
  public secondaryText: string;

  public background: string;
  public backgroundText: string;

  public surface: string;
  public surfaceText: string;

  public transparent?: string;

  protected themes: ITheme[];

  public init(themes: ITheme[]) {
    this.transparent = 'transparent';
    this.themes = themes;
    super.emmit(ThemeEvent.OnInit);
  }

  public setTheme(name: string) {
    const item = this.themes.find((x) => x.name === name);
    Object.assign(this, item);
    super.emmit(ThemeEvent.OnChange, name);
  }

  public getAllThemes() {
    return this.themes;
  }
}

const theme = new Theme();
export {
  theme,
  ITheme,
  ThemeEvent,
};
