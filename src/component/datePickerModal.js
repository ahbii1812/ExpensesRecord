import React, { Component } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import DatePicker from 'react-native-date-picker';
import custom from "../theme/customization";

class DatePickerModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            isVisible: false,
        }
    }

    componentDidMount() {
    }

    render() {
        return <Modal visible={this.state.isVisible} animationType={"slide"} style={{ flex: 1 }} transparent={true}>
            <TouchableWithoutFeedback onPress={() => { this.cancelPicker() }} >
                <View style={{ width: "100%", height: "70%" }} />
            </TouchableWithoutFeedback>
            <View style={{ height: 44, flexDirection: "row", backgroundColor: custom.pickerColor, width: SCREEN_W, bottom: 50 }}>
                <TouchableOpacity style={styles.titleContainerStyle} onPress={() => { this.cancelPicker() }} >
                    <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={true} style={[styles.titleContainerStyle, { width: "50%" }]}>
                    <Text style={styles.textStyle}>Choose Date</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.titleContainerStyle}>
                    <Text style={styles.textStyle} onPress={() => { this.setCurrDate(this.state.date) }}>Confirm</Text>
                </TouchableOpacity>
            </View>
            <DatePicker
                style={{ backgroundColor: custom.pickerColor, width: SCREEN_W, height: SCREEN_H * 0.3, bottom: 50 }}
                textColor={custom.mainFontColor}
                mode="date"
                format="DD-MM-YYYY"
                date={this.state.date}
                onDateChange={item => { this.setState({ date: item }) }}
                maximumDate={new Date()}
                themeVariant="dark"
                fadeToColor="none"
            />
        </Modal>
    }

    cancelPicker = () => {
        this.setModalVisible(false);
        this.setState({ date: this.props.CurrDate });
    }

    setModalVisible = (visible) => {
        this.setState({ isVisible: visible });
    }

    setCurrDate = date => {
        this.setModalVisible(false);
        this.props.onChangeDate(date);
    }
}

const styles = StyleSheet.create({
    textStyle: {
        color: custom.mainFontColor,
        fontSize: custom.titleFontSize,
        fontWeight: "bold"
    },
    titleContainerStyle: {
        width: "25%",
        justifyContent: "center",
        alignItems: "center"
    }
});


export default DatePickerModal