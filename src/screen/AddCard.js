import Picker from "react-native-picker-select";
import React, { Component } from "react";
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native';
import ShowToast from "../component/toast";
import TopNavBar from '../component/topNavBar';
import dataStore from "../storageHelper/dataStore";
import FireBaseAPI from "../storageHelper/firebaseAPI";
import custom from "../theme/customization";

export default class AddCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            walletList: [
                { label: "Aeon Wallet", value: "Aeon Wallet" },
                { label: "Alipay", value: "Alipay" },
                { label: "Boost", value: "Boost" },
                { label: "GrabPay", value: "GrabPay" },
                { label: "MAE Wallet", value: "MAE Wallet" },
                { label: "Paypal", value: "Paypal" },
                { label: "Shopee Pay", value: "Shopee Pay" },
                { label: "Touch n Go", value: "Touch n Go" },
                { label: "Others", value: "Others" }
            ],
            cardList: [
                { label: "Affin Bank", value: "Affin Bank" },
                { label: "Agro Bank", value: "Agro Bank" },
                { label: "AmBank", value: "AmBank" },
                { label: "CIMB Bank", value: "CIMB Bank" },
                { label: "Exim Bank", value: "Exim Bank" },
                { label: "HSBC Bank", value: "HSBC Bank" },
                { label: "Hong Leong Bank", value: "Hong Leong Bank" },
                { label: "Maybank", value: "Maybank" },
                { label: "OCBC Bank", value: "OCBC Bank" },
                { label: "Public Bank", value: "Public Bank" },
                { label: "RHB Bank", value: "RHB Bank" },
                { label: "Standard Chartered Bank", value: "Standard Chartered Bank" },
                { label: "UOB Bank", value: "UOB Bank" },
                { label: "Others", value: "Others" },
            ],
            selectedCardBrand: "",
            isShowPicker: false,
            cardTypeList: [
                { label: "Credit Card", value: "Credit Card" },
                { label: "Debit Card", value: "Debit Card" },
                { label: "E-Wallet", value: "E-Wallet" }],
            selectedCardType: "",
            isShowCardTypePicker: false,
            amount: 0,
            creditLimit: 0,
            cardName: ""
        }

    }

    componentDidMount() {
    }

    render() {
        return <View style={{ height: "100%", width: "100%", backgroundColor: custom.mainBgColor, alignItems: "center" }}>
            <TopNavBar props={this.props.props.navigation} title={"Add Card"} backButton />
            <View style={{ width: "100%", marginTop: 35, backgroundColor: custom.minorBgColor }}>
                <View style={styles.textRowItemStyle}>
                    <Text style={styles.textTitleStyle}>Type :</Text>
                    <View style={{ width: "60%", height: "100%", justifyContent: "center" }}>
                        {this.renderCardTypePicker()}
                    </View>
                </View>
                <View style={styles.textRowItemStyle}>
                    <Text style={styles.textTitleStyle}>Card Brand :</Text>
                    <TouchableOpacity style={{ width: "60%", height: "100%", justifyContent: "center" }} onPress={() => { this.handleCardNameClick() }} >
                        {this.state.selectedCardType == "" ? <Text style={{ color: custom.placeholderTextColor, fontSize: custom.titleFontSize }}>{"Select a brand..."}</Text>
                            : this.renderPicker()}
                    </TouchableOpacity>
                </View>
                <View style={styles.textRowItemStyle}>
                    <Text style={[styles.textTitleStyle, { width: this.state.selectedCardType == "Credit Card" ? "50%" : "35%" }]}>{this.state.selectedCardType == "Credit Card" ? "Out Standing Balance" : "Balance"} :</Text>
                    <View style={{ width: "60%", flexDirection: "row" }}>
                        <Text style={[styles.textInputStyle, { width: "15%", paddingTop: Platform.OS == "ios" ? 0 : 2 }]}>RM</Text>
                        <TextInput
                            maxLength={10}
                            keyboardType="numeric"
                            onChangeText={(text) => { this.onChangeAmount(text) }}
                            style={[styles.textInputStyle, { width: "85%", padding: 0}]}
                            placeholder={"0.00"}
                            value={this.state.amount}
                            placeholderTextColor={custom.placeholderTextColor}
                            returnKeyType='done' />
                    </View>
                </View>
                {this.state.selectedCardType == "Credit Card" && <View style={styles.textRowItemStyle}>
                    <Text style={styles.textTitleStyle}>Credit Limit :</Text>
                    <View style={{ width: "60%", flexDirection: "row" }}>
                        <Text style={[styles.textInputStyle, { width: "15%", paddingTop: Platform.OS == "ios" ? 0 : 2 }]}>RM</Text>
                        <TextInput
                            maxLength={10}
                            keyboardType="numeric"
                            onChangeText={(text) => { this.onChangeCreditLimit(text) }}
                            style={[styles.textInputStyle, { width: "85%", padding: 0 }]}
                            placeholder={"0.00"}
                            value={this.state.creditLimit}
                            placeholderTextColor={custom.placeholderTextColor}
                            returnKeyType='done' />
                    </View>
                </View>}
                <View style={styles.textRowItemStyle}>
                    <Text style={styles.textTitleStyle}>Card Name :</Text>
                    <TextInput
                        placeholder={"Default (Card Brand)"}
                        placeholderTextColor={custom.placeholderTextColor}
                        style={[styles.textInputStyle, , {padding: 0}]}
                        value={this.state.cardName}
                        onChangeText={(text) => { this.setState({ cardName: text }) }}></TextInput>
                </View>
                <View style={[styles.textRowItemStyle, { height: 15, borderBottomWidth: 0 }]} />
            </View>
            <TouchableOpacity onPress={() => this.onSaveHandle()} style={styles.addButtonStyle} >
                <Text style={{ color: custom.mainFontColor, fontSize: custom.navBarTitleFontSize, fontWeight: "bold" }}>Add</Text>
            </TouchableOpacity>
        </View>
    }

    verifyDuplicateCard(cardType) {
        let tempCardList = cardType == "E-Wallet" ? this.state.walletList : this.state.cardList;
        dataStore.allCard.map((item) => {
            if (item.cardType == cardType) {
                tempCardList.map((o, index) => {
                    if (o.label == item.cardBrand || o.value == item.cardBrand) {
                        tempCardList.splice(index, 1)
                    }
                })
            }
        })
        return cardType == "E-Wallet" ? this.setState({ walletList: tempCardList }) : this.setState({ cardList: tempCardList })
    }

    handleCardNameClick() {
        if (this.state.selectedCardType == "") {
            ShowToast.showShortCenter("Please Select Card Type...")
            Keyboard.dismiss()
            return
        }

        this.setState({ isShowPicker: true });
        Keyboard.dismiss()
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

    onChangeCreditLimit(text) {
        let str = text.toString();
        if (str.includes(".")) {
            let arr = str.split(".");
            if (arr?.[1]?.length < 3) {
                this.setState({ creditLimit: text })
            }
        } else { this.setState({ creditLimit: text }) }
    }

    renderPicker() {
        return <Picker
            selectedValue={this.state.selectedCardBrand}
            onValueChange={(itemValue, itemIndex) => {
                this.setState({ selectedCardBrand: itemValue })
            }}
            useNativeAndroidPickerStyle={false}
            style={{
                inputAndroid: {
                    color: custom.mainFontColor,
                    fontSize: custom.titleFontSize,
                    padding: 0
                },
                inputIOS: {
                    color: custom.mainFontColor,
                    fontSize: custom.titleFontSize
                },
            }}
            placeholder={{
                label: 'Select a brand...',
                value: null,
                color: custom.placeholderTextColor,
            }}

            itemStyle={{ fontWeight: "bold", color: custom.mainFontColor }}
            items={this.state.selectedCardType == "E-Wallet" ? this.state.walletList : this.state.cardList}
        >
            {/* {this.state.selectedCardType == "E-Wallet" ? this.state.walletList.map((item, i) => <Picker.Item key={i} label={item.label} value={item.value} />) : this.state.cardList.map((item, i) => <Picker.Item key={i} label={item.label} value={item.value} />)} */}
        </Picker>
    }

    renderCardTypePicker() {

        return <Picker
            selectedValue={this.state.selectedCardType}
            onValueChange={(itemValue, itemIndex) => {
                this.setState({ selectedCardBrand: "" })
                this.setState({ selectedCardType: itemValue })
            }}
            useNativeAndroidPickerStyle={false}
            style={{
                inputAndroid: {
                    color: custom.mainFontColor,
                    fontSize: custom.titleFontSize,
                    padding: 0
                },
                inputIOS: {
                    color: custom.mainFontColor,
                    fontSize: custom.titleFontSize
                },
            }}
            placeholder={{
                label: 'Select a Type...',
                value: null,
                color: custom.placeholderTextColor,
            }}

            itemStyle={{ fontWeight: "bold", color: custom.mainFontColor }}
            items={this.state.cardTypeList}
        />
    }

    onSaveHandle() {
        console.log("WJ this.state.selectedCardBrand",this.state.selectedCardBrand)
        if (this.state.selectedCardType == "") {
            ShowToast.showShortCenter("Please Select Card Type !")
            return
        } else if (this.state.selectedCardBrand == "") {
            ShowToast.showShortCenter("Please Select Bank/E-Wallet Brand !")
            return
        } else if (this.state.selectedCardBrand == null) {
            ShowToast.showShortCenter("Brand not valid ! Please choose again...")
            return
        }
        if (this.state.amount == "") {
            this.setState({ amount: 0 })
        }
        if (this.state.creditLimit == "") {
            this.setState({ creditLimit: 0 })
        }
        let data = {
            cardBrand: this.state.selectedCardBrand,
            cardType: this.state.selectedCardType,
            currentAmount: this.state.amount,
            creditLimit: this.state.creditLimit,
            cardName: this.state.cardName
        }
        dataStore.allCard.push(data)
        FireBaseAPI.firebaseAddCard(dataStore.allCard, ((res) => {
            if (res) {
                this.props.props.navigation.navigate("Home")
            } else {
                ShowToast.showShortCenter("Add Card Failed !")
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