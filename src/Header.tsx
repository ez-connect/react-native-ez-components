import * as React from 'react';
import { Platform, StatusBarProperties, StyleSheet, TextStyle, View } from 'react-native';
import { Header as HeaderBase, IconProps, Input, Text } from 'react-native-elements';

import { NavigationService } from './NavigationService';
import { ProgressBar } from './ProgressBar';
import { Theme } from './Theme';
import { TouchableIcon } from './TouchableIcon';

const SEARCH_DEBOUNCE = 500;

interface Props {
  // compactElement?: React.ReactNode;
  backgroundColor?: string;
  borderColor?: string;
  clearIcon?: IconProps;
  height?: number;
  icon?: IconProps;
  loadingEnabled?: boolean;
  onBackgroundColor?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  progress?: number;
  rightElement?: React.ReactNode;
  searchEnabled?: boolean; // force search
  searchIcon?: IconProps;
  statusBarProps?: StatusBarProperties;
  title?: string;

  onBlur?(): void;
  onPressIcon?(): void;
  onSearch?(query: string): void;
}

interface State {
  progress?: number;
  searchEnabled?: boolean;
  text?: string;
}

const PROGRESS_DELAY = 50; // fake progress on iOS - without `progress` props

export class Header extends React.PureComponent<Props, State> {
  private _progressHandler: any;
  private _isMounted = false;

  private _input: Input;
  private _lastSearchAt: Date = new Date();

  constructor(props: Props) {
    super(props);
    this.state = {
      progress: this.props.progress || 0,
      searchEnabled: this.props.searchEnabled || false,
    };

    if (Platform.OS === 'ios' && !this.props.progress) {
      this._progressHandler = setInterval(this._handleOnProgressInterval, PROGRESS_DELAY);
    }
  }

  public setState(value: State) {
    if (this._isMounted) {
      super.setState(value);
    }
  }

  public componentDidMount() {
    this._isMounted = true;
  }

  public componentWillUnmount() {
    this._isMounted = false;
  }

  public render() {
    const backgroundColor = this.props.backgroundColor || Theme.primary;
    const containerStyle = [
      { backgroundColor },
      this.props.height && { height: this.props.height },
      this.props.borderColor && {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: this.props.borderColor,
      },
    ];
    const statusBarProps = this.props.statusBarProps
      ? this.props.statusBarProps : { backgroundColor };

    const placement: 'left' | 'center' = Platform.select({
      android: 'left',
      ios: 'center',
    });

    return (
      <View>
        <HeaderBase
          containerStyle={containerStyle}
          statusBarProps={statusBarProps}
          placement={placement}
          leftComponent={this._renderIcon()}
          centerComponent={this._renderTitle()}
          rightComponent={this._renderRightComponent()}
        />
        <ProgressBar
          visible={this.props.loadingEnabled}
          style={styles.progress}
          color={Theme.secondary}
          progress={this.state.progress}
          progressTintColor={Theme.primary}
          progressViewStyle='bar'
          styleAttr='Horizontal'
        />
      </View>
    );
  }

  ///////////////////////////////////////////////////////////////////

  private _renderIcon() {
    if (this.props.icon) {
      const color = (this.props.icon && this.props.icon.color)
        ? this.props.icon.color
        : (this.props.onBackgroundColor || Theme.onPrimary);

      return (
        <TouchableIcon
          {...this.props.icon}
          color={color}
          onPress={this._handleOnPressIcon}
          style={styles.closeIcon}
        />
      );
    }

    return null;
  }

  private _renderTitle() {
    const { title, placeholder, placeholderTextColor, onBackgroundColor } = this.props;
    const color = onBackgroundColor || Theme.onPrimary;
    const inputStyle = StyleSheet.flatten([styles.input, { color }]);
    const titleStyle = StyleSheet.flatten<TextStyle>([styles.title, { color }]);
    if (this.state.searchEnabled) {
      return (
        <Input
          autoFocus={true}
          inputContainerStyle={styles.inputContainer}
          inputStyle={inputStyle}
          onBlur={this._handleOnBlur}
          onChangeText={this._handleOnSearch}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          ref={(x) => this._input = x}
          underlineColorAndroid='transparent'
        />
      );
    }

    return <Text style={titleStyle} numberOfLines={1}>{title}</Text>;
  }

  private _renderRightComponent() {
    return (
      <View>
        {this._renderSearchComponent()}
        {this.props.rightElement}
      </View>
    );
  }

  private _renderSearchComponent() {
    const { searchIcon, clearIcon, onBackgroundColor } = this.props;
    const color = onBackgroundColor || Theme.onPrimary;

    if (searchIcon && !this.state.searchEnabled) {
      return (
        <TouchableIcon
          {...searchIcon}
          style={styles.icon}
          color={color}
          onPress={this._handleOnPressSearch}
        />
      );
    }

    if (this.state.text && this.state.text.length > 0) {
      return (
        <TouchableIcon
          {...clearIcon}
          style={styles.icon}
          color={color}
          onPress={this._handleOnPressClear}
        />
      );
    }

    return null;
  }

  ///////////////////////////////////////////////////////////////////

  private _handleOnPressSearch = () => {
    this.setState({ searchEnabled: true });
  }

  private _handleOnPressClear = () => {
    this._input.clear();
  }

  private _handleOnSearch = (text: string) => {
    if (text !== '') {
      this.setState({ text });
      if (this.props.onSearch) {
        const now = new Date();
        const diff = now.getTime() - this._lastSearchAt.getTime();

        if (diff > SEARCH_DEBOUNCE) {
          this.props.onSearch(text);
          this._lastSearchAt = now;
        }
      }
    } else if (!this.props.searchEnabled) {
      this.setState({ searchEnabled: false });
      if (this.props.onSearch) {
        this.props.onSearch(undefined);
      }
    }
  }

  private _handleOnBlur = () => {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  private _handleOnPressIcon = () => {
    // if (this.state.searchEnabled) {
    //   this.setState({ searchEnabled: false });
    //   if (this.props.onSearch) {
    //     this.props.onSearch(undefined);
    //   }
    // } else
    if (this.props.onPressIcon) {
      this.props.onPressIcon();
    } else {
      NavigationService.goBack();
    }
  }

  private _handleOnProgressInterval = () => {
    const progress = (this.state.progress + (PROGRESS_DELAY / 1000)) % 1;
    if (!this.props.loadingEnabled && progress > 0.9) {
      clearInterval(this._progressHandler);
    }
    this.setState({ progress });
  }
}

///////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 18,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  input: {
    paddingBottom: 0,
  },
  progress: {
    position: 'absolute',
    width: '100%',
    bottom: Platform.select({
      android: -8,
      ios: 0,
    }),
  },
  closeIcon: {
    width: 64,
    height: 48,
  },
  icon: {
    width: 48,
    height: 48,
  },
});
