import {TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import {ArrowButtonProps} from '../types';

export const ArrowButton: React.FunctionComponent<ArrowButtonProps> =
    ({isPointingDown, height, onPress, onLongPress, onLift, arrowStyle}) => {
        const style: ViewStyle = {
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderLeftWidth: height / 3,
            borderRightWidth: height / 3,
            borderBottomWidth: height / 3,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: 'grey',
            alignSelf: 'center',
            marginBottom: isPointingDown ? 0 : 8,
            marginTop: isPointingDown ? 8 : 0,
            transform: isPointingDown ? [{rotate: '180deg'}] : [],
            ...arrowStyle
        };

        return <TouchableOpacity onPress={onPress}
                                 onLongPress={onLongPress}
                                 onPressOut={onLift}
                                 style={style}/>;
    };