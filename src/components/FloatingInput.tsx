import {TextInput, TextStyle, View} from 'react-native';
import React from 'react';
import {FloatingInputProps} from '../types';

export const FloatingInput: React.FunctionComponent<FloatingInputProps> = props => {
    if (!props.visible) return <View/>;

    const style: TextStyle = {
        height: props.height,
        position: 'absolute',
        top: props.height,
        bottom: props.height,
        left: 0,
        right: 0,
        textAlign: 'center',
        backgroundColor: 'white',
    };

    return <TextInput autoFocus {...props} style={[style, props.style]}/>;
};