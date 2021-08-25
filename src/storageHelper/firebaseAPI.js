import React, { Component } from 'react'
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'


const username = 'ahbii1'
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

    firebaseGetRealTimeData = async() => {
        const AllUsers = await firestore().collection('users');

        const observer = AllUsers.onSnapshot(docSnapshot => {
            docSnapshot.forEach(doc => {
                console.log('Firebase === Document => ',doc.id, ' => ', doc.data());
            });
        }, err => {
            console.log('Firebase === Get Real Time Data Err: ', err);
        });

    }

     async firebaseAddData(data) {
        const res = await firestore()
        .collection('users')
        .doc(username)
        .set(data)
        .then(() => console.log("Firebase === Data Added: ", data))
        .catch(err => console.log("Firebase === Data Add Error: ", err));
    }



}

const FireBaseAPI = new firebaseAPI();
export default FireBaseAPI;
