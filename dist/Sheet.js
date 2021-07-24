import * as React from 'react';
import { Animated, Dimensions, StyleSheet, TouchableOpacity, View, } from 'react-native';
import { BackHandler } from 'react-native';
import { Icon, ListItem, Text } from 'react-native-elements';
import { Theme } from './Theme';
const CONTAINER_OPACITY = 80;
const ANIM_DURATION = 300;
export class Sheet extends React.PureComponent {
    static setInstance(value) {
        Sheet._instance = value;
    }
    static open(props) {
        if (Sheet._instance) {
            Sheet._instance.open(props);
        }
    }
    static _instance;
    state = {
        visible: false,
    };
    _anim = new Animated.Value(1000);
    _backHandler;
    componentDidMount() {
        this._backHandler = BackHandler.addEventListener('hardwareBackPress', this._handleOnBackPress);
    }
    componentWillUnmount() {
        this._backHandler.remove();
    }
    open(props) {
        this._anim = new Animated.Value(-Dimensions.get('screen').height);
        Animated.timing(this._anim, {
            useNativeDriver: false,
            toValue: 0,
            duration: ANIM_DURATION,
        }).start();
        this.setState({ props, visible: true });
    }
    close = () => {
        this.setState({ props: undefined, visible: false });
    };
    render() {
        const { props, visible } = this.state;
        if (visible && props) {
            const containerStyle = StyleSheet.flatten([
                styles.mainContainer,
                { backgroundColor: `${Theme.onBackground}${CONTAINER_OPACITY}` },
                props.containerStyle,
            ]);
            return (<View style={containerStyle}>
          <TouchableOpacity onPress={this.close} style={styles.overlay}>
            {this._renderItems()}
          </TouchableOpacity>
        </View>);
        }
        return null;
    }
    _renderItems() {
        const props = this.state.props;
        if (props) {
            const titleStyle = StyleSheet.flatten([
                styles.title,
                { backgroundColor: Theme.background },
            ]);
            const style = { position: 'absolute', width: '100%' };
            if (props.position === 'top') {
                Object.assign(style, { top: this._anim });
            }
            else {
                Object.assign(style, { bottom: this._anim });
            }
            const itemsStyle = StyleSheet.flatten([style, props.itemsStyle]);
            if (props.items) {
                const menuItems = props.items.map((v, i) => {
                    return this._renderItem(props, v, i);
                });
                return (<Animated.View style={itemsStyle}>
            {props.title && <Text style={titleStyle}>{props.title}</Text>}
            {menuItems}
          </Animated.View>);
            }
            return (<Animated.View style={itemsStyle}>{props.component}</Animated.View>);
        }
    }
    _renderItem(props, item, index) {
        const { icon, title, subtitle, value, disabled } = item;
        const containerStyle = StyleSheet.flatten([styles.item, props.itemsStyle]);
        if (title) {
            const color = disabled ? Theme.onSurface : Theme.onBackground;
            return (<ListItem containerStyle={containerStyle} key={index} bottomDivider={props.bottomDivider} onPress={disabled ? undefined : this._handleOnPressItem(value)}>
          <Icon type={Theme.iconset} name={icon} color={color}/>
          <ListItem.Content>
            <ListItem.Title style={{ color: color }}>{title}</ListItem.Title>
            <ListItem.Subtitle style={{ color: color }}>
              {subtitle}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>);
        }
        else {
            return (<View key={index} style={{ backgroundColor: Theme.onSurface, ...styles.divider }}/>);
        }
    }
    _handleOnPressItem = (value) => () => {
        const props = this.state.props;
        this.close();
        if (props && props.onSelect) {
            props.onSelect(value);
        }
    };
    _handleOnBackPress = () => {
        this.close();
        return true;
    };
}
const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 12,
    },
    item: {
        padding: 12,
    },
    divider: {
        padding: 0.2,
    },
});
