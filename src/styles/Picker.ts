import {StyleSheet} from 'react-native';
import {PickerStyle} from "../types/Picker";

export const PickerStyles = StyleSheet.create<PickerStyle>({
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
    textInput:{
        height: this.state.height,
        position: 'absolute',
        top: height,
        bottom: height,
        left: 0,
        right: 0,
        textAlign: 'center',
        backgroundColor: 'white',
    }
});