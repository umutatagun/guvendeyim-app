import React from "react";
import {Button, ScrollView, Text, View} from "react-native";
import { db, authenticate} from "../firebase";

const ListScreen = () => {
    let tempList = [];
    let buttonList = [];
    
    db.ref("/status").once('value', (snapshot) => {
        snapshot.forEach(elem => {
            tempList.push(
               <Text>{elem.toJSON()['nameSurname']}</Text>
            )
        });
    })


    return(
        <View>
            {tempList}
        </View>
    )

}

export default ListScreen