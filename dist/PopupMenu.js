import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import Modal from 'react-native-modal';
import { Text } from './Text';
import { theme } from './Theme';
import { TouchableIcon } from './TouchableIcon';
import { View } from './View';
export class PopupMenu extends React.PureComponent {
    constructor(props) {
        super(props);
        this._handleOnHide = () => {
            this.hide();
        };
        this._handleOnShow = () => {
            this.show();
        };
        this._handleOnPressItem = (value) => () => {
            this.hide();
            setTimeout(() => this.props.onSelect(value), 500);
        };
        this.state = { visible: false };
    }
    show() {
        this.setState({ visible: true });
    }
    hide() {
        this.setState({ visible: false });
    }
    render() {
        return (<View style={styles.mainContainer}>
        {this._renderIcon()}
        <Modal isVisible={this.state.visible} style={styles.mainContainer} animationIn='zoomInDown' animationOut='zoomOutUp' backdropColor={theme.secondary} backdropOpacity={0.4} onBackdropPress={this._handleOnHide} onBackButtonPress={this._handleOnHide}>
          <View>{this._renderItems()}</View>
        </Modal>
      </View>);
    }
    _renderIcon() {
        if (this.props.icon) {
            return (<TouchableIcon icon={this.props.icon || { name: 'sort', color: theme.primaryText }} onPress={this._handleOnShow}/>);
        }
        return null;
    }
    _renderItems() {
        if (this.state.visible) {
            const { header, items } = this.props;
            const menuItems = items.map((item, index) => {
                const { icon, title, value, component, disabled } = item;
                if (title) {
                    const color = disabled ? theme.surfaceText : theme.backgroundText;
                    return (<ListItem key={index} leftIcon={{ name: icon, color }} title={title} titleStyle={{ color }} bottomDivider={true} subtitle={item.subtitle} onPress={disabled ? null : this._handleOnPressItem(value)}/>);
                }
                else if (component) {
                    return component;
                }
            });
            const headerStyle = { backgroundColor: theme.primaryDark, color: theme.primaryText };
            return (<View>
          <Text style={StyleSheet.flatten([styles.header, headerStyle])} fontWeight='bold'>
            {header}
          </Text>
          {menuItems}
        </View>);
        }
        return null;
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'transparent',
    },
    header: {
        padding: 18,
    },
});
