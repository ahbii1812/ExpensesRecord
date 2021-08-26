import { Picker } from "@react-native-picker/picker";
import React, { Component } from "react";
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import TopNavBar from '../component/topNavBar';
import dataStore from "../storageHelper/dataStore";
import FireBaseAPI from "../storageHelper/firebaseAPI";
import custom from "../theme/customization";

export default class AddCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bankList: [
                { label: "Aeon Wallet", value: "Aeon Wallet" },
                { label: "Affin Bank", value: "Affin Bank" },
                { label: "Agro Bank", value: "Agro Bank" },
                { label: "Alipay", value: "Alipay" },
                { label: "AmBank", value: "AmBank" },
                { label: "Boost", value: "Boost" },
                { label: "CIMB Bank", value: "CIMB Bank" },
                { label: "Exim Bank", value: "Exim Bank" },
                { label: "GrabPay", value: "GrabPay" },
                { label: "HSBC Bank", value: "HSBC Bank" },
                { label: "Hong Leong Bank", value: "Hong Leong Bank" },
                { label: "Maybank", value: "Maybank" },
                { label: "MAE Wallet", value: "MAE Wallet" },
                { label: "OCBC Bank", value: "OCBC Bank" },
                { label: "Paypal", value: "Paypal" },
                { label: "Public Bank", value: "Public Bank" },
                { label: "RHB Bank", value: "RHB Bank" },
                { label: "Standard Chartered Bank", value: "Standard Chartered Bank" },
                { label: "Shopee Pay", value: "Shopee Pay" },
                { label: "Touch n Go", value: "Touch n Go" },
                { label: "UOB Bank", value: "UOB Bank" },
                { label: "Others", value: "Others" },
            ],
            selectedBank: "",
            tempSelectedBank: "",
            isShowPicker: false,
            cardTypeList: [
                { label: "Credit Card", value: "Credit Card" },
                { label: "Debit Card / Saving Account", value: "Debit Card / Saving Account" },
                { label: "E-Wallet", value: "E-Wallet" }],
            tempSelectCardType: "",
            selectedCardType: "",
            isShowCardTypePicker: false,
            amount: "",
            creditLimit: "",
            remarks: ""
        }

    }

    componentDidMount() {
        this.setState({ tempSelectedBank: this.state.bankList[0].value })
        this.setState({ tempSelectCardType: this.state.cardTypeList[0].value })
    }

    render() {
        return <View style={{ height: "100%", width: "100%", backgroundColor: custom.mainBgColor, alignItems: "center" }}>
            <TopNavBar props={this.props.props.navigation} title={"Add Card"} backButton />
            <View style={{ width: "100%", marginTop: 35, backgroundColor: custom.minorBgColor }}>
                <View style={styles.textRowItemStyle}>
                    <Text style={styles.textTitleStyle}>Bank Or Wallet :</Text>
                    <TouchableOpacity style={{ width: "60%", height: "100%", justifyContent: "center" }} onPress={() => { this.setState({ isShowPicker: true }); Keyboard.dismiss() }} >
                        {this.state.selectedBank ? <Text style={{ color: custom.mainFontColor, fontSize: custom.titleFontSize }}>{this.state.selectedBank}</Text>
                            :
                            <Text style={{ color: custom.placeholderTextColor, fontSize: custom.titleFontSize }}>Please Select Bank...</Text>}
                    </TouchableOpacity>
                </View>
                <View style={styles.textRowItemStyle}>
                    <Text style={styles.textTitleStyle}>Card Type :</Text>
                    <TouchableOpacity style={{ width: "60%", height: "100%", justifyContent: "center" }} onPress={() => { this.setState({ isShowCardTypePicker: true }); Keyboard.dismiss() }} >
                        {this.state.selectedCardType ? <Text style={{ color: custom.mainFontColor, fontSize: custom.titleFontSize }}>{this.state.selectedCardType}</Text>
                            :
                            <Text style={{ color: custom.placeholderTextColor, fontSize: custom.titleFontSize }}>Please Select Card Type...</Text>}
                    </TouchableOpacity>
                </View>
                <View style={styles.textRowItemStyle}>
                    <Text style={styles.textTitleStyle}>Balance :</Text>
                    <View style={{ width: "60%", flexDirection: "row" }}>
                        <Text style={[styles.textInputStyle, { width: "15%" }]}>RM</Text>
                        <TextInput
                            maxLength={10}
                            keyboardType="numeric"
                            onChangeText={(text) => { this.onChangeAmount(text) }}
                            style={[styles.textInputStyle, { width: "85%" }]}
                            placeholder={"0.00"}
                            value={this.state.amount}
                            placeholderTextColor={custom.placeholderTextColor}
                            returnKeyType='done' />
                    </View>
                </View>
                {this.state.selectedCardType == "Credit Card" && <View style={styles.textRowItemStyle}>
                    <Text style={styles.textTitleStyle}>Credit Limit :</Text>
                    <View style={{ width: "60%", flexDirection: "row" }}>
                        <Text style={[styles.textInputStyle, { width: "15%" }]}>RM</Text>
                        <TextInput
                            maxLength={10}
                            keyboardType="numeric"
                            onChangeText={(text) => { this.onChangeAmount(text) }}
                            style={[styles.textInputStyle, { width: "85%" }]}
                            placeholder={"0.00"}
                            value={this.state.amount}
                            placeholderTextColor={custom.placeholderTextColor}
                            returnKeyType='done' />
                    </View>
                </View>}
                <View style={styles.textRowItemStyle}>
                    <Text style={styles.textTitleStyle}>Remarks :</Text>
                    <TextInput style={styles.textInputStyle}></TextInput>
                </View>
                <View style={[styles.textRowItemStyle, { height: 15, borderBottomWidth: 0 }]} />
            </View>
            <TouchableOpacity onPress={() => this.onSaveHandle()} style={styles.addButtonStyle} >
                <Text style={{ color: custom.mainFontColor, fontSize: custom.navBarTitleFontSize, fontWeight: "bold" }}>Add</Text>
            </TouchableOpacity>
            {this.state.isShowPicker && this.renderPicker()}
            {this.state.isShowCardTypePicker && this.renderCardTypePicker()}
        </View>
    }

    onChangeAmount(text) {
        let str = text.toString();
        if (str.includes(".")) {
            let arr = str.split(".");
            if (arr?.[1]?.length < 3) {
                this.setState({ amount: text })
            }
        } else { this.setState({ amount: text }) }
    }

    onCreditLimit(text) {
        let str = text.toString();
        if (str.includes(".")) {
            let arr = str.split(".");
            if (arr?.[1]?.length < 3) {
                this.setState({ creditLimit: text })
            }
        } else { this.setState({ creditLimit: text }) }
    }

    renderPicker() {
        const onConfirm = () => {
            this.setState({ selectedBank: this.state.tempSelectedBank, isShowPicker: false })
        }

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
                <TouchableOpacity onPress={() => onConfirm()} style={{ width: "20%", alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: custom.titleFontSize, color: custom.mainFontColor, fontWeight: "bold" }}>Confirm</Text>
                </TouchableOpacity>
            </View>
            <Picker
                style={{ backgroundColor: "#808080", height: "30%" }}
                selectedValue={this.state.tempSelectedBank}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({ tempSelectedBank: itemValue })}
                itemStyle={{ fontWeight: "bold", color: custom.mainFontColor }}
            >
                {this.state.bankList.map((item, i) => <Picker.Item key={i} label={item.label} value={item.value} />)}
            </Picker>
        </View >
    }

    renderCardTypePicker() {
        const onConfirm = () => {
            this.setState({ selectedCardType: this.state.tempSelectCardType, isShowCardTypePicker: false })
        }

        return <View style={{ height: "100%", width: "100%", position: "absolute", justifyContent: "flex-end" }}>
            <TouchableWithoutFeedback onPress={() => { this.setState({ isShowCardTypePicker: false }) }}>
                <View style={{ width: "100%", height: "70%" }} />
            </TouchableWithoutFeedback>
            <View style={{ height: 44, width: "100%", backgroundColor: "#696969", flexDirection: "row" }}>
                <TouchableOpacity onPress={() => { this.setState({ isShowCardTypePicker: false }) }} style={{ width: "20%", alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: custom.titleFontSize, color: custom.mainFontColor, fontWeight: "bold" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled style={{ width: "60%", alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: custom.titleFontSize, color: custom.mainFontColor, fontWeight: "bold" }}>Select Account</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onConfirm()} style={{ width: "20%", alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: custom.titleFontSize, color: custom.mainFontColor, fontWeight: "bold" }}>Confirm</Text>
                </TouchableOpacity>
            </View>
            <Picker
                style={{ backgroundColor: "#808080", height: "30%" }}
                selectedValue={this.state.tempSelectCardType}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({ tempSelectCardType: itemValue })}
                itemStyle={{ fontWeight: "bold", color: custom.mainFontColor }}
            >
                {this.state.cardTypeList.map((item, i) => <Picker.Item key={i} label={item.label} value={item.value} />)}
            </Picker>
        </View >
    }

    onSaveHandle() {
        let data = {
            bank: this.state.selectedBank,
            cardType: this.state.selectedCardType,
            currentAmount: this.state.amount,
            creditLimit: this.state.creditLimit,
            remarks: this.state.remarks
        }
        dataStore.allCard.push(data)
        FireBaseAPI.firebaseAddCard(JSON.stringify(dataStore.allCard), ((res) => {
            if (res) {
                this.props.props.navigation.navigate("Home")
            }
        }))
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
    },
    addButtonStyle: {
        marginTop: 50,
        backgroundColor:
            custom.minorBgColor,
        width: "90%",
        borderRadius: 15,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    }
})