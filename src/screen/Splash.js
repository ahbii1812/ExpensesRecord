import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import ShowToast from '../component/toast';
import dataHelper from '../storageHelper/dataStore'
import FireBaseAPI from '../storageHelper/firebaseAPI';
import custom from '../theme/customization';

export default function InitApp(props) {

    useEffect(() => {

        dataHelper.getDeviceID()
        FireBaseAPI.firebaseGetRealTimeOwnData((res) => {
            if (res) {
                setTimeout(() => {
                    props.props.navigation.navigate("Home")
                }, 1500);
            } else {
                ShowToast.showShortCenter("Please Check Your Network Connection")
                setTimeout(() => {
                    props.props.navigation.navigate("Home")
                }, 1500);
            }

        });
    })

    return (
        <View style={{ width: "100%", height: "100%", backgroundColor: custom.mainBgColor, justifyContent: "center", alignItems: "center" }}>
            <Text style={{fontSize: 30, fontWeight: "bold", color: custom.mainFontColor}}>Record</Text>
            <Text style={{fontSize: 30, fontWeight: "bold", color: custom.mainFontColor}}>Your Expenses</Text>
        </View>
    )

}