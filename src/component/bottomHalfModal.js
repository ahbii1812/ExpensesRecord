import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomDrawer from 'react-native-bottom-drawer-view';
import custom from '../theme/customization';

const TAB_BAR_HEIGHT = 30;

export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = { isExpand: false }
    }
    renderContent = () => {
        return (
            <View style={styles.containerStyle}>
                <View style={{ height: 52, justifyContent: "center", alignItems: "center" }}>
                    {!this.state.isExpand && <Text style={styles.textStyle}>Swipe Up</Text>}
                </View>

                <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-evenly", height: 200, marginTop: 15 }}>
                    <TouchableOpacity onPress={()=> this.props.navigator.navigate("Add Record")} style={styles.buttonContainerStyle}>
                        <Image source={require('../icon/details_icon.png')} resizeMode={"stretch"} style={styles.iconStyle}></Image>
                        <View style={styles.textContainer}>
                            <Text style={styles.buttonTextStyle}>All Record</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.props.navigator.navigate("Add Record")} style={styles.buttonContainerStyle}>
                        <Image source={require('../icon/add_icon.png')} resizeMode={"stretch"} style={styles.iconStyle}></Image>
                        <View style={styles.textContainer}>
                            <Text style={styles.buttonTextStyle}>Add Record</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainerStyle}>
                        <Image source={require('../icon/setting_icon.png')} resizeMode={"stretch"} style={styles.iconStyle}></Image>
                        <View style={styles.textContainer}>
                            <Text style={styles.buttonTextStyle}>Setting</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        return (
            <BottomDrawer
                startUp={false}
                containerHeight={250}
                offset={TAB_BAR_HEIGHT}
                backgroundColor={"rgba(0,0,0,0.0)"}
                shadow={false}
                onExpanded={() => this.setState({ isExpand: true })}
                onCollapsed={() => this.setState({ isExpand: false })}
            >
                {this.renderContent()}
            </BottomDrawer>
        )
    }
}

const styles = StyleSheet.create({
    iconStyle: {
        width: 50,
        height: 50,
        tintColor: custom.imageTintColor
    },
    textStyle: {
        color: custom.mainFontColor,
        fontSize: custom.titleFontSize,
        fontWeight: 'bold',
        letterSpacing: 3
    },
    containerStyle: {
        backgroundColor: 'rgba(45,45,45,0.5)',
        height: 250,
        width: "100%",
        alignItems: "center",
        borderRadius: 40
    },
    buttonContainerStyle: {
        width: "25%",
        height: 95,
        alignItems: "center"
    },
    buttonTextStyle: {
        fontSize: custom.titleFontSize,
        color: custom.mainFontColor,
        fontWeight: "bold"
    },
    textContainer: {
        height: 45,
        justifyContent: "center",
        alignItems: "center"
    }
})