import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import { db, authenticate } from '../firebase';

const BorderScreen = () => {

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={{textAlign: 'center', fontSize: 40, fontWeight: 'bold'}}>Güvendeyim</Text>
                <Button onPress={onGuvendeyimButton} title={'Güvendeyim'}></Button>
            </View>
            <View style={styles.bottom}>
                <Text style={{textAlign: 'center', fontSize: 40, color: '#fff', fontWeight: 'bold'}}>Güvende Değilim</Text>
                <Button onPress={onGuvendeDegilimButton} title={'Güvende Değilim'}></Button>
            </View>
        </View>
    );
};

const getData = db.ref("/user/");

function onGuvendeyimButton() {
    const splittedMail = authenticate.currentUser.email.split("@")[0];
    const setData = db.ref("/status/"+splittedMail);
    console.log(splittedMail);
    getData.orderByKey().equalTo(splittedMail).on('value', (snapshot) => {
        setData.set({
            nameSurname: snapshot.child(splittedMail).toJSON()["nameSurname"],
            phone: snapshot.child(splittedMail).toJSON()["phone"],
            currentStatus: "Guvende"
        })
        console.log(snapshot.toJSON());
    })
}
function onGuvendeDegilimButton() {
    const splittedMail = authenticate.currentUser.email.split("@")[0];
    const setData = db.ref("/status/"+splittedMail);
    console.log(splittedMail);
    getData.orderByKey().equalTo(splittedMail).on('value', (snapshot) => {
        setData.set({
            nameSurname: snapshot.child(splittedMail).toJSON()["nameSurname"],
            phone: snapshot.child(splittedMail).toJSON()["phone"],
            currentStatus: "Guvende Değil"
        })
        console.log(snapshot.toJSON());
    })
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
    bottom: {
        flex: 0.4,
        justifyContent: 'center',
        backgroundColor: 'red',
        borderWidth: 5,
        borderRadius: '50%'
    },
});

export default BorderScreen;