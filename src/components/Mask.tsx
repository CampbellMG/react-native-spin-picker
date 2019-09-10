import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {MaskProps} from '../types/Mask';

export const Mask: React.FunctionComponent<MaskProps> = ({height, isTop}) => {
    const style: ViewStyle = {
        position: 'absolute',
        top: isTop ? 0 : height * 2,
        bottom: isTop ? height * 2 : 0,
        left: 0,
        right: 0,
        borderTopWidth: isTop ? 0 : StyleSheet.hairlineWidth,
        borderBottomWidth: isTop ? StyleSheet.hairlineWidth : 0,
        backgroundColor: 'rgba(255,255,255,0.8)'
    };

    return <View pointerEvents='none' style={style}/>;
};