import React from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native'
import custom from '../theme/customization';

export default function TopNavBar(props) {
    const navigator = props.props;
    return <View style={{ height: 44, width: "100%", justifyContent: "center", flexDirection: "row" }}>
        <View style={{ height: "100%", width: "15%", justifyContent: "flex-end", alignItems: "center" }}>
            {props.backButton && <TouchableOpacity onPress={() => navigator.goBack()}>
                <Image source={require('../icon/back_icon_white.png')} resizeMode={"stretch"} style={{ width: 35, height: 30, tintColor: custom.imageTintColor }} />
            </TouchableOpacity>}
        </View>
        <View style={{ height: "100%", width: "70%", justifyContent: "flex-end", alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: custom.navBarTitleFontSize, color: custom.imageTintColor }}>{props.title}</Text>
        </View>
        <View style={{ width: "15%", justifyContent: "flex-end", alignItems: "center" }}>
            {props.rightButton && <TouchableOpacity onPress={() => props.onRightPress()}>
                <Image source={require('../icon/delete_icon.png')} resizeMode={"stretch"} style={{ width: 35, height: 30, tintColor: custom.imageTintColor }} />
            </TouchableOpacity>}
        </View>
    </View>
}