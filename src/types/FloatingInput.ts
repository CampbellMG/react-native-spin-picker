import {TextInputProps} from 'react-native';

export interface FloatingInputProps extends TextInputProps {
    height: number
    visible: boolean
}