import React, {useEffect, useState} from "react";
import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { db, authenticate} from "../firebase";
import {useNavigation} from "@react-navigation/native";

const ListScreen = () => {
    const [search, setSearch] = useState('');
    const navigation = useNavigation();
    let tempList = [];

    db.ref("/status").on('value', (snapshot) => {
        snapshot.forEach(elem => {
            let item = elem.toJSON();
            tempList.push(
                <TouchableOpacity
                    style={styles.viewStyle}
                    key={Math.random()}
                    activeOpacity={0.6}
                    onPress={() => {navigation.navigate("Detay",{user: item['email']})}}>
                    <View key={Math.random()}>
                        <Text key={item['nameSurname']}>{item['nameSurname']}</Text>
                        <Text key={item['phone']}>{item['phone']}</Text>
                    </View>
                    <View key={Math.random()}>
                        <Text key={item['currentStatus']}>{item['currentStatus']}</Text>
                        <Text key={item['date']}>{item['date']}</Text>
                    </View>
                </TouchableOpacity>
            )
        });
    })

    return(
        <ScrollView style={styles.scrollView} key={2}>
            <TextInput
                style={styles.textInput}
                placeholder="İsim Giriniz"
                value={search}
                onChangeText={(text) => {searchFilter(text)}}
            >

            </TextInput>
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
    textInput: {
        height: 40,
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 10,
        marginBottom: 10,
        borderWidth: 1
    },
    viewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 10,
        borderWidth: 1,
        borderRadius: 10
    }
})
