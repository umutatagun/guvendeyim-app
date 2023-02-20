import React, {useEffect} from "react";
import {Button, ScrollView, Text, View} from "react-native";
import { db, authenticate} from "../firebase";

const ListScreen = () => {
    let tempList = [];

    db.ref("/status").on('value', (snapshot) => {
        snapshot.forEach(elem => {
            tempList.push(
                <Text key={elem}>{elem.toJSON()['nameSurname']}</Text>
            )
        });
    })

    return(
        <View style={{backgroundColor: 'lightblue', padding: 20, margin: 20, flex: 1}}>
            {tempList}
        </View>
    )

}

export default ListScreen