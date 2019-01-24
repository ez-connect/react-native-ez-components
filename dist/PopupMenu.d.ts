import * as React from 'react';
import { IconProps } from 'react-native-elements';
export interface IPopupMenuItem {
    icon?: string;
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
    constructor(props: IPopupMenuProps);
    show(): void;
    hide(): void;
    render(): JSX.Element;
    private _renderIcon;
    private _renderItems;
    private _handleOnHide;
    private _handleOnShow;
    private _handleOnPressItem;
}
