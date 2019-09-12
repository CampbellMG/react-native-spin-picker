import {ExternalArrowButtonProps} from './ArrowButton';
import React from 'react';
import {TextInputProps, TextStyle} from 'react-native';

export interface SpinPickerItem<T> {
    index: string
    item: T
}

export interface SpinPickerState {
    height: number
    selectedIndex: number
    isTyping: boolean
    inputValue: string
}

export interface SpinPickerProps<T> extends ExternalArrowButtonProps {
    data: T[]
    value: T
    onValueChange: (value: T) => void
    renderItem: (item: T, index: number) => React.ReactElement
    keyExtractor: (item: T) => void
    showArrows?: boolean
    onInputValueChanged?: (value: string, previousValue: string) => string
    textInputProps?: TextInputProps
    textInputStyle?: TextStyle
}