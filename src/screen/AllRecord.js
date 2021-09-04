import React, { useState, useEffect, Component } from 'react'
import { View, TouchableOpacity, Text, SectionList, ActivityIndicator, Image } from 'react-native'
import Swipeout from 'react-native-swipeout';
import ShowToast from '../component/toast';
import TopNavBar from '../component/topNavBar';
import dataStore from '../storageHelper/dataStore';
import FireBaseAPI from '../storageHelper/firebaseAPI';
import custom from '../theme/customization';
import _ from 'lodash'

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

    updateList(callback) {

        this.setState({ isLoadFinish: false })
        this.setState({ update: !this.state.update })

        let tempArr = []
        this.state.unUsedList.length > 0 && this.state.unUsedList.map((item) => {
            tempArr.push(item)
        })
        this.state.listData.map((item) => {
            item.data.map((o, i) => {
                tempArr.push(item.data[i])
            })
        })
        FireBaseAPI.updateRecord(tempArr, res => {
            if (res) {
                callback && callback(true)
                setTimeout(() => {
                    this.setState({ isLoadFinish: true })
                }, 150);

            } else {
                ShowToast.showShortCenter("Update Failed ! Please try again ...")
                callback && callback(false)
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
                    onPress: (x) => {
                        //Reverd Card current Amount
                        let tempData = props.section.data[props.index]
                        dataStore.allCard.map((item) => {
                            if (item.cardBrand == tempData.cardBrand && item.cardType == tempData.cardType) {
                                let tempCurrAmt = parseFloat(item.currentAmount)
                                let newAmt = parseFloat(tempData.amount)
                                if (item.cardType == "Credit Card") {
                                    if (tempData.recordType == "Income") {
                                        item.currentAmount = tempCurrAmt + newAmt
                                    } else {
                                        item.currentAmount = tempCurrAmt - newAmt
                                    }
                                } else {
                                    if (tempData.recordType == "Income") {
                                        item.currentAmount = tempCurrAmt - newAmt
                                    } else {
                                        item.currentAmount = tempCurrAmt + newAmt
                                    }
                                }
                            }
                        });
                        FireBaseAPI.firebaseAddCard(dataStore.allCard, ((res) => {
                            if (res) {
                                setTimeout(() => {
                                    props.section.data.splice(props.index, 1);
                                    this.updateList(res => {
                                        if (res) {

                                        } else {
                                            ShowToast.showShortCenter("Update Failed ! Please try again ...")
                                        }
                                    });
                                }, 150);
                            } else {
                                ShowToast.showShortCenter("Update Failed ! Please try again ...")
                            }
                        }))

                    },
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
            </View> : (_.isEmpty(this.state.listData) ?
                <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center"}}>
                    <Image source={require('../icon/no_data_icon.png')} resizeMode={"stretch"} 
                    style={{width: 350, height: 300, tintColor : "rgba(255,255,255,0.5)", marginTop: -350, marginLeft: -25}}></Image>
                    <Text style={{marginTop: -30, fontSize: custom.navBarTitleFontSize, color: "rgba(255,255,255,0.5)", fontWeight: "bold"}}>No Record Found</Text>
                </View> :
                <SectionList
                    style={{ marginTop: 30 }}
                    sections={this.state.listData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={item => this.renderList(item)}
                    renderSectionHeader={({ section: { title, data } }) => (data.length <= 0 ? null : this.renderTitle(title))}
                    stickySectionHeadersEnabled={false}
                />)

            }
        </View>
    }

}
