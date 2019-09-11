import {TextInputProps, TextStyle, ViewStyle} from 'react-native';
import React from 'react';
import {ExternalArrowButtonProps} from './ArrowButton';

export interface ExternalArrowButtonProps {
    arrowStyle?: ViewStyle
}

export interface ArrowButtonOwnProps {
    height: number
    onPress?: () => void
    onLongPress?: () => void
    onLift?: () => void
    isPointingDown?: boolean
}

export type ArrowButtonProps = ArrowButtonOwnProps & ExternalArrowButtonProps

export interface FloatingInputProps extends TextInputProps {
    height: number
    visible: boolean
}

export interface MaskProps {
    height: number
    isTop?: boolean
}

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
    onInputValueChanged?: (value: string, previousValue: string) => string
    textInputProps?: TextInputProps
    textInputStyle?: TextStyle
}

export interface PickerState {
    height: number
    selectedIndex: number
    isTyping: boolean
    inputValue: string
}