import * as React from 'react';
import { Animated, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BackHandler } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { Theme } from './Theme';
const CONTAINER_OPACITY = 80;
const ANIM_DURATION = 300;
export class Sheet extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            items: [],
            visible: false,
        };
        this._anim = new Animated.Value(1000);
        this.close = () => {
            this.setState({ visible: false });
        };
        this._handleOnPressItem = (value) => () => {
            this.close();
            this._onSelectHandler && this._onSelectHandler(value);
        };
        this._handleOnBackPress = () => {
            this.close();
        };
    }
    static setInstance(value) {
        Sheet._instance = value;
    }
    static open(items, onSelectHandler, title, options) {
        Sheet._instance && Sheet._instance.open(items, onSelectHandler, title, options);
    }
    componentDidMount() {
        this._backHandler = BackHandler.addEventListener('hardwareBackPress', this._handleOnBackPress);
    }
    componentWillUnmount() {
        this._backHandler.remove();
    }
    open(items, onSelectHandler, title, option) {
        this._onSelectHandler = onSelectHandler;
        this._options = option;
        this._anim = new Animated.Value(-Dimensions.get('screen').height);
        Animated.timing(this._anim, {
            toValue: 0,
            duration: ANIM_DURATION,
        }).start();
        this.setState({ items, title, visible: true });
    }
    render() {
        if (this.state.visible) {
            const containerStyle = StyleSheet.flatten([
                styles.mainContainer,
                { backgroundColor: `${Theme.surface}${CONTAINER_OPACITY}` },
                this._options && this._options.containerStyle,
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
        const items = this.state.items;
        const menuItems = items.map((item, index) => {
            const { icon, title, value, disabled } = item;
            const containerStyle = StyleSheet.flatten([
                styles.item,
                { backgroundColor: Theme.background },
                this._options && this._options.itemsStyle,
            ]);
            if (title) {
                const color = disabled ? Theme.onSurface : Theme.onBackground;
                return (<ListItem bottomDivider={this._options && this._options.bottomDivider} containerStyle={containerStyle} key={index} leftIcon={{ type: Theme.iconset, name: icon, color }} onPress={disabled ? undefined : this._handleOnPressItem(value)} subtitle={item.subtitle} title={title} titleStyle={{ color }}/>);
            }
            else {
                return <View key={index} style={{ backgroundColor: Theme.onSurface, ...styles.divider }}/>;
            }
        });
        const titleStyle = StyleSheet.flatten([styles.title, { backgroundColor: Theme.background }]);
        const style = { position: 'absolute', width: '100%' };
        if (this._options && this._options.position === 'top') {
            Object.assign(style, { top: this._anim });
        }
        else {
            Object.assign(style, { bottom: this._anim });
        }
        const itemsStyle = StyleSheet.flatten([
            style,
            this._options && this._options.itemsStyle,
        ]);
        return (<Animated.View style={itemsStyle}>
        {this.state.title && <Text style={titleStyle}>{this.state.title}</Text>}
        {menuItems}
      </Animated.View>);
    }
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
