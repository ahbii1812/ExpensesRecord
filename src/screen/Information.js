import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import TopNavBar from "../component/topNavBar"
import dataStore from "../storageHelper/dataStore"
import custom from "../theme/customization"

export default function Setting(props) {
    return (
        <View style={{ width: "100%", height: "100%", backgroundColor: custom.mainBgColor }}>
            <TopNavBar props={props.props.navigation} title={"Information"} backButton />
            <View style={{ width: "100%", flexDirection: "column", backgroundColor: custom.minorBgColor, marginTop: 30 }}>
                <View style={styles.textRowItemStyle}>
                    <Text style={styles.textTitleStyle}>{"Version :"}</Text>
                    <Text style={styles.textContentStyle}>1.0.0</Text>
                </View>
                <View style={styles.textRowItemStyle}>
                    <Text style={styles.textTitleStyle}>{"Unique ID :"}</Text>
                    <Text style={styles.textContentStyle}>{dataStore.deviceID}</Text>
                </View>
            </View>
            <View style={{height: 44, width: "100%", position:"absolute", bottom: 100, justifyContent: "center", alignItems: "center"}}>
                <Text style={{fontSize: custom.contentFontSize, color: "rgba(255,255,255,0.5)"}}>Submit Feedback to ahbii.0630@gmail.com</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textRowItemStyle: {
        marginHorizontal: 10,
        minHeight: 45,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderBottomColor: custom.borderColor
    },
    textContentStyle: {
        marginVertical: 10,
        width: "60%",
        paddingVertical: 0,
        fontSize: custom.titleFontSize,
        color: custom.mainFontColor,
    },
    textTitleStyle: {
        marginLeft: 14,
        fontSize: custom.titleFontSize,
        color: custom.mainFontColor,
        width: "35%"
    },
})