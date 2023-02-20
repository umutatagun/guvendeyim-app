import React, {useEffect, useState} from "react";
import {
    Text,
    View,
    StyleSheet
    , Dimensions
} from "react-native";
import MapView, {Callout, Marker} from "react-native-maps";
import * as Location from "expo-location";

const UserDetail = () => {

    const [pin, setPin] = useState({
        latitude: 40.9435828694083,
        longitude: 29.117661124872438
    })

    useEffect( () => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if( status !== "granted") {
                alert("Permission denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location);

            setPin({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });
        })();
    }, []);


    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={{
                latitude: 40.9435828694083,
                longitude: 29.117661124872438,
                latitudeDelta: 0.005,
                longitudeDelta: 0.0005
                }}>
             <Marker coordinate={pin} pinColor="blue">
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