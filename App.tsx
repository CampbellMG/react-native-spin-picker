import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NumberPicker} from "./src/components/NumberPicker";

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <NumberPicker/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
});
