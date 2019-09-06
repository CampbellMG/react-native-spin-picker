import {StyleSheet, View} from 'react-native';
import React from 'react';
import {MaskStyles} from '../styles/Mask';
import {MaskProps} from '../types/Mask';

export function Mask(props: MaskProps) {
    const style = MaskStyles.mask;

    if (props.isTop == true) {
        style.bottom = props.height * 2;
        style.borderBottomWidth = StyleSheet.hairlineWidth;
    } else {
        style.top = props.height * 2;
        style.borderTopWidth = StyleSheet.hairlineWidth;
    }

    return <View pointerEvents='none' style={style}/>;
}