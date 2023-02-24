import React, {useEffect, useState} from "react";
import {
    Text,
    View,
    StyleSheet
    , Dimensions, TouchableOpacity
} from "react-native";
import MapView, {Callout, Marker} from "react-native-maps";
import { db, authenticate} from "../firebase";

const UserDetail = ({route}) => {
    const splittedMail = route.params.user.split("@")[0];
    const getData = db.ref("/status/"+splittedMail);
    let longitude, latitude, text;

    getData.on('value', (snapshot) => {
        latitude = snapshot.toJSON()['latitude'];
        longitude = snapshot.toJSON()['longitude'];
        text = snapshot.toJSON()['message'];
    })


    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.0005
                }}>
             <Marker coordinate={{latitude: latitude, longitude: longitude}} pinColor="blue">
                 <Callout>
                     <Text>Guncel Konum</Text>
                 </Callout>
              </Marker>
            </MapView>
            <View style={styles.textArea} >
                <Text style={{fontWeight: '700', fontSize: 24, color: 'black', textAlign: 'center'}}>İlgili Kişi Mesajı</Text>
                <Text style={{fontWeight: '500', fontSize: 16, paddingLeft: 10, paddingRight: 10}}>{text}</Text>
            </View>
        </View>
    )
}

export default UserDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    map: {
        flex: 0.65,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    textArea: {
        margin: 5,
        width: '100%',
        flex: 0.35,
        backgroundColor: '#ddd'
    },
})