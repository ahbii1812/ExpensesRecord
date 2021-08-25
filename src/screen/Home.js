import React, { useEffect, useState, Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import FireBaseAPI from '../storageHelper/firebaseAPI';
import custom from '../theme/customization';
import Carousel from 'react-native-snap-carousel'
import _ from 'lodash'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.navigator = props.props.navigation;
    }

    componentDidMount() {
        FireBaseAPI.firebaseGetRealTimeData();
    }
    
    onPressHandle() {
        FireBaseAPI.firebaseAddData({ name: "ahbii1", age: "24" })
    }

    renderCard() {
        const data = [{ name: '123123' }]

        return !_.isEmpty(data) ? <Carousel
            data={data}
            layout='stack'
            loop={true}
            renderItem={({ item, index }) => {
                return <View style={styles.carouselItem}>
                    <Text>{item.name}</Text>
                </View>
            }}
            sliderWidth={SCREEN_W}
            itemWidth={350} /> :
            <View style={styles.carouselItem}>
            </View>

    }

    render() {
        return <View style={{ height: "100%", width: "100%", backgroundColor: custom.mainBgColor }}>
            <View style={{ height: "10%", width: "100%", justifyContent: "center", alignItems: "flex-end" }}>
                <TouchableOpacity onPress={() => this.navigator.navigate("Add Card")} style={styles.iconStyle}>
                    <Image source={require('../icon/add_card_icon_white.png')} resizeMode={"stretch"} style={styles.iconStyle}></Image>
                </TouchableOpacity>
            </View>
            <View style={{ height: "50%", width: "100%", alignItems: "center", marginTop: 100 }}>
                {this.renderCard()}
            </View>

        </View>
    }

}



const styles = StyleSheet.create({
    iconStyle: {
        width: 65,
        height: 70,
        marginRight: 15,
        tintColor: custom.imageTintColor
    },
    carouselItem: {
        backgroundColor: "red",
        width: 350,
        height: 200,
        borderRadius: 10,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 6,
            height: 6
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5
    }
})
