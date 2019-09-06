import {ViewStyle} from "react-native";

export interface NumberPickerItem {
    index: string
    value: number
}

export interface NumberPickerProps {
}

export interface NumberPickerState {
    height: number
}

export interface NumberPickerStyle {
    itemWrapper: ViewStyle,
    itemText: ViewStyle,
    itemTextSelected: ViewStyle,
}