import * as React from 'react';
import { Platform, StyleSheet, TextStyle, View } from 'react-native';
import { IconProps, Input, Text } from 'react-native-elements';

import { NavigationService } from './NavigationService';
import { ProgressBar } from './ProgressBar';
import { Theme } from './Theme';
import { TouchableIcon } from './TouchableIcon';

interface Props {
  // compactElement?: React.ReactNode;
  height?: number;
  icon: IconProps;
  loadingEnabled?: boolean;
  placeholder?: string;
  progress?: number;
  rightElement?: React.ReactNode;
  searchable?: boolean;
  searchCancelIcon?: IconProps;
  title?: string;
  onBack?(): void;
  onSearch?(query: string): void;
}

interface State {
  isSearching?: boolean;
  progress?: number;
  text?: string;
}

const PROGRESS_DELAY = 50; // fake progress on iOS - without `progress` props

export class Header extends React.PureComponent<Props, State> {
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
    const { icon, rightElement } = this.props;
    const containerStyle = [styles.mainContainer, { backgroundColor: Theme.primary }];
    const color = (icon && icon.color) ? icon.color : Theme.onPrimary;

    return (
      <View style={containerStyle}>
        <View style={styles.container}>
          <TouchableIcon {...icon} color={color} onPress={this._handleOnPressBack} style={styles.closeIcon} />
          <View style={styles.leftContainer}>
            {this._renderTitle()}
          </View>
          <View style={styles.rightContainer}>
            {this.state.isSearching && this._renderCancelSearchComponent()}
            {rightElement}
          </View>
        </View>

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

  public collapse() {
    //
  }

  public expand() {
    //
  }


  private _renderTitle() {
    const { title, placeholder, searchable } = this.props;
    const titleStyle = StyleSheet.flatten<TextStyle>([styles.title, { color: Theme.onPrimary }]);
    if (searchable) {
      return (
        <Input
          autoFocus={true}
          inputContainerStyle={styles.input}
          placeholder={placeholder}
          underlineColorAndroid='transparent'
          value={this.state.text}
          onChangeText={this._handleOnSearch}
        />
      );
    }

    return <Text style={titleStyle} numberOfLines={1}>{title}</Text>;
  }

  private _renderCancelSearchComponent() {
    if (this.state.isSearching) {
      const icon = this.props.searchCancelIcon || { name: 'close' };
      return (
        <TouchableIcon style={styles.icon} {...icon} onPress={this._handleOnPressCancelSearch} />
      );
    }

    return null;
  }

  ///////////////////////////////////////////////////////////////////

  private _handleOnSearch = (text: string) => {
    if (text !== '') {
      this.setState({ isSearching: true, text });
    }
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

  private _handleOnPressCancelSearch = () => {
    this._handleOnSearch('');
    this.setState({ isSearching: false, text: undefined });
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
    alignItems: 'center',
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
    borderBottomWidth: 0,
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
