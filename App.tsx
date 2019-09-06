import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {Picker} from "./src/components/Picker";

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <Picker data={[...Array(100).keys()]}
                    keyExtractor={number => number.toString()}
                    renderItem={({item}) => {
                              return <Text style={{marginHorizontal: 64, fontSize: 32}}>{item}</Text>;
                          }}/>
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
