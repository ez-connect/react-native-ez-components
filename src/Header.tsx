import * as React from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { IconProps } from 'react-native-elements';

import { NavigationService } from './NavigationService';
import { ProgressBar } from './ProgressBar';
import { Theme } from './Theme';
import { TouchableIcon } from './TouchableIcon';

interface Props {
  // compactElement?: React.ReactNode;
  height?: number;
  icon?: IconProps;
  loadingEnabled?: boolean;
  placeholder?: string;
  progress?: number;
  rightElement?: React.ReactNode;
  searchable?: boolean;
  searchCancelIcon?: IconProps;
  searchIcon?: IconProps;
  title?: string;
  onBack?(): void;
  onSearch?(query: string): void;
}

interface State {
  isSearching?: boolean;
  progress?: number;
}

const PROGRESS_DELAY = 50; // fake progress on iOS - without `progress` props

export class Header extends React.PureComponent<Props, State> {
  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  public static debounce(fn: any, wait: number = 500, immediate: boolean = false) {
    return function () {
      const context = this;
      const args = arguments;
      const later = () => {
        Header.s_debounceTimeout = null;
        if (!immediate) {
          fn.apply(context, args);
        }
      };

      const isReady = immediate && !Header.s_debounceTimeout;
      clearTimeout(Header.s_debounceTimeout);

      Header.s_debounceTimeout = setTimeout(later, wait);
      if (isReady) {
        fn.apply(context, args);
      }
    };
  }

  // tslint:disable-next-line:variable-name
  private static s_debounceTimeout = null;

  ///////////////////////////////////////////////////////////////////

  private _debounceOnSearch: any;
  private _progressHandler: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      isSearching: false,
      progress: this.props.progress || 0,
    };

    this._debounceOnSearch = Header.debounce(this.props.onSearch);
    if (Platform.OS === 'ios' && !this.props.progress) {
      this._progressHandler = setInterval(this._handleOnProgressInterval, PROGRESS_DELAY);
    }
  }

  public render() {
    const { icon, searchable, rightElement } = this.props;
    const backgroundColor = Theme.primary;
    const borderColor = Theme.primaryDark;
    const themeIcon = icon || { name: 'arrow-back' };

    console.warn('render');

    return (
      <View style={[styles.mainContainer, { backgroundColor, borderColor }]}>
        <View style={styles.container}>
          <TouchableIcon {...themeIcon} color={Theme.primaryText} onPress={this._handleOnPressBack} style={styles.closeIcon} />
          <View style={styles.leftContainer}>{this._renderTitle()}</View>
          <View style={styles.rightContainer}>
            {rightElement}
            {searchable && this._renderSearchComponent()}
          </View>
        </View>

        <ProgressBar
          visible={this.props.loadingEnabled}
          style={styles.progress}
          color={Theme.primaryText}
          progress={this.state.progress}
          progressTintColor={Theme.primaryText}
          progressViewStyle='bar'
          styleAttr='Horizontal'
        />
      </View>
    );
  }

  public collapse() {
    //
  }

  public expand() {
    //
  }


  private _renderTitle() {
    const { title, placeholder } = this.props;
    const { isSearching } = this.state;
    const color = Theme.primaryText;
    if (isSearching) {
      return (
        <TextInput
          style={[styles.input, { color }]}
          placeholder={placeholder}
          autoFocus={true}
          underlineColorAndroid='transparent'
          onChangeText={this._search}
        />
      );
    }

    return <Text style={[styles.title, { color }]} numberOfLines={1}>{title}</Text>;
  }

  private _renderSearchComponent() {
    const { searchable, searchIcon, searchCancelIcon } = this.props;
    const { isSearching } = this.state;
    // const icon = { name: isSearching ? 'close' : 'search' };
    const icon = isSearching
      ? searchCancelIcon || { name: 'close' }
      : searchIcon || { name: 'search' };

    if (searchable) {
      return (
        <TouchableIcon style={styles.icon} {...icon} onPress={this._handleOnPressSearch} />
      );
    }

    return null;
  }

  ///////////////////////////////////////////////////////////////////

  private _search = (text: string) => {
    this._debounceOnSearch(text);
  }


  private _handleOnPressBack = () => {
    if (this.state.isSearching) {
      this.setState({ isSearching: false });
    } else if (this.props.onBack) {
      this.props.onBack();
    } else {
      NavigationService.goBack();
    }
  }

  private _handleOnPressSearch = () => {
    const { isSearching } = this.state;

    if (isSearching) {
      this._search('');
    }

    this.setState({ isSearching: !isSearching });
  }

  private _handleOnProgressInterval = () => {
    const progress = (this.state.progress + (PROGRESS_DELAY / 1000)) % 1;
    if (!this.props.loadingEnabled && progress > 0.9) {
      clearInterval(this._progressHandler);
    }
    this.setState({ progress });
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    borderBottomWidth: 0.5,
  },
  container: {
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
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
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
