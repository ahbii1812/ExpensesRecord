import { Picker } from "@react-native-picker/picker";
import React, { Component } from "react";
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
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
            tempSelectedCard: "",
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
            cardName: ""
        }

    }

    componentDidMount() {
        this.setState({ tempSelectCardType: this.state.cardTypeList[0].value })
    }

    render() {
        return <View style={{ height: "100%", width: "100%", backgroundColor: custom.mainBgColor, alignItems: "center" }}>
            <TopNavBar props={this.props.props.navigation} title={"Add Card"} backButton />
            <View style={{ width: "100%", marginTop: 35, backgroundColor: custom.minorBgColor }}>
                <View style={styles.textRowItemStyle}>
                    <Text style={styles.textTitleStyle}>Type :</Text>
                    <TouchableOpacity style={{ width: "60%", height: "100%", justifyContent: "center" }} onPress={() => { this.setState({ isShowCardTypePicker: true }); Keyboard.dismiss() }} >
                        {this.state.selectedCardType ? <Text style={{ color: custom.mainFontColor, fontSize: custom.titleFontSize }}>{this.state.selectedCardType}</Text>
                            :
                            <Text style={{ color: custom.placeholderTextColor, fontSize: custom.titleFontSize }}>Please Select Card Type...</Text>}
                    </TouchableOpacity>
                </View>
                <View style={styles.textRowItemStyle}>
                    <Text style={styles.textTitleStyle}>Card Brand :</Text>
                    <TouchableOpacity style={{ width: "60%", height: "100%", justifyContent: "center" }} onPress={() => { this.handleCardNameClick() }} >
                        {this.state.selectedCardBrand ? <Text style={{ color: custom.mainFontColor, fontSize: custom.titleFontSize }}>{this.state.selectedCardBrand}</Text>
                            :
                            <Text style={{ color: custom.placeholderTextColor, fontSize: custom.titleFontSize }}>Please Select Brand...</Text>}
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
                            onChangeText={(text) => { this.onChangeCreditLimit(text) }}
                            style={[styles.textInputStyle, { width: "85%" }]}
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
                    style={styles.textInputStyle}
                    value={this.state.cardName}
                    onChangeText={(text) => { this.setState({cardName : text}) }}></TextInput>
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

    handleCardNameClick() {
        if (this.state.selectedCardType == "E-Wallet") {
            this.setState({ tempSelectedCard: this.state.walletList[0].value })
        } else {
            this.setState({ tempSelectedCard: this.state.cardList[0].value })
        }

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
        const onConfirm = () => {
            this.setState({ selectedCardBrand: this.state.tempSelectedCard, isShowPicker: false })
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
                selectedValue={this.state.tempSelectedCard}
            onValueChange={(itemValue, itemIndex) =>{
                this.setState({ tempSelectedCard: itemValue })}}
                itemStyle={{ fontWeight: "bold", color: custom.mainFontColor }}
            >
                {this.state.selectedCardType == "E-Wallet" ? this.state.walletList.map((item, i) => <Picker.Item key={i} label={item.label} value={item.value} />) : this.state.cardList.map((item, i) => <Picker.Item key={i} label={item.label} value={item.value} />)}
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
                onValueChange={(itemValue, itemIndex) =>{
                    this.setState({ tempSelectedCard : "", selectedCardBrand: ""})
                    this.setState({ tempSelectCardType: itemValue })}}
                itemStyle={{ fontWeight: "bold", color: custom.mainFontColor }}
            >
                {this.state.cardTypeList.map((item, i) => <Picker.Item key={i} label={item.label} value={item.value} />)}
            </Picker>
        </View >
    }

    onSaveHandle() {
        if (this.state.selectedCardType == "") {
            ShowToast.showShortCenter("Please Select Card Type !")
            return
        } else if (this.state.selectedCardBrand == "") {
            ShowToast.showShortCenter("Please Select Bank/E-Wallet Name !")
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