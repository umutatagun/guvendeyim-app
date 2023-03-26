import React, {useEffect, useState} from "react";
import {
    Button,
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View, VirtualizedList
} from "react-native";
import { db, authenticate} from "../firebase";
import {useNavigation} from "@react-navigation/native";

const ListScreen = () => {
    const [search, setSearch] = useState('');
    const [masterData, setMasterData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        let temp = [];
        db.ref("/status").on('value', (snapshot) => {
            snapshot.forEach((item) => {
                temp.push(item.toJSON());
            });
        });
        setMasterData(temp);
        setFilteredData(temp);
    }, []);
    const listItem = (item) => {
        return (
            <TouchableOpacity
                style={styles.viewStyle}
                onPress={() => {navigation.navigate("Detay",{user: item['email']})}}>
                <View>
                    <Text>{item.nameSurname}</Text>
                    <Text>{item.phone}</Text>
                </View>
                <View>
                    <Text>{item.currentStatus}</Text>
                    <Text>{item.date}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {

            // Inserted text is not blank
            // Filter the masterDataSource and update FilteredDataSource
            const newData = masterData.filter(function (item) {
                const name = item.nameSurname.split(' ')[0];
                // Applying filter for the inserted text in search bar
                const itemData = name
                    ? name.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredData(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredData(masterData);
            setSearch(text);
        }
    };

    return(
        <ScrollView style={styles.scrollView} key={2}>
            <TextInput
                style={styles.textInput}
                placeholder="İsim Giriniz"
                value={search}
                onChangeText={(text) => {searchFilterFunction(text)}}
            />
            <FlatList
                data={filteredData}
                renderItem={({item}) => listItem(item)}
            />
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
