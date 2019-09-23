import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Input, Text } from 'react-native-elements';
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
            else {
                this.setState({ searchEnabled: false });
                if (this.props.onSearch) {
                    this.props.onSearch(undefined);
                }
            }
        };
        this._handleOnPressBack = () => {
            if (this.state.searchEnabled) {
                this.setState({ searchEnabled: false });
                if (this.props.onSearch) {
                    this.props.onSearch(undefined);
                }
            }
            else if (this.props.onBack) {
                this.props.onBack();
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
        const { icon, rightElement } = this.props;
        const backgroundColor = this.props.backgroundColor || Theme.primary;
        const containerStyle = [
            styles.mainContainer,
            { backgroundColor },
            this.props.borderColor && {
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderColor: this.props.borderColor,
            },
        ];
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
            {this._renderSearchComponent()}
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
        const { title, placeholder, placeholderTextColor, onBackgroundColor } = this.props;
        const titleStyle = StyleSheet.flatten([
            styles.title,
            { color: onBackgroundColor || Theme.onPrimary },
        ]);
        if (this.state.searchEnabled) {
            return (<Input autoFocus={true} inputContainerStyle={styles.input} inputStyle={{ color: onBackgroundColor || Theme.onPrimary }} placeholder={placeholder} placeholderTextColor={placeholderTextColor || Theme.onSurface} underlineColorAndroid='transparent' onChangeText={this._handleOnSearch}/>);
        }
        return <Text style={titleStyle} numberOfLines={1}>{title}</Text>;
    }
    _renderSearchComponent() {
        const searchIcon = this.props.searchIcon;
        if (searchIcon && !this.state.searchEnabled) {
            return (<TouchableIcon style={styles.icon} {...searchIcon} onPress={this._handleOnPressSearch}/>);
        }
        return null;
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
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
