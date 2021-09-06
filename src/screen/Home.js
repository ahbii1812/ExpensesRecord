import { useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, BackHandler,Alert } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import dataStore from '../storageHelper/dataStore';
import custom from '../theme/customization';
import FlipCard from 'react-native-flip-card';
import BottomHalfModal from '../component/bottomHalfModal';

export default function Home(props) {
    const navigator = props.props.navigation
    const [data, setData] = useState([])

    useEffect(() => {
        const backAction = () => {
          Alert.alert("Alert!", "Are you sure you want quit?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
          ]);
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);

    useFocusEffect(() => {
        setData(dataStore.allCard)
    })

    const RenderCard = () => {
        return !_.isEmpty(data) ? <Carousel
            data={data}
            layout='default'
            loop={false}
            renderItem={({ item, index }) => {
                return <FlipCard
                    friction={6}
                    perspective={1000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={false}
                    clickable={true}
                    onFlipEnd={(isFlipEnd) => { }}
                >
                    {/* Face Side */}
                    <View style={styles.carouselItem}>
                        <View style={{ height: 44, width: "80%", marginLeft: 14, justifyContent: "center", marginTop: 15 }}>
                            <Text style={{ fontSize: 30, fontWeight: "bold" }}>{item.cardBrand}</Text>
                        </View>
                        <View style={{ width: "95%", marginLeft: 14, justifyContent: "center", marginTop: 10 }}>
                            <Text style={{ fontSize: custom.contentFontSize, fontWeight: "bold" }}>Card Name : {item.cardName == "" ? item.cardBrand : item.cardName}</Text>
                        </View>
                        <TouchableOpacity style={{position: "absolute", bottom: 15, right : 20}} onPress={() => { navigator.navigate("All Record", item) }}>
                            <Text style={{fontSize: custom.contentFontSize, fontWeight: "bold"}}>{"Details >>"}</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Back Side */}
                    <View style={styles.carouselItem}>
                        <View style={{ height: 44, width: "80%", marginLeft: 14, justifyContent: "center", marginTop: 15 }}>
                            <Text style={{ fontSize: 30, fontWeight: "bold" }}>{item.cardBrand}</Text>
                        </View>
                        <View style={{ width: "95%", marginLeft: 14, justifyContent: "center", marginTop: 10 }}>
                            <Text style={{ fontSize: custom.contentFontSize, fontWeight: "bold" }}>Card Type : {item.cardType}</Text>
                            <Text style={{ fontSize: custom.contentFontSize, fontWeight: "bold", marginTop: 5 }}>{item.cardType == "Credit Card" ? "Outstanding Balance : " : "Current Balance : "}RM {isNaN(parseFloat(item.currentAmount).toFixed(2)) ? "0.00" : parseFloat(item.currentAmount).toFixed(2)}</Text>
                            {item.cardType == "Credit Card" && <Text style={{ fontSize: custom.contentFontSize, fontWeight: "bold", marginTop: 5 }}>Credit Limit : RM {isNaN(parseFloat(item.creditLimit).toFixed(2))? "0.00" : parseFloat(item.creditLimit).toFixed(2)}</Text>}
                        </View>
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
        <BottomHalfModal navigator={navigator} />
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
        backgroundColor: "white",
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
