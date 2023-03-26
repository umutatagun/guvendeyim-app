import React, { useState} from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { authenticate} from "../firebase";
import {useNavigation} from "@react-navigation/native";
import firebase from "firebase";

const ProfileScreen = () => {
    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');

    const navigation = useNavigation();

    const logout = () => {
        authenticate.signOut().then(() => {
            alert("Çıkış Yaptınız");
            navigation.navigate("Login")
        })
            .catch(error => console.log(error));
    }

    const reAuthenticate = (currentPassword ) => {
        let user = authenticate.currentUser;
        let cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword );
        return user.reauthenticateWithCredential(cred);
    }

    const changePassword = () => {
        reAuthenticate(currentPassword).then(() => {
            let user = authenticate.currentUser;
            user.updatePassword(newPassword).then(() => {
                console.log("Şifreniz Güncellendi");
                setNewPassword('');
                setCurrentPassword('')
            }).catch(error => console.log(error))
        }).catch(error => alert("Güncel şifreniz yanlış veya yeni şifreniz 6 karakterden daha az"));
    }

    return(
        <View style={styles.container}>
            <View style={[styles.inputContainer]}>
                <View style={{paddingBottom: 10}}>
                    <TextInput
                        placeholder="Eski Şifre"
                        autoCapitalize='none'
                        value={currentPassword}
                        onChangeText={ password => setCurrentPassword(password)}
                        style={styles.input}
                        secureTextEntry
                    />
                    <TextInput
                        placeholder="Yeni Şifre"
                        style={styles.input}
                        autoCapitalize='none'
                        value={newPassword}
                        onChangeText={password => setNewPassword(password)}
                        secureTextEntry
                    />
                </View>
                <View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.button}
                        onPress={changePassword}
                    >
                        <Text style={styles.buttonText}>Şifreyi Değiştir</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={logout}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Çıkış</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16
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
})
