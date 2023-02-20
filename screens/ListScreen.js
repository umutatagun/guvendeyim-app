import React, {useEffect} from "react";
import {Button, ScrollView, StyleSheet, Text, View} from "react-native";
import { db, authenticate} from "../firebase";
import stylesheet from "react-native-web/src/exports/StyleSheet";

const ListScreen = () => {
    let tempList = [];

    db.ref("/status").on('value', (snapshot) => {
        snapshot.forEach(elem => {
            tempList.push(
                <View style={styles.viewStyle}>
                    <View key={Math.random()}>
                        <Text key={elem.toJSON()['nameSurname']}>{elem.toJSON()['nameSurname']}</Text>
                        <Text key={elem.toJSON()['phone']}>{elem.toJSON()['phone']}</Text>
                    </View>
                    <View key={Math.random()}>
                        <Text key={elem.toJSON()['currentStatus']}>{elem.toJSON()['currentStatus']}</Text>
                        <Text key={elem.toJSON()['date']}>{elem.toJSON()['date']}</Text>
                    </View>
                </View>
            )
        });
    })

    return(
        <ScrollView style={styles.scrollView}>
            {tempList}
        </ScrollView>
    )

}

export default ListScreen

const styles = StyleSheet.create({
    scrollView: {
        paddingLeft: 10,
        paddingTop: 10
    },

    viewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 10,
        borderWidth: 1,
        borderRadius: '10%'
    }
})