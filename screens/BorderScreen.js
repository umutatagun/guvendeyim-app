import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { db, authenticate } from '../firebase';
import {useNavigation} from "@react-navigation/native";
import Moment from 'moment';
import moment from "moment";
import * as Location from "expo-location";

const BorderScreen = () => {
    const navigation = useNavigation();

    const splittedMail = authenticate.currentUser.email.split("@")[0];
    const getData = db.ref("/user/");
    const setData = db.ref("/status/"+splittedMail);
    Moment.locale('tr');
    let location;

    useEffect( () => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if( status !== "granted") {
                alert("Permission denied");
                return;
            }

            location = await Location.getCurrentPositionAsync({});
        })();
    }, []);

    function onGuvendeyimButton() {
        getData.orderByKey().equalTo(splittedMail).on('value', (snapshot) => {
            setData.set({
                nameSurname: snapshot.child(splittedMail).toJSON()["nameSurname"],
                phone: snapshot.child(splittedMail).toJSON()["phone"],
                email: snapshot.child(splittedMail).toJSON()["email"],
                currentStatus: "Guvende",
                date: Moment(moment()).format('DD-MM-YYYY:HH-mm-ss'),
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
        });
        alert("İslem Kaydedildi")
    }
    function onGuvendeDegilimButton() {

        getData.orderByKey().equalTo(splittedMail).on('value', (snapshot) => {

            let propData = {
                nameSurname: snapshot.child(splittedMail).toJSON()["nameSurname"],
                phone: snapshot.child(splittedMail).toJSON()["phone"],
                email: snapshot.child(splittedMail).toJSON()["email"],
                currentStatus: "Guvende Değil",
                date: Moment(moment()).format('DD-MM-YYYY:HH-mm-ss'),
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }
            setData.set(propData)

            propData.splittedMail = splittedMail;
            navigation.navigate("Additional-Information", {jsonData: propData});
        });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.listContainer} onPress={() => {navigation.navigate("Liste")}}>
                <Text style={{textAlign: 'center', fontSize: 40, fontWeight: '700', color: 'lightyellow'}}>Durum Listesi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.top} onPress={onGuvendeyimButton} >
                <Text style={{textAlign: 'center', fontSize: 40, fontWeight: '700'}}>Güvendeyim</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottom} onPress={onGuvendeDegilimButton} >
                <Text style={{textAlign: 'center', fontSize: 40, color: 'white', fontWeight: '700'}}>Güvende Değilim</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
    },
    top: {
        flex: 0.4,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        borderWidth: 5,
        borderRadius: 50
    },
    title: {
        flex: 0.1,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        borderWidth: 5,
        borderRadius: 50
    },
    listContainer: {
        flex: 0.1,
        backgroundColor: 'orange',
        justifyContent: 'center',
        borderWidth: 5,
        borderRadius: 50
    },
    bottom: {
        flex: 0.4,
        justifyContent: 'center',
        backgroundColor: 'red',
        borderWidth: 5,
        borderRadius: 50
    },
});

export default BorderScreen;