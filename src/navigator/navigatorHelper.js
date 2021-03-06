/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddCard from '../screen/AddCard'
import Home from '../screen/Home';
import custom from '../theme/customization';
import SplashScreen from '../screen/Splash'
import AddRecord from '../screen/AddRecord'
import AllRecord from '../screen/AllRecord'
import Information from '../screen/Information';

function HomePage({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="Splash"
        sceneAnimationEnabled={false}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" >
                {props => <SplashScreen props={props} />}
            </Stack.Screen>
            <Stack.Screen name="Home" >
                {props => <Home props={props} />}
            </Stack.Screen>
            <Stack.Screen name="Add Card" >
                {props => <AddCard props={props} />}
            </Stack.Screen>
            <Stack.Screen name="Add Record" >
                {props => <AddRecord props={props} />}
            </Stack.Screen>
            <Stack.Screen name="All Record" >
                {props => <AllRecord props={props} />}
            </Stack.Screen>
            <Stack.Screen name="Information" >
                {props => <Information props={props} />}
            </Stack.Screen>
        </Stack.Navigator>)

}

const Stack = createStackNavigator();

function App({ navigation }) {
    return (
        <NavigationContainer style={{ backgroundColor: custom.mainBgColor }} theme={{ colors: { background: custom.mainBgColor } }}>
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
