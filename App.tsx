import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Picker} from "./src/components/Picker";

interface AppState {
    selectedItem: number
}

export default class App extends React.Component<{}, AppState> {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: 57
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                <Picker data={[...Array(100).keys()]}
                        value={this.state.selectedItem}
                        onValueChange={value => this.setState({selectedItem: value})}
                        keyExtractor={number => number.toString()}
                        renderItem={({item}) => <Text
                            style={{marginHorizontal: 64, fontSize: 32, height: 40}}>{item}</Text>}/>
                </View>
                <Button title='increment' onPress={() => this.setState({selectedItem: this.state.selectedItem + 1})}/>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
});
