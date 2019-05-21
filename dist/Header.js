import * as React from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationService } from './NavigationService';
import { ProgressBar } from './ProgressBar';
import { Theme } from './Theme';
import { TouchableIcon } from './TouchableIcon';
const PROGRESS_DELAY = 50;
export class Header extends React.PureComponent {
    constructor(props) {
        super(props);
        this._search = (text) => {
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
        this._handleOnPressSearch = () => {
            const { isSearching } = this.state;
            if (isSearching) {
                this._search('');
            }
            this.setState({ isSearching: !isSearching });
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
        const { icon, searchable, rightElement } = this.props;
        const backgroundColor = Theme.primary;
        const borderColor = Theme.primaryDark;
        const themeIcon = icon || { name: 'arrow-back' };
        console.warn('render');
        return (<View style={[styles.mainContainer, { backgroundColor, borderColor }]}>
        <View style={styles.container}>
          <TouchableIcon {...themeIcon} color={Theme.primaryText} onPress={this._handleOnPressBack} style={styles.closeIcon}/>
          <View style={styles.leftContainer}>{this._renderTitle()}</View>
          <View style={styles.rightContainer}>
            {rightElement}
            {searchable && this._renderSearchComponent()}
          </View>
        </View>

        <ProgressBar visible={this.props.loadingEnabled} style={styles.progress} color={Theme.primaryText} progress={this.state.progress} progressTintColor={Theme.primaryText} progressViewStyle='bar' styleAttr='Horizontal'/>
      </View>);
    }
    collapse() {
    }
    expand() {
    }
    _renderTitle() {
        const { title, placeholder } = this.props;
        const { isSearching } = this.state;
        const color = Theme.primaryText;
        if (isSearching) {
            return (<TextInput style={[styles.input, { color }]} placeholder={placeholder} autoFocus={true} underlineColorAndroid='transparent' onChangeText={this._search}/>);
        }
        return <Text style={[styles.title, { color }]} numberOfLines={1}>{title}</Text>;
    }
    _renderSearchComponent() {
        const { searchable, searchIcon, searchCancelIcon } = this.props;
        const { isSearching } = this.state;
        const icon = isSearching
            ? searchCancelIcon || { name: 'close' }
            : searchIcon || { name: 'search' };
        if (searchable) {
            return (<TouchableIcon style={styles.icon} {...icon} onPress={this._handleOnPressSearch}/>);
        }
        return null;
    }
}
Header.s_debounceTimeout = null;
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
