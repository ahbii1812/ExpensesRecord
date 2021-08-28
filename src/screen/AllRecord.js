import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, SectionList } from 'react-native'
import Swipeout from 'react-native-swipeout';
import TopNavBar from '../component/topNavBar';
import custom from '../theme/customization';

function AllRecord(props) {
    
    const [listData, setListData] = useState([{ title: "123", data: [{ geng: "3121" }, { geng: "321121" }] }, { title: "555",data: [{ geng: "3121" }, { geng: "321121" }] }]);
    const [update, setUpdate] = useState(false)

    useEffect(() => {
    }),[update]

    const updateList = () => {
        setUpdate(!update)
    }

    const renderList = (props) => {
        return (
            <Swipeout
                autoClose={true}
                onClose={(secID, rowID, directione) => {

                }}
                onOpen={(secID, rowID, directione) => {

                }}
                right={[{
                    onPress: (x) => { props.section.data.splice(props.index, 1); updateList() },
                    text: 'Delete', type: 'delete'
                }]}
                rowID={props.index}
                sectionID={1} >
                <View
                    style={{
                        alignItems: "center",
                        height: 55,
                        flexDirection: "row",
                        paddingLeft: 10,
                        borderTopWidth: 0.5,
                        borderBottomWidth: 0.5
                    }}
                >
                    <View style={{ width: "70%", flexDirection: "column" }}>
                        <Text
                            style={{
                                letterSpacing: -0.3,
                                paddingLeft: 7,
                            }}
                        >
                            {"test1"}
                        </Text>
                        <Text
                            style={{
                                letterSpacing: -0.3,
                                paddingLeft: 7,
                            }}
                        >
                            {"test2"}
                        </Text>
                    </View>
                    <Text
                        style={{
                            letterSpacing: -0.3,
                            paddingRight: 7,
                            textAlign: "right",
                            width: "28%",
                        }}
                    >
                        {"RM "}
                    </Text>
                </View>
            </Swipeout >
        );
    }

    return <View style={{ height: "100%", width: "100%", backgroundColor: custom.mainBgColor }}>
        <TopNavBar title={"All Record"} backButton props={props.props.navigation}/>
        <SectionList
            sections={listData}
            keyExtractor={(item, index) => item + index}
            renderItem={item => renderList(item)}
            renderSectionHeader={({ section: { title, data } }) => (<View><Text>{title}</Text></View>)}
            stickySectionHeadersEnabled={false}
        />
    </View>

}

export default AllRecord;