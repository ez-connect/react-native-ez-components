import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Input, Text } from 'react-native-elements';
import { NavigationService } from './NavigationService';
import { ProgressBar } from './ProgressBar';
import { Theme } from './Theme';
import { TouchableIcon } from './TouchableIcon';
const PROGRESS_DELAY = 50;
export class Header extends React.PureComponent {
    constructor(props) {
        super(props);
        this._handleOnSearch = (text) => {
            if (text !== '') {
                this.setState({ isSearching: true, text });
            }
            this._debounceOnSearch(text);
        };
        this._handleOnPressBack = () => {
            if (this.state.isSearching) {
                this.setState({ isSearching: false });
            }
            else if (this.props.onBack) {
                this.props.onBack();
            }
            else {
                NavigationService.goBack();
            }
        };
        this._handleOnPressCancelSearch = () => {
            this._handleOnSearch('');
            this.setState({ isSearching: false, text: undefined });
        };
        this._handleOnProgressInterval = () => {
            const progress = (this.state.progress + (PROGRESS_DELAY / 1000)) % 1;
            if (!this.props.loadingEnabled && progress > 0.9) {
                clearInterval(this._progressHandler);
            }
            this.setState({ progress });
        };
        this.state = {
            isSearching: false,
            progress: this.props.progress || 0,
        };
        this._debounceOnSearch = Header.debounce(this.props.onSearch);
        if (Platform.OS === 'ios' && !this.props.progress) {
            this._progressHandler = setInterval(this._handleOnProgressInterval, PROGRESS_DELAY);
        }
    }
    static debounce(fn, wait = 500, immediate = false) {
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
    render() {
        const { icon, rightElement } = this.props;
        const backgroundColor = this.props.backgroundColor || Theme.primary;
        const containerStyle = [styles.mainContainer, { backgroundColor }];
        const color = (icon && icon.color)
            ? icon.color
            : (this.props.onBackgroundColor || Theme.onPrimary);
        return (<View style={containerStyle}>
        <View style={styles.container}>
          <TouchableIcon {...icon} color={color} onPress={this._handleOnPressBack} style={styles.closeIcon}/>
          <View style={styles.leftContainer}>
            {this._renderTitle()}
          </View>
          <View style={styles.rightContainer}>
            {this.state.isSearching && this._renderCancelSearchComponent()}
            {rightElement}
          </View>
        </View>

        <ProgressBar visible={this.props.loadingEnabled} style={styles.progress} color={Theme.secondary} progress={this.state.progress} progressTintColor={Theme.primary} progressViewStyle='bar' styleAttr='Horizontal'/>
      </View>);
    }
    collapse() {
    }
    expand() {
    }
    _renderTitle() {
        const { title, placeholder, placeholderTextColor, searchable, onBackgroundColor } = this.props;
        const titleStyle = StyleSheet.flatten([
            styles.title,
            { color: onBackgroundColor || Theme.onPrimary },
        ]);
        if (searchable) {
            return (<Input autoFocus={true} inputContainerStyle={styles.input} inputStyle={{ color: onBackgroundColor || Theme.onPrimary }} placeholder={placeholder} placeholderTextColor={placeholderTextColor || Theme.onSurface} underlineColorAndroid='transparent' onChangeText={this._handleOnSearch}/>);
        }
        return <Text style={titleStyle} numberOfLines={1}>{title}</Text>;
    }
    _renderCancelSearchComponent() {
        if (this.state.isSearching) {
            const icon = this.props.searchCancelIcon || { name: 'close' };
            return (<TouchableIcon style={styles.icon} {...icon} onPress={this._handleOnPressCancelSearch}/>);
        }
        return null;
    }
}
Header.s_debounceTimeout = null;
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
