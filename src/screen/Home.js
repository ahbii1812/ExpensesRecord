import React, {useEffect, useState} from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native';

const Screen2 = props => {
    const navigator = props.props.navigation;
    useEffect(() =>{

    })

    function xxx() {

    }

    const xxxxx = () => {

    }

    return <View style={{height: "100%", width: "100%", backgroundColor: "blue"}}>
        <TouchableOpacity onPress={()=>{navigator.navigate("Screen2", {Abb:"123123"})}}>
            <View style={{height: 200, width: 400, backgroundColor: "red"}}></View>

        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create ({

})

export default Screen2;