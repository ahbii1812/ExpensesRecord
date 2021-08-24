import AsyncStorage from '@react-native-async-storage/async-storage';
import { Component } from 'react';


class storageUtils extends Component {

    storeString = async (value) => {
        try {
            await AsyncStorage.setItem('@storage_Key', value)
        } catch (e) {
            // saving error
        }
    }

    async storeObject(key, value) {
        try {
            const jsonValue = JSON.stringify(value)
            console.log("AsyncStorage Store key" + key + "--- Value ::" + jsonValue)
            await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            // saving error
        }
    }

    getString = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            if (value !== null) {
                // value previously stored
            }
        } catch (e) {
            // error reading value
        }
    }

    async getObject(key) {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            console.log("Asyncstorage getObject ::", jsonValue)
            return jsonValue;
        } catch (e) {
            // error reading value
        }
    }

    async getAllKeys() {
        let keys = []
        try {
            keys = await AsyncStorage.getAllKeys()
        } catch (e) {
            // read key error
        }

        console.log("Asyncstorage All Storage Key::", keys)
    }

    async clearAll() {
        try {
            await AsyncStorage.clear()
        } catch (e) {
            // clear error
        }

        console.log('Asyncstorage Key Clear Done')
    }

}

const StorageUtils = new storageUtils();
export default StorageUtils;