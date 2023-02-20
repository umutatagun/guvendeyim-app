import React from 'react';
import {View, StyleSheet, Text, Button, TouchableOpacity} from 'react-native';
import { db, authenticate } from '../firebase';
import {useNavigation} from "@react-navigation/native";
import Moment from 'moment';
import moment from "moment";

const BorderScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.listContainer} onPress={() => {navigation.navigate("Liste")}}>
                <Text style={{textAlign: 'center', fontSize: 40, fontWeight: 'bold', color: 'lightyellow'}}>Durum Listesi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.top} onPress={onGuvendeyimButton} >
                <Text style={{textAlign: 'center', fontSize: 40, fontWeight: 'bold'}}>Güvendeyim</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottom} onPress={onGuvendeDegilimButton} >
                <Text style={{textAlign: 'center', fontSize: 40, color: '#fff', fontWeight: 'bold'}}>Güvende Değilim</Text>
            </TouchableOpacity>
        </View>
    );
};

const getData = db.ref("/user/");

function onGuvendeyimButton() {
    const splittedMail = authenticate.currentUser.email.split("@")[0];
    const setData = db.ref("/status/"+splittedMail);
    Moment.locale('tr');

    getData.orderByKey().equalTo(splittedMail).on('value', (snapshot) => {
        setData.set({
            nameSurname: snapshot.child(splittedMail).toJSON()["nameSurname"],
            phone: snapshot.child(splittedMail).toJSON()["phone"],
            currentStatus: "Guvende",
            date: Moment(moment()).format('DD-MM-YYYY:HH-mm-ss')
        })
    });
    alert("İslem Kaydedildi")
}
function onGuvendeDegilimButton() {
    const splittedMail = authenticate.currentUser.email.split("@")[0];
    const setData = db.ref("/status/"+splittedMail);
    Moment.locale('tr');

    getData.orderByKey().equalTo(splittedMail).on('value', (snapshot) => {
        setData.set({
            nameSurname: snapshot.child(splittedMail).toJSON()["nameSurname"],
            phone: snapshot.child(splittedMail).toJSON()["phone"],
            currentStatus: "Guvende Değil",
            date: Moment(moment()).format('DD-MM-YYYY:HH-mm-ss')
        })
    });

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
    },
    top: {
        flex: 0.4,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        borderWidth: 5,
        borderRadius: '50%'
    },
    title: {
        flex: 0.1,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        borderWidth: 5,
        borderRadius: '50%'
    },
    listContainer: {
        flex: 0.1,
        backgroundColor: 'orange',
        justifyContent: 'center',
        borderWidth: 5,
        borderRadius: '50%'
    },
    bottom: {
        flex: 0.4,
        justifyContent: 'center',
        backgroundColor: 'red',
        borderWidth: 5,
        borderRadius: '50%'
    },
});

export default BorderScreen;