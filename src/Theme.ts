import EventListener from './EventListener';

export interface ThemeItem {
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

export enum ThemeEvent {
  OnInit = 1,
  OnChange = 2,
}

type IconType = 'antdesign' | 'entypo' | 'evilicon' | 'feather' | 'font-awesome' | 'foundation'
  | 'ionicon' | 'material' | 'material-community' | 'octicon' | 'simple-line-icon' | 'zocial';

class SingletonTheme extends EventListener<ThemeEvent> implements ThemeItem {
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

  public iconType: IconType = 'material';

  protected themes: ThemeItem[];

  public init(themes: ThemeItem[]) {
    this.transparent = 'transparent';
    this.themes = themes;
    super.emit(ThemeEvent.OnInit);
  }

  public setTheme(name: string) {
    const item = this.themes.find((x) => x.name === name);
    Object.assign(this, item);
    super.emit(ThemeEvent.OnChange, name);
  }

  public getAllThemes() {
    return this.themes;
  }

  public setDefaultIconSet(value: IconType) {
    this.iconType = value;
  }
}

const Theme = new SingletonTheme();
export {
  Theme,
};
