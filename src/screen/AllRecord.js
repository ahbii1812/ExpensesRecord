import React, { useState, useEffect, Component } from 'react'
import { View, TouchableOpacity, Text, SectionList, ActivityIndicator } from 'react-native'
import Swipeout from 'react-native-swipeout';
import ShowToast from '../component/toast';
import TopNavBar from '../component/topNavBar';
import dataStore from '../storageHelper/dataStore';
import FireBaseAPI from '../storageHelper/firebaseAPI';
import custom from '../theme/customization';

export default class AllRecord extends Component {

    constructor(props) {
        super(props)
        this.state = {
            update: false,
            listData: [{ title: "", data: [] }],
            isLoadFinish: false,
            unUsedList: []
        }
    }

    componentDidMount() {
        let tempDataList = []
        let tempUnUsedList = []
        if (this.props.props.route.params) {
            let tempCardBrand = this.props.props.route.params.cardBrand
            let tempCardType = this.props.props.route.params.cardType
            dataStore.allRecord.length > 0 && dataStore.allRecord.map((item) => {
                if (item.cardType == tempCardType && item.cardBrand == tempCardBrand) {
                    tempDataList.push(item)
                } else {
                    tempUnUsedList.push(item)
                }
            })
            dataStore.getDateSortedRecord(tempDataList, (res) => {
                this.setState({ listData: res })
                this.setState({ unUsedList: tempUnUsedList })
                this.setState({ isLoadFinish: true })
            })
        } else {
            dataStore.getDateSortedRecord(dataStore.allRecord, (res) => {
                this.setState({ listData: res })
                this.setState({ isLoadFinish: true })
            })
        }

    }

    updateList() {
        this.setState({ isLoadFinish: false })
        let tempArr = []
        this.setState({ update: !this.state.update })

        this.state.unUsedList.length > 0 && this.state.unUsedList.map((item) => {
            tempArr.push(item)
        })
        this.state.listData.map((item) => {
            item.data.map((o, i) => {
                tempArr.push(item.data[i])
            })
        })
        FireBaseAPI.updateRecord(tempArr, res => {
            setTimeout(() => {
                this.setState({ isLoadFinish: true })
            }, 150);

            if (!res) {
                ShowToast.showShortCenter("Update Failed ! Please try again ...")
            }
        })

    }

    renderList(props) {
        let item = props.item
        let isLast = props.index + 1 == props.section.data.length ? true : false
        return (
            <Swipeout
                style={{ backgroundColor: custom.minorBgColor }}
                autoClose={true}
                onClose={(secID, rowID, directione) => {

                }}
                onOpen={(secID, rowID, directione) => {

                }}
                right={[{
                    onPress: (x) => { props.section.data.splice(props.index, 1); this.updateList(); },
                    text: 'Delete', type: 'delete'
                }]}
                rowID={props.index}
                sectionID={1} >
                <View
                    style={{
                        alignItems: "center",
                        height: 55,
                        backgroundColor: custom.minorBgColor,
                        flexDirection: "row",
                        paddingLeft: 10,
                        borderTopWidth: 0.5,
                        borderBottomWidth: isLast ? 0.5 : 0,
                        borderColor: custom.borderColor
                    }}
                >
                    <View style={{ width: "70%", flexDirection: "column" }}>
                        <Text
                            style={{
                                letterSpacing: -0.3,
                                paddingLeft: 7,
                                color: custom.mainFontColor,
                                fontSize: custom.contentFontSize
                            }}
                        >
                            {item.cardBrand + " (" + item.cardType + ")"}
                        </Text>
                        <Text
                            style={{
                                letterSpacing: -0.3,
                                paddingLeft: 7,
                                color: custom.mainFontColor,
                                fontSize: custom.contentFontSize
                            }}
                        >
                            {"Remarks : " + item.remarks}
                        </Text>
                    </View>
                    <Text
                        style={{
                            letterSpacing: -0.3,
                            paddingRight: 7,
                            textAlign: "right",
                            width: "28%",
                            color: custom.mainFontColor,
                            fontSize: custom.titleFontSize
                        }}
                    >
                        {"RM " + parseFloat(item.amount).toFixed(2)}
                    </Text>
                </View>
            </Swipeout >
        );
    }

    renderTitle(title) {
        return (
            <View style={{ height: 44, width: "100%", justifyContent: "center" }}>
                <Text style={{ marginLeft: 14, fontSize: custom.titleFontSize, color: custom.mainFontColor }}>{title}</Text>
            </View>
        )
    }

    render() {
        return <View style={{ height: "100%", width: "100%", backgroundColor: custom.mainBgColor }}>
            <TopNavBar title={"All Record"} backButton props={this.props.props.navigation} />
            {!this.state.isLoadFinish ? <View style={{ position: "absolute", height: "100%", width: "100%", backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size="large" color="#FFFFFF" />
            </View> :
                <SectionList
                    style={{ marginTop: 30 }}
                    sections={this.state.listData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={item => this.renderList(item)}
                    renderSectionHeader={({ section: { title, data } }) => (data.length <= 0 ? null : this.renderTitle(title))}
                    stickySectionHeadersEnabled={false}
                />}
        </View>
    }

}
