/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddCard from '../screen/AddCard'
import Home from '../screen/Home';
import custom from '../theme/customization';

function HomePage({ navigation }) {
    return <Stack.Navigator initialRouteName="Home"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" >
            {props => <Home props={props} />}
        </Stack.Screen>
        <Stack.Screen name="Add Card" >
            {props => <AddCard props={props} />}
        </Stack.Screen>
    </Stack.Navigator>

}

const Stack = createStackNavigator();

function App({ navigation }) {
    return (
        <NavigationContainer style={{ backgroundColor: custom.mainBgColor }}>
            <StatusBar translucent backgroundColor="transparent"></StatusBar>
            <SafeAreaView style={{ backgroundColor: custom.mainBgColor, flex: 0 }} />
            <SafeAreaView style={{ backgroundColor: custom.mainBgColor, flex: 1 }}>
                <HomePage />
            </SafeAreaView>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    iconStyle: {
        width: 25,
        height: 25,
        marginTop: 10
    },
    bottomButtonStyle: {
        width: "25%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    bottomTextStyle: {
        marginBottom: 10
    }
});

export default App;
