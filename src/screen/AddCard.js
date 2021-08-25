import React, { Component, useState } from "react"
import { StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import custom from "../theme/customization";
import TopNavBar from '../component/topNavBar'
import { Picker } from "@react-native-picker/picker";

export default class AddCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [
                { label: "Public Bank", value: "Public Bank" },
                { label: "Maybank", value: "Maybank" },
                { label: "Hong Leong Bank", value: "Hong Leong Bank" },
                { label: "CIMB Bank", value: "CIMB Bank" }],
            selectedBank: "",
            isShowPicker: false,
        }

    }

    componentDidMount() {

    }

    renderPicker() {
        return <View style={{ height: "100%", width: "100%", position: "absolute", justifyContent: "flex-end" }}>
            <TouchableWithoutFeedback onPress={() => { this.setState({ isShowPicker: false }) }}>
                <View style={{ width: "100%", height: "70%" }} />
            </TouchableWithoutFeedback>
            <View style={{ height: 44, width: "100%", backgroundColor: "#696969", flexDirection: "row" }}>
                <TouchableOpacity onPress={() => { this.setState({ isShowPicker: false }) }} style={{ width: "20%", alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: custom.titleFontSize, color: custom.mainFontColor, fontWeight: "bold" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled style={{ width: "60%", alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: custom.titleFontSize, color: custom.mainFontColor, fontWeight: "bold" }}>Select Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: "20%", alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: custom.titleFontSize, color: custom.mainFontColor, fontWeight: "bold" }}>Confirm</Text>
                </TouchableOpacity>
            </View>
            <Picker
                style={{ backgroundColor: "#808080", height: "30%" }}
                selectedValue={this.state.selectedBank}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({ selectedBank: itemValue })}
                itemStyle={{ fontWeight: "bold", color: custom.mainFontColor }}
            >
                {this.state.data.map((item, i) => <Picker.Item key={i} label={item.label} value={item.value} />)}
            </Picker>
        </View >
    }


    render() {
        return <View style={{ height: "100%", width: "100%", backgroundColor: custom.mainBgColor }}>
            <TopNavBar props={this.props.props.navigation} title={"Add Card"} backButton />
            <View style={{ width: "100%", marginTop: 35, backgroundColor: custom.minorBgColor }}>
                <View style={styles.textRowItemStyle}>
                    <Text style={styles.textTitleStyle}>Account Bank :</Text>
                    <TouchableOpacity style={{ width: "60%", height: "100%", justifyContent: "center" }} onPress={() => { this.setState({ isShowPicker: true }) }} >
                        {this.state.selectedBank ? <Text style={{ color: custom.mainFontColor, fontSize: custom.titleFontSize }}>{this.state.selectedBank}</Text>
                            :
                            <Text style={{ color: custom.placeholderTextColor, fontSize: custom.titleFontSize }}>Please Select Bank...</Text>}
                    </TouchableOpacity>
                </View>
                <View style={styles.textRowItemStyle}>
                    <Text style={styles.textTitleStyle}>Balance :</Text>
                    <TextInput style={styles.textInputStyle}></TextInput>
                </View>
                <View style={styles.textRowItemStyle}>
                    <Text style={styles.textTitleStyle}>Credit Limit :</Text>
                    <TextInput style={styles.textInputStyle}></TextInput>
                </View>
                <View style={styles.textRowItemStyle}>
                    <Text style={styles.textTitleStyle}>Remarks :</Text>
                    <TextInput style={styles.textInputStyle}></TextInput>
                </View>
                <View style={[styles.textRowItemStyle, { height: 15, borderBottomWidth: 0 }]} />
            </View>
            {this.state.isShowPicker && this.renderPicker()}
        </View>
    }
}



const styles = StyleSheet.create({
    textRowItemStyle: {
        marginHorizontal: 10,
        height: 45,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderBottomColor: custom.borderColor
    },
    textInputStyle: {
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
    }
})