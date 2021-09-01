import React, { useEffect } from 'react'
import { View, Image } from 'react-native'
import ShowToast from '../component/toast';
import dataHelper from '../storageHelper/dataStore'
import FireBaseAPI from '../storageHelper/firebaseAPI';

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
        <View style={{ width: "100%", height: "100%", backgroundColor: "red" }}>

        </View>
    )

}