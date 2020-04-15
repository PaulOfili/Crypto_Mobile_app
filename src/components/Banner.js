import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Banner(props) {
    
    return (
        <View style={styles.container} >
            <Text>Welcome back Tayo</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        // paddingHorizontal: 10,
        // paddingVertical: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#9C26B0",
        width: '90%',
        height: 150,
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 10
    },
  });
  