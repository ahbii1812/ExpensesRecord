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
import Screen2 from '../screen/screen2'
import Home from '../screen/Home';
import custom from '../theme/customization';

function HomePage({ navigation }) {
    return <Stack.Navigator initialRouteName="Home"
        screenOptions={{ headerShown: false, style: { backgroundColor: "red" } }}>
        <Stack.Screen name="Home" >
            {props => <Home props={props} />}
        </Stack.Screen>
        <Stack.Screen name="Screen2" >
            {props => <Screen2 props={props} />}
        </Stack.Screen>
    </Stack.Navigator>

}

const Stack = createStackNavigator();

function App({ navigation }) {
    return (
        <NavigationContainer style={{ backgroundColor: custom.mainColor }}>
            <StatusBar translucent backgroundColor="transparent"></StatusBar>
            <SafeAreaView style={{ backgroundColor: custom.mainColor, flex: 0 }} />
            <SafeAreaView style={{ backgroundColor: custom.mainColor, flex: 1 }}>
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
