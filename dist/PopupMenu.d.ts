import * as React from 'react';
import { IconProps } from '../node_modules/react-native-elements/src/index';
export interface IPopupMenuItem {
    icon?: IconProps;
    title?: string;
    subtitle?: string;
    value?: string | number;
    component?: Element;
    disabled?: boolean;
}
export interface IPopupMenuProps {
    icon?: IconProps;
    header?: string;
    items: IPopupMenuItem[];
    onSelect?(value: string | number): void;
}
export interface IPopupMenuState {
    visible?: boolean;
}
export declare class PopupMenu extends React.PureComponent<IPopupMenuProps, IPopupMenuState> {
    show(): void;
    hide(): void;
    render(): JSX.Element;
    private _renderIcon;
    private _renderItems;
    private _handleOnHide;
    private _handleOnShow;
    private _handleOnPressItem;
}
