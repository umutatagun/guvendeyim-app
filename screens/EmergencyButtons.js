import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const EmergencyButtons = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.safeButton}>
                <Text style={styles.buttonText}>I'm safe</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.unsafeButton}>
                <Text style={styles.buttonText}>I'm not safe</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
    safeButton: {
        backgroundColor: 'green',
        borderRadius: 4,
        width: '45%',
        alignItems: 'center',
        padding: 10,
    },
    unsafeButton: {
        backgroundColor: 'red',
        borderRadius: 4,
        width: '45%',
        alignItems: 'center',
        padding: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default EmergencyButtons;
