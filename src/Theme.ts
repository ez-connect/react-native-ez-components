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
}

class Theme implements ITheme {
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

  protected themes: ITheme[];

  public init(themes: ITheme[]) {
    this.themes = themes;
  }

  public setTheme(name: string) {
    const item = this.themes.find((x) => x.name === name);
    Object.assign(this, item);
  }

  public getAllThemes() {
    return this.themes;
  }
}

const theme = new Theme();
export default theme;
