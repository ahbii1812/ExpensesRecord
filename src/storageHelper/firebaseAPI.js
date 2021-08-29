import React, { Component, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
import dataStore from './dataStore';


class firebaseAPI extends Component {

    firebaseGetAllData = async () => {
        const AllUsers = firestore().collection('users');
        const doc = await AllUsers.get();
        if (!doc) {
            console.log('No such document!');
        } else {
            console.log('Document data:', doc);
            doc.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
            });
        }
    }

    firebaseGetRealTimeData = async () => {
        const AllUsers = await firestore().collection('users');

        const observer = AllUsers.onSnapshot(docSnapshot => {
            docSnapshot.forEach(doc => {
                console.log('Firebase === Document => ', doc.id, ' => ', doc.data());
            });
        }, err => {
            console.log('Firebase === Get Real Time Data Err: ', err);
        });

    }

    firebaseGetRealTimeOwnData = async () => {
        const AllUsers = await firestore().collection('users').doc(dataStore.deviceID);
        const observer = AllUsers.onSnapshot(docSnapshot => {
            dataStore.allCard = docSnapshot.data()?.data ? docSnapshot.data().data : [];
            dataStore.allRecord = docSnapshot.data()?.record ? docSnapshot.data().record : [];
            console.log('Firebase === Own Real Time Data => ', docSnapshot.data());
        }, err => {
            console.log('Firebase === Get Own Real Time Data Err: ', err);
        });

    }

    firebaseGetOwnData = async () => {
        const OwnData = await firestore().collection('users').doc(dataStore.deviceID).get();
        console.log('Firebase === OwnData.data => ', OwnData.data());
    }

    async firebaseAddCard(data, callback) {
        const res = await firestore()
            .doc('users/' + dataStore.deviceID)
            .update({ data: data })
            .then(() => { console.log("Firebase === Data Added: ", data); callback && callback(true) })
            .catch(err => console.log("Firebase === Data Add Error: ", err));
    }

    async firebaseAddRecord(data, callback) {
        const res = await firestore()
            .doc('users/' + dataStore.deviceID)
            .update({ record: data })
            .then(() => { console.log("Firebase === Data Added: ", data); callback && callback(true) })
            .catch(err => console.log("Firebase === Data Add Error: ", err));
    }

    updateRecord(data, callback) {
        firebase.firestore()
            .collection('users')
            .doc(dataStore.deviceID)
            .set(
                { record: data },
                { merge: true }
            ).then(() => { console.log("Firebase === Data updated: ", data); callback && callback(true) })
            .catch(err => console.log("Firebase === Data update Error: ", err));
    }



}

const FireBaseAPI = new firebaseAPI();
export default FireBaseAPI;
