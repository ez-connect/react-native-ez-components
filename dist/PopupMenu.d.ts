import * as React from 'react';
import { IconProps } from 'react-native-elements';
export interface PopupMenuItem {
    icon?: string;
    title?: string;
    subtitle?: string;
    value?: string | number;
    component?: Element;
    disabled?: boolean;
}
export interface PopupMenuProps {
    icon?: IconProps;
    header?: string;
    items: PopupMenuItem[];
    onSelect?(value: string | number): void;
}
export interface PopupMenuState {
    visible?: boolean;
}
export declare class PopupMenu extends React.PureComponent<PopupMenuProps, PopupMenuState> {
    constructor(props: PopupMenuProps);
    show(): void;
    hide(): void;
    render(): JSX.Element;
    private _renderIcon;
    private _renderItems;
    private _handleOnHide;
    private _handleOnShow;
    private _handleOnPressItem;
}
