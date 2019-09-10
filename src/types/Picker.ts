import {ViewStyle} from "react-native";
import React from 'react';
import {ExternalArrowButtonProps} from './ArrowButton';

export interface PickerItem<T> {
    index: string
    item: T
}

export interface PickerProps<T> extends ExternalArrowButtonProps {
    data: T[]
    value: T
    onValueChange: (value: T) => void
    renderItem: (item: T, index: number) => React.ReactElement
    keyExtractor: (item: T) => void
    showArrows?: boolean
}

export interface PickerState {
    height: number
    selectedIndex: number
}

export interface PickerStyle {
    itemWrapper: ViewStyle,
    itemText: ViewStyle,
    itemTextSelected: ViewStyle,
}