import { Picker } from "@react-native-picker/picker";
import React, { Component } from "react";
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, ActivityIndicator, Platform } from 'react-native';
import ShowToast from "../component/toast";
import TopNavBar from '../component/topNavBar';
import dataStore from "../storageHelper/dataStore";
import FireBaseAPI from "../storageHelper/firebaseAPI";
import custom from "../theme/customization";
import moment from "moment";
import DatePickerModal from "../component/datePickerModal";

export default class AddCard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            cardList: [],
            selectedCardBrand: "",
            tempSelectedCardBrand: "",
            isShowPicker: false,
            cardTypeList: [
                { label: "Credit Card", value: "Credit Card" },
                { label: "Debit Card / Saving Account", value: "Debit Card / Saving Account" },
                { label: "E-Wallet", value: "E-Wallet" }],
            tempSelectCardType: "",
            selectedCardType: "",
            isShowCardTypePicker: false,
            amount: "",
            remarks: "",
            isLoadFinish: true,
            categorizedCard: [],
            selectedRecordType: "Income",
            date: new Date()
        }

    }

    componentDidMount() {
        let categorizedCard = Object.values(dataStore.allCard.reduce((card, item) => {
            if (!card[item.cardType]) card[item.cardType] = {
                cardType: item.cardType,
                availableCard: []
            };
            card[item.cardType].availableCard.push(item);
            return card;
        }, {}))

        this.setState({ categorizedCard: categorizedCard });
        this.setState({ tempSelectCardType: this.state.cardTypeList[0].value })
    }

    render() {
        return <View style={{ height: "100%", width: "100%", backgroundColor: custom.mainBgColor, alignItems: "center" }}>
            <TopNavBar props={this.props.props.navigation} title={"Add Record"} backButton />
            <View style={{ height: 40, width: "100%", marginVertical: 40, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                <TouchableOpacity onPress={() => { this.setState({ selectedRecordType: "Income" }) }} style={[styles.tabButtonStyle, { borderColor: this.state.selectedRecordType == "Income" ? custom.incomeColor : custom.mainFontColor }]}>
                    <Text style={[styles.textTypeStyle, { color: this.state.selectedRecordType == "Income" ? custom.incomeColor : custom.mainFontColor }]}>Income</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.setState({ selectedRecordType: "Expenses" }) }} style={[styles.tabButtonStyle, { borderColor: this.state.selectedRecordType == "Expenses" ? custom.expensesColor : custom.mainFontColor }]}>
                    <Text style={[styles.textTypeStyle, { color: this.state.selectedRecordType == "Expenses" ? custom.expensesColor : custom.mainFontColor }]}>Expenses</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: "100%", backgroundColor: custom.minorBgColor }}>
                <View style={styles.textRowItemStyle}>
                    <Text style={styles.textTitleStyle}>Date :</Text>
                    <TouchableOpacity style={{ width: "60%", height: "100%", justifyContent: "center" }} onPress={() => { this._datepicker.setModalVisible(true); Keyboard.dismiss() }} >
                        <Text style={{ color: custom.mainFontColor, fontSize: custom.titleFontSize }}>{moment(this.state.date).format('D MMMM YYYY')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.textRowItemStyle}>
                    <Text style={styles.textTitleStyle}>Type :</Text>
                    <TouchableOpacity style={{ width: "60%", height: "100%", justifyContent: "center" }} onPress={() => { this.setState({ isShowCardTypePicker: true }); Keyboard.dismiss() }} >
                        {this.state.selectedCardType ? <Text style={{ color: custom.mainFontColor, fontSize: custom.titleFontSize }}>{this.state.selectedCardType}</Text>
                            :
                            <Text style={{ color: custom.placeholderTextColor, fontSize: custom.titleFontSize }}>Please Select Card Type...</Text>}
                    </TouchableOpacity>
                </View>
                <View style={styles.textRowItemStyle}>
                    <Text style={styles.textTitleStyle}>Bank Brand :</Text>
                    <TouchableOpacity style={{ width: "60%", height: "100%", justifyContent: "center" }} onPress={() => { this.handleCardNameClick() }} >
                        {this.state.selectedCardBrand ? <Text style={{ color: custom.mainFontColor, fontSize: custom.titleFontSize }}>{this.state.selectedCardBrand}</Text>
                            :
                            <Text style={{ color: custom.placeholderTextColor, fontSize: custom.titleFontSize }}>Please Select Brand...</Text>}
                    </TouchableOpacity>
                </View>
                <View style={styles.textRowItemStyle}>
                    <Text style={styles.textTitleStyle}>Amount :</Text>
                    <View style={{ width: "60%", flexDirection: "row" }}>
                        <Text style={[styles.textInputStyle, { width: "15%",  paddingTop: Platform.OS == "ios" ? 0 : 2, }]}>RM</Text>
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
                <View style={styles.textRowItemStyle}>
                    <Text style={styles.textTitleStyle}>Remarks :</Text>
                    <TextInput
                        placeholder={"Tap to Type"}
                        placeholderTextColor={custom.placeholderTextColor}
                        style={styles.textInputStyle}
                        onChangeText={(text) => { this.setState({ remarks: text }) }}></TextInput>
                </View>
                <View style={[styles.textRowItemStyle, { height: 15, borderBottomWidth: 0 }]} />
            </View>
            <TouchableOpacity onPress={() => this.onSaveHandle()} style={styles.addButtonStyle} >
                <Text style={{ color: this.state.selectedRecordType == "Income" ? custom.incomeColor : custom.expensesColor, fontSize: custom.navBarTitleFontSize, fontWeight: "bold" }}>{"Add " + this.state.selectedRecordType}</Text>
            </TouchableOpacity>
            {this.state.isShowPicker && this.renderPicker()}
            {this.state.isShowCardTypePicker && this.renderCardTypePicker()}
            <DatePickerModal ref={component => { this._datepicker = component }} onChangeDate={this.updateLatestDate} currDate={this.state.date} />
            {
                !this.state.isLoadFinish && <View style={{ position: "absolute", height: "100%", width: "100%", backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center", justifyContent: "center" }}>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                </View>
            }
        </View >
    }

    updateLatestDate = (newDate) => {
        this.setState({ date: newDate })
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

    renderPicker() {
        const onConfirm = () => {
            this.setState({ selectedCardBrand: this.state.tempSelectedCardBrand, isShowPicker: false })
        }

        return <View style={{ height: "100%", width: "100%", position: "absolute", justifyContent: "flex-end" }}>
            <TouchableWithoutFeedback onPress={() => { this.setState({ isShowPicker: false }) }}>
                <View style={{ width: "100%", height: "70%" }} />
            </TouchableWithoutFeedback>
            <View style={{ height: 44, width: "100%", backgroundColor: custom.pickerColor, flexDirection: "row" }}>
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
                style={{ backgroundColor: custom.pickerColor, height: "30%" }}
                selectedValue={this.state.tempSelectedCardBrand}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({ tempSelectedCardBrand: itemValue })}
                itemStyle={{ fontWeight: "bold", color: custom.mainFontColor }}
            >
                {this.state.cardList.map((item, i) => <Picker.Item key={i} label={item.label} value={item.value} />)}
            </Picker>
        </View >
    }

    renderCardTypePicker() {
        const onConfirm = () => {
            this.setState({ selectedCardType: this.state.tempSelectCardType, isShowCardTypePicker: false })
            this.updateCardList();
        }

        return <View style={{ height: "100%", width: "100%", position: "absolute", justifyContent: "flex-end" }}>
            <TouchableWithoutFeedback onPress={() => { this.setState({ isShowCardTypePicker: false }) }}>
                <View style={{ width: "100%", height: "70%" }} />
            </TouchableWithoutFeedback>
            <View style={{ height: 44, width: "100%", backgroundColor: custom.pickerColor, flexDirection: "row" }}>
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
                style={{ backgroundColor: custom.pickerColor, height: "30%" }}
                selectedValue={this.state.tempSelectCardType}
                onValueChange={(itemValue, itemIndex) => {
                    this.setState({ tempSelectCardType: itemValue, selectedCardBrand: "", tempSelectedCardBrand: "" })
                }}
                itemStyle={{ fontWeight: "bold", color: custom.mainFontColor }}
            >
                {this.state.cardTypeList.map((item, i) => <Picker.Item key={i} label={item.label} value={item.value} />)}
            </Picker>
        </View >
    }

    updateCardList() {
        this.setState({ isLoadFinish: false })
        let tempCard = []
        let tempCardList = []
        let pushPickerList = []
        this.state.categorizedCard.map((item) => {
            if (item.cardType == this.state.tempSelectCardType) {
                tempCard = item.availableCard;
            }
        })

        tempCard.map((item) => {
            if (!tempCardList.includes(item.cardBrand)) {
                tempCardList.push(item.cardBrand)
                pushPickerList.push({ value: item.cardBrand, label: item.cardBrand })
            }
        })


        this.setState({ cardList: pushPickerList })
        setTimeout(() => {
            this.setState({ isLoadFinish: true, tempSelectedCardBrand: pushPickerList[0]?.value })
        }, 300);

    }

    async onSaveHandle() {
        if (this.state.selectedCardType == "") {
            ShowToast.showShortCenter("Please Select Type !")
            return
        } else if (this.state.selectedCardBrand == "") {
            ShowToast.showShortCenter("Please Select Brand !")
            return
        }
        if (this.state.amount == "") {
            this.setState({ amount: 0 })
        }
        this.setState({ isLoadFinish: false })

        let data = {
            date: moment(this.state.date).format('DD MMMM YYYY'),
            cardBrand: this.state.selectedCardBrand,
            cardType: this.state.selectedCardType,
            amount: this.state.amount,
            remarks: this.state.remarks,
            recordType: this.state.selectedRecordType
        }

        dataStore.allRecord.push(data)


        FireBaseAPI.firebaseAddRecord(dataStore.allRecord, ((res2) => {
            if (res2) {
                setTimeout(() => {
                    dataStore.allCard.map(item => {
                        if (item.cardBrand == this.state.selectedCardBrand && item.cardType == this.state.selectedCardType) {
                            let itemAmount = isNaN(parseFloat(item.currentAmount)) ? 0 : parseFloat(item.currentAmount);
                            let stateAmount = parseFloat(this.state.amount)
                            if (item.cardType == "Credit Card") {
                                if (this.state.selectedRecordType == "Income") {
                                    item.currentAmount = itemAmount - stateAmount
                                } else if (this.state.selectedRecordType == "Expenses") {
                                    item.currentAmount = itemAmount + stateAmount
                                }
                            } else {
                                if (this.state.selectedRecordType == "Income") {
                                    item.currentAmount = itemAmount + stateAmount
                                } else if (this.state.selectedRecordType == "Expenses") {
                                    item.currentAmount = itemAmount - stateAmount
                                }
                            }
                        }
                    })
                    FireBaseAPI.firebaseAddCard(dataStore.allCard, ((res) => {
                        if (res) {
                            this.setState({ isLoadFinish: true })
                            this.props.props.navigation.navigate("Home")
                        } else {
                            ShowToast.showShortCenter("Add Record Failed !")
                            this.props.props.navigation.navigate("Home")
                        }

                    }))
                }, 300);
            } else {
                ShowToast.showShortCenter("Add Record Failed !")
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
    textTypeStyle: {
        fontWeight: "bold",
        fontSize: custom.titleFontSize,
        color: custom.mainFontColor,
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
    },
    tabButtonStyle: {
        width: "40%",
        height: "100%",
        borderRadius: 8,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center"
    }
})