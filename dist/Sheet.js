import * as React from 'react';
import { Animated, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Divider, ListItem, Text } from 'react-native-elements';
import { Theme } from './Theme';
import { View } from './View';
const CONTAINER_OPACITY = 80;
const ANIM_DURATION = 300;
export class Sheet extends React.PureComponent {
    constructor(props) {
        super(props);
        this._anim = new Animated.Value(1000);
        this.close = () => {
            this.setState({ visible: false });
        };
        this._handleOnPressItem = (value) => () => {
            this.close();
            this._onSelectHandler && this._onSelectHandler(value);
        };
        this.state = {
            items: [],
            visible: false,
        };
    }
    static setInstance(value) {
        Sheet._instance = value;
    }
    static open(items, onSelectHandler, title, options) {
        Sheet._instance && Sheet._instance.open(items, onSelectHandler, title, options);
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
                this._options && this._options.itemsStyle
            ]);
            if (title) {
                return (<ListItem bottomDivider={this._options && this._options.bottomDivider} containerStyle={containerStyle} key={index} leftIcon={{ name: icon }} onPress={disabled ? undefined : this._handleOnPressItem(value)} subtitle={item.subtitle} title={title}/>);
            }
            else {
                return <Divider />;
            }
        });
        const titleStyle = StyleSheet.flatten([
            styles.title,
            { backgroundColor: Theme.getTheme().colors.primary },
        ]);
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
