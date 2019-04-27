import * as React from 'react';
import { Animated, StyleSheet, Text, TextInput, View } from 'react-native';
import { IconProps } from 'react-native-elements';

import { NavigationService } from './NavigationService';
import { ProgressBar } from './ProgressBar';
import { Theme } from './Theme';
import { TouchableIcon } from './TouchableIcon';

export interface HeaderProps {
  // compactElement?: React.ReactNode;
  height?: number;
  icon?: IconProps;
  loadingEnabled?: boolean;
  placeholder?: string;
  rightElement?: React.ReactNode;
  searchable?: boolean;
  searchCancelIcon?: IconProps;
  searchIcon?: IconProps;
  title?: string;
  onBack?(): void;
  onSearch?(query: string): void;
}

export interface HeaderState {
  loading?: number;
  isSearching?: boolean;
}

export class Header extends React.PureComponent<HeaderProps, HeaderState> {
  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  public static debounce(fn: any, wait: number = 500, immediate: boolean = false) {
    return function() {
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

  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      loading: 0,
      isSearching: false,
    };

    this._debounceOnSearch = Header.debounce(this.props.onSearch);
  }

  public render() {
    const { icon, searchable, rightElement } = this.props;
    const backgroundColor = Theme.primary;
    const borderColor = Theme.primaryDark;
    const themeIcon = icon || { name: 'arrow-back' };

    return (
      <View style={[styles.mainContainer, { backgroundColor, borderColor }]}>
        <View style={styles.container}>
          <TouchableIcon {...themeIcon} color={Theme.primaryText} onPress={this._handleOnPressBack} style={styles.closeIcon} />
          <View style={styles.leftContainer}>{this._renderTitle()}</View>
          <View style={styles.rightContainer}>
            {searchable && this._renderSearchComponent()}
            {rightElement}
          </View>
        </View>

        <ProgressBar
          visible={this.props.loadingEnabled}
          style={styles.progress}
          color={Theme.secondary}
          progress={this.state.loading}
          progressTintColor={Theme.secondary}
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
    if (title && !isSearching) {
      return <Text style={[styles.title, { color }]} numberOfLines={1}>{title}</Text>;
    }

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
    bottom: -8,
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
