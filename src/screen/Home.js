import React, {useEffect, useState} from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import FireBaseAPI from '../storageHelper/firebaseAPI';

const Screen2 = props => {
    const navigator = props.props.navigation;
    useEffect(() =>{
        FireBaseAPI.firebaseGetRealTimeData()
    })

    function onPressHandle() {
        FireBaseAPI.firebaseAddData({name : "ahbii1", age : "24"})
    }

    function xxx() {

    }

    const xxxxx = () => {

    }

    return <View style={{height: "100%", width: "100%", backgroundColor: "blue"}}>
        <TouchableOpacity onPress={()=>{ onPressHandle(); navigator.navigate("Screen2", {Abb:"123123"})}}>
            <View style={{height: 200, width: 400, backgroundColor: "red"}}></View>

        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create ({

})

export default Screen2;