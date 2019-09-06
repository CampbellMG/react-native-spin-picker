import {StyleSheet} from 'react-native';
import {PickerStyle} from "../types/Picker";
import {MaskStyles} from '../types/Mask';

export const MaskStyles = StyleSheet.create<MaskStyles>({
    mask: {
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255,255,255,0.8)',
    }
});