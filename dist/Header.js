import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Header as HeaderBase, Input, Text } from 'react-native-elements';
import { NavigationService } from './NavigationService';
import { ProgressBar } from './ProgressBar';
import { Theme } from './Theme';
import { TouchableIcon } from './TouchableIcon';
const SEARCH_DEBOUNCE = 500;
const PROGRESS_DELAY = 50;
export class Header extends React.PureComponent {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this._lastSearchAt = new Date();
        this._handleOnPressSearch = () => {
            this.setState({ searchEnabled: true });
        };
        this._handleOnPressClear = () => {
            this._input.clear();
        };
        this._handleOnSearch = (text) => {
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
            }
            else if (!this.props.searchEnabled) {
                this.setState({ searchEnabled: false });
                if (this.props.onSearch) {
                    this.props.onSearch(undefined);
                }
            }
        };
        this._handleOnBlur = () => {
            if (this.props.onBlur) {
                this.props.onBlur();
            }
        };
        this._handleOnPressIcon = () => {
            if (this.props.onPressIcon) {
                this.props.onPressIcon();
            }
            else {
                NavigationService.goBack();
            }
        };
        this._handleOnProgressInterval = () => {
            const progress = (this.state.progress + (PROGRESS_DELAY / 1000)) % 1;
            if (!this.props.loadingEnabled && progress > 0.9) {
                clearInterval(this._progressHandler);
            }
            this.setState({ progress });
        };
        this.state = {
            progress: this.props.progress || 0,
            searchEnabled: this.props.searchEnabled || false,
        };
        if (Platform.OS === 'ios' && !this.props.progress) {
            this._progressHandler = setInterval(this._handleOnProgressInterval, PROGRESS_DELAY);
        }
    }
    setState(value) {
        if (this._isMounted) {
            super.setState(value);
        }
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
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
        const placement = Platform.select({
            android: 'left',
            ios: 'center',
        });
        return (<View>
        <HeaderBase containerStyle={containerStyle} statusBarProps={statusBarProps} placement={placement} leftComponent={this._renderIcon()} centerComponent={this._renderTitle()} rightComponent={this._renderRightComponent()}/>
        <ProgressBar visible={this.props.loadingEnabled} style={styles.progress} color={Theme.secondary} progress={this.state.progress} progressTintColor={Theme.primary} progressViewStyle='bar' styleAttr='Horizontal'/>
      </View>);
    }
    _renderIcon() {
        if (this.props.icon) {
            const color = (this.props.icon && this.props.icon.color)
                ? this.props.icon.color
                : (this.props.onBackgroundColor || Theme.onPrimary);
            return (<TouchableIcon {...this.props.icon} color={color} onPress={this._handleOnPressIcon} style={styles.closeIcon}/>);
        }
        return null;
    }
    _renderTitle() {
        const { title, placeholder, placeholderTextColor, onBackgroundColor } = this.props;
        const color = onBackgroundColor || Theme.onPrimary;
        const titleStyle = StyleSheet.flatten([styles.title, { color }]);
        if (this.state.searchEnabled) {
            return (<Input autoFocus={true} inputContainerStyle={styles.inputContainer} inputStyle={{ color }} onBlur={this._handleOnBlur} onChangeText={this._handleOnSearch} placeholder={placeholder} placeholderTextColor={placeholderTextColor} ref={(x) => this._input = x} underlineColorAndroid='transparent'/>);
        }
        return <Text style={titleStyle} numberOfLines={1}>{title}</Text>;
    }
    _renderRightComponent() {
        return (<View>
        {this._renderSearchComponent()}
        {this.props.rightElement}
      </View>);
    }
    _renderSearchComponent() {
        const { searchIcon, clearIcon, onBackgroundColor } = this.props;
        const color = onBackgroundColor || Theme.onPrimary;
        if (searchIcon && !this.state.searchEnabled) {
            return (<TouchableIcon {...searchIcon} style={styles.icon} color={color} onPress={this._handleOnPressSearch}/>);
        }
        if (this.state.text && this.state.text.length > 0) {
            return (<TouchableIcon {...clearIcon} style={styles.icon} color={color} onPress={this._handleOnPressClear}/>);
        }
        return null;
    }
}
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
        backgroundColor: 'blue',
        paddingTop: 12,
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
