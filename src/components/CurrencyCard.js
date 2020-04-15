import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CurrencyCard(props) {
    
    return (
        <View style={[styles.container]}>

            <Text style={styles.regionText}>Bit coin</Text>

            <Text>55.3</Text>
    
            {/* <Icon name="ios-arrow-forward" type="ionicon" size={30} /> */}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginVertical: 5,
        borderRadius: 5,
        padding: 20,
        backgroundColor: 'lightblue',
        borderRadius: 4
    },
    regionText: {
        marginBottom: 5,
        fontSize: 16
    },
    caseTypeText: {
        fontWeight: 'bold',
        marginBottom: 8
    }
  });
  