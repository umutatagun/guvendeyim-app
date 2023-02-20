import React, { useState } from "react";
import {Text, View, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity} from "react-native";
import { authenticate } from '../firebase';
import { db } from '../firebase';
import {useNavigation} from "@react-navigation/native";


const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [nameSurname, setNameSurname] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const navigation = useNavigation();

        const handleSignUp = () => {
            let split = email.split("@")[0];

            const userDb = db.ref("user/"+ split);
            authenticate
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    userDb.set({
                        email: email,
                        phone: phone,
                        nameSurname: nameSurname
                    }).then(() => {
                        alert("Kayit basarili");
                        navigation.navigate("Login")
                    })
                })
                .catch(error => alert(error.message));
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="İsim-Soyisim"
                    value={ nameSurname }
                    onChangeText={ text => setNameSurname(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    value={ email }
                    onChangeText={ text => setEmail(text)}
                    autoCapitalize='none'
                    style={styles.input}
                />
                <TextInput
                    placeholder="Phone"
                    value={ phone }
                    onChangeText={ text => setPhone(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={ text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonOutline: {
        backgroundColor: '#fff',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16
    }

})