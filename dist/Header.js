import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Text, View } from './Components';
import theme from './Theme';
import TouchableIcon from './TouchableIcon';
const kAnimatedInterval = 200;
const kAnimatedStep = 20;
const kAnimatedFinish = 100;
export class Header extends React.PureComponent {
    constructor(props) {
        super(props);
        this._handleAnimated = () => {
            let { loading } = this.state;
            loading += kAnimatedStep;
            if (loading > kAnimatedFinish) {
                loading = kAnimatedStep;
            }
            this.setState({ loading });
            if (this.props.ready) {
                clearInterval(this._animated);
            }
        };
        this._handleOnPressBack = () => {
            if (this.state.isSearching) {
                this.setState({ isSearching: false });
            }
            else {
                this.props.onBack();
            }
        };
        this._handleOnPressSearch = (text) => {
            this._debounceOnSearch(text);
        };
        this._search = () => {
            const { isSearching } = this.state;
            if (isSearching) {
                this._handleOnPressSearch('');
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
    componentWillUnmount() {
        clearInterval(this._animated);
    }
    render() {
        const { icon, rightComponent } = this.props;
        return (<View style={styles.mainContainer}>
        <View style={styles.container}>
          <TouchableIcon icon={icon || { name: 'arrow-back' }} onPress={this._handleOnPressBack} style={styles.closeIcon}/>
          <View style={styles.leftContainer}>{this._renderTitle()}</View>
          <View style={styles.rightContainer}>
            {this._renderSearchComponent()}
            {rightComponent}
          </View>
        </View>

        {this._renderLoading()}
      </View>);
    }
    _renderTitle() {
        const { title, placeholder } = this.props;
        const { isSearching } = this.state;
        if (title && !isSearching) {
            return <Text style={styles.title} numberOfLines={1}>{title}</Text>;
        }
        return (<TextInput style={styles.input} placeholder={placeholder} autoFocus={true} underlineColorAndroid='transparent' onChangeText={this._handleOnPressSearch}/>);
    }
    _renderSearchComponent() {
        const { searchComponent } = this.props;
        const { isSearching } = this.state;
        if (searchComponent) {
            return (<TouchableIcon icon={{ name: isSearching ? 'close' : 'search', color: theme.secondary }} onPress={this._search} style={styles.icon}/>);
        }
        return null;
    }
    _renderLoading() {
        const { ready, loading } = this.state;
        if (!ready) {
            if (loading === 0) {
                clearInterval(this._animated);
                this._animated = setInterval(this._handleAnimated, kAnimatedInterval);
            }
            return (<View style={[styles.progress, { width: `${loading}%`, backgroundColor: theme.secondaryLight }]}/>);
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
