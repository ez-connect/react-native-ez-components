import * as React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationService } from './NavigationService';
import { ProgressBar } from './ProgressBar';
import { theme } from './Theme';
import { TouchableIcon } from './TouchableIcon';
const kAnimatedInterval = 200;
const kAnimatedStep = 20;
const kAnimatedFinish = 100;
export class Header extends React.PureComponent {
    constructor(props) {
        super(props);
        this._search = (text) => {
            this._debounceOnSearch(text);
        };
        this._handleAnimated = () => {
            let { loading } = this.state;
            loading += kAnimatedStep;
            if (loading > kAnimatedFinish) {
                loading = 0;
            }
            if (!this.props.loadingEnabled) {
                loading = 0;
            }
            this.setState({ loading });
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
        this.state = {
            loading: 0,
            isSearching: false,
        };
        this._debounceOnSearch = Header.debounce(this.props.onSearch);
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
        const { icon, searchable, rightComponent } = this.props;
        const backgroundColor = theme.primary;
        const borderColor = theme.primaryDark;
        const themeIcon = icon || { name: 'arrow-back' };
        return (<View style={[styles.mainContainer, { backgroundColor, borderColor }]}>
        <View style={styles.container}>
          <TouchableIcon {...themeIcon} color={theme.primaryText} onPress={this._handleOnPressBack} style={styles.closeIcon}/>
          <View style={styles.leftContainer}>{this._renderTitle()}</View>
          <View style={styles.rightContainer}>
            {searchable && this._renderSearchComponent()}
            {rightComponent}
          </View>
        </View>

        {this._renderLoading()}
      </View>);
    }
    _renderTitle() {
        const { title, placeholder } = this.props;
        const { isSearching } = this.state;
        const color = theme.primaryText;
        if (title && !isSearching) {
            return <Text style={[styles.title, { color }]} numberOfLines={1}>{title}</Text>;
        }
        return (<TextInput style={[styles.input, { color }]} placeholder={placeholder} autoFocus={true} underlineColorAndroid='transparent' onChangeText={this._search}/>);
    }
    _renderSearchComponent() {
        const { searchable } = this.props;
        const { isSearching } = this.state;
        const icon = { name: isSearching ? 'close' : 'search' };
        if (searchable) {
            return (<TouchableIcon style={styles.icon} {...icon} onPress={this._handleOnPressSearch}/>);
        }
        return null;
    }
    _renderLoading() {
        if (this.props.loadingEnabled) {
            return (<ProgressBar style={styles.progress} color={theme.secondary} progress={this.state.loading} progressTintColor={theme.secondary} progressViewStyle='bar' styleAttr='Horizontal'/>);
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
