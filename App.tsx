import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NumberPicker} from "./src/components/NumberPicker";

export default function App() {
    return (
        <View style={styles.container}>
            <NumberPicker/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
