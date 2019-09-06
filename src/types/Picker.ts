import {ViewStyle} from "react-native";
import React from 'react';

export interface PickerItem<T> {
    index: string
    item: T
}

export interface PickerProps<T> {
    data: T[]
    renderItem: (item: T, index: number) => React.ReactElement
    keyExtractor: (item: T) => void
}

export interface PickerState {
    height: number
}

export interface PickerStyle {
    itemWrapper: ViewStyle,
    itemText: ViewStyle,
    itemTextSelected: ViewStyle,
}