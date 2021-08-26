import React, {useEffect} from 'react'
import {View, Image} from 'react-native'
import dataHelper from '../storageHelper/dataStore'
import FireBaseAPI from '../storageHelper/firebaseAPI';

export default function InitApp(props) {

    useEffect(() => {
        
        dataHelper.getDeviceID((res) => {
            setTimeout(() => {
                props.props.navigation.navigate("Home")
            }, 1500);
        })
        FireBaseAPI.firebaseGetRealTimeOwnData();
    })

    return (
    <View style={{width: "100%", height: "100%", backgroundColor: "red"}}>

    </View>
    )

}