import * as React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { IconProps } from '../node_modules/react-native-elements/src/index';

import { theme } from './Theme';
import { TouchableIcon } from './TouchableIcon';

const kAnimatedInterval = 200;
const kAnimatedStep = 20;
const kAnimatedFinish = 100;

export interface IHeaderProps {
  ready: boolean;
  icon?: IconProps;
  height?: number;
  title?: string;
  searchable?: boolean;
  placeholder?: string;
  rightComponent?: React.Component;
  onSearch?(): void;
  onBack?(): void;
}

export interface IHeaderState {
  ready?: boolean;
  loading?: number;
  isSearching?: boolean;
}

export class Header extends React.PureComponent<IHeaderProps, IHeaderState> {
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
  private _animated: any;

  constructor(props: IHeaderProps) {
    super(props);
    this.state = {
      loading: 0,
      isSearching: false,
    };

    this._debounceOnSearch = Header.debounce(this.props.onSearch);
  }

  public componentWillUnmount() {
    clearInterval(this._animated);
  }

  public render() {
    const { icon, searchable, rightComponent } = this.props;
    const backgroundColor = theme.primary;
    const borderColor = theme.primaryDark;
    const color = theme.primaryText;

    return (
      <View style={[styles.mainContainer, { backgroundColor, borderColor }]}>
        <View style={styles.container}>
          <TouchableIcon
            icon={icon || { name: 'arrow-back', color }}
            onPress={this._handleOnPressBack}
            style={styles.closeIcon}
          />
          <View style={styles.leftContainer}>{this._renderTitle()}</View>
          <View style={styles.rightContainer}>
            {searchable && this._renderSearchComponent()}
            {rightComponent}
          </View>
        </View>

        {this._renderLoading()}
      </View>
    );
  }

  ///////////////////////////////////////////////////////////////////

  private _renderTitle() {
    const { title, placeholder } = this.props;
    const { isSearching } = this.state;
    if (title && !isSearching) {
      // eslint-disable-next-line prettier/prettier
      return <Text style={[styles.title, { color: theme.primaryText }]} numberOfLines={1}>{title}</Text>;
    }

    return (
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        autoFocus={true}
        underlineColorAndroid='transparent'
        onChangeText={this._search}
      />
    );
  }

  private _renderSearchComponent() {
    const { searchable } = this.props;
    const { isSearching } = this.state;

    if (searchable) {
      return (
        <TouchableIcon
          icon={{ name: isSearching ? 'close' : 'search', color: theme.primaryText }}
          onPress={this._handleOnPressSearch}
          style={styles.icon}
        />
      );
    }

    return null;
  }

  private _renderLoading() {
    const { loading } = this.state;
    if (!this.props.ready) {
      if (loading === 0) {
        clearInterval(this._animated);
        this._animated = setInterval(this._handleAnimated, kAnimatedInterval);
      }

      const style = StyleSheet.flatten([
        styles.progress,
        { width: `${loading}%`, backgroundColor: theme.primaryText },
      ]);

      return <View style={style} />;
    }

    return null;
  }

  ///////////////////////////////////////////////////////////////////

  private _search = (text: string) => {
    this._debounceOnSearch(text);
  }

  ///////////////////////////////////////////////////////////////////

  private _handleAnimated = () => {
    let { loading } = this.state;
    loading += kAnimatedStep;
    if (loading > kAnimatedFinish) {
      loading = kAnimatedStep;
    }

    this.setState({ loading });
    if (this.props.ready) {
      clearInterval(this._animated);
    }
  }

  private _handleOnPressBack = () => {
    if (this.state.isSearching) {
      this.setState({ isSearching: false });
    } else {
      this.props.onBack();
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
    // marginBottom: 6,
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
    height: 1,
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
