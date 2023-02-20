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
    let longitude, latitude;

    getData.on('value', (snapshot) => {
        latitude = snapshot.toJSON()['latitude'];
        longitude = snapshot.toJSON()['longitude'];
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
        </View>
    )
}

export default UserDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
})