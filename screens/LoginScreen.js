import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    AsyncStorage, Image, Dimensions
} from "react-native";
import { authenticate } from '../firebase';
import {useNavigation} from "@react-navigation/native";
import * as Location from "expo-location";

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16); //calculate with aspect ratio


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const handleLogin = () => {
        authenticate
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("Logged in with: ", user.email);
                AsyncStorage.setItem("keepLoggedIn", JSON.stringify(true));
                navigation.navigate("Ana Menu")
            })
            .catch(error => {
                alert(error.message);
            });
    }

    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        >
        <View  style={styles.logoContainer}>
        <Image style={{width: '100%', height: '100%', position: 'relative', right: 50}}
            source={require('../assets/LOGO.png')}
        />
        </View>
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Email"
                value={ email}
                onChangeText={ text => setEmail(text)}
                autoCapitalize='none'
                style={styles.input}
            />
            <TextInput
                placeholder="Şifre"
                value={password}
                onChangeText={ text => setPassword(text)}
                style={styles.input}
                secureTextEntry
            />
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleLogin}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Giriş</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {navigation.navigate("Kaydol")}}
                style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}>Kaydol</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

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
        backgroundColor: 'white',
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
    },
    logoContainer: {
        width: Dimensions.get('window').width,
        height: imageHeight
    }

})