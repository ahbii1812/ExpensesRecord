import { useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import dataStore from '../storageHelper/dataStore';
import custom from '../theme/customization';
import FlipCard from 'react-native-flip-card';
import BottomHalfModal from '../component/bottomHalfModal';

export default function Home(props) {
    const navigator = props.props.navigation
    const [data, setData] = useState([])

    useFocusEffect(() => {
        setData(dataStore.allCard)
    })

    const RenderCard = () => {
        return !_.isEmpty(data) ? <Carousel
            data={data}
            layout='stack'
            loop={true}
            renderItem={({ item, index }) => {
                return <FlipCard
                    friction={6}
                    perspective={1000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={false}
                    clickable={true}
                    onFlipEnd={(isFlipEnd) => {}}
                >
                    {/* Face Side */}
                    <View style={styles.carouselItem}>
                        <Text>{item.bank}</Text>
                    </View>
                    {/* Back Side */}
                    <View style={styles.carouselItem}>
                        <Text>"Back"</Text>
                    </View>
                </FlipCard>
            }}
            sliderWidth={SCREEN_W}
            itemWidth={350} /> :
            <TouchableOpacity style={styles.emptyCarouselItem} onPress={() => navigator.navigate("Add Card")}>
                <Image source={require('../icon/square_add_icon.png')} resizeMode={"stretch"} style={styles.icon1Style}></Image>
            </TouchableOpacity>

    }

    return <View style={{ height: "100%", width: "100%", backgroundColor: custom.mainBgColor }}>
        <View style={{ height: "10%", width: "100%", justifyContent: "center", alignItems: "flex-end" }}>
            <TouchableOpacity onPress={() => navigator.navigate("Add Card")} style={styles.iconStyle}>
                <Image source={require('../icon/add_card_icon_white.png')} resizeMode={"stretch"} style={styles.iconStyle}></Image>
            </TouchableOpacity>
        </View>
        <View style={{ height: "50%", width: "100%", alignItems: "center", marginTop: 100 }}>
            <RenderCard />
        </View>
        <BottomHalfModal navigator={navigator}/>
    </View>

}



const styles = StyleSheet.create({
    iconStyle: {
        width: 65,
        height: 70,
        marginRight: 15,
        tintColor: custom.imageTintColor
    },
    icon1Style: {
        width: 100,
        height: 100,
        marginRight: 15,
        tintColor: custom.imageTintColor
    },
    carouselItem: {
        marginTop: 20,
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
    },
    emptyCarouselItem: {
        alignItems: "center",
        justifyContent: "center",
        borderColor: "white",
        borderStyle: "dashed",
        borderWidth: 3,
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
