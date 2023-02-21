import React, {useEffect, useState} from "react";
import {
    Button, Keyboard,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import { db, authenticate} from "../firebase";


const InformationScreen = ({route}) => {
    const [text, setText] = useState('');

    const sendMessageToDB = () => {
        let currentData = route.params.jsonData;
        currentData.message = text;

        const userDb = db.ref("status/"+currentData.splittedMail);
        userDb.set(currentData).then(() => alert("Mesajınız Kaydedildi"))
            .catch(error => console.log(error));

    }

    const handleKeyButton = (e) => {
        if(e.nativeEvent.key === "Enter") {
            Keyboard.dismiss();
        }
    }

    return (
        <View style={style.container}>
            <TextInput
                style={{fontSize: 22, flex: 0.7}}
                placeholder="Durumunuz hakkında ek bilgileri girin"
                onChangeText={newText => setText(newText)}
                defaultValue={text}
                multiline={true}
                onKeyPress={handleKeyButton}
            />
            <TouchableOpacity style={style.sendButton} onPress={sendMessageToDB}>
                <Text style={{fontSize: 50, fontWeight: 'bold', paddingLeft: 10}}>Gönder</Text>
             </TouchableOpacity>
        </View>
    );
}

export default InformationScreen

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    sendButton: {
        backgroundColor: 'orange',
        fontSize: 50,
        alignItems: 'center',
        flex: 0.5,
        justifyContent: 'center',
        borderWidth: 5,
        borderRadius: '50%'
    }
})