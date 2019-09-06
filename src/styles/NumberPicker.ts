import {StyleSheet} from 'react-native';
import {NumberPickerStyle} from "../types/NumberPicker";

export const NumberPickerStyles = StyleSheet.create<NumberPickerStyle>({
    itemWrapper: {
        height:30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText:{
        color:'#999',
    },
    itemTextSelected:{
        color:'#333',
    },
});