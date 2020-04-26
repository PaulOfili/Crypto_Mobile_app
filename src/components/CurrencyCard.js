import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CurrencyCard({balanceData}) {
    return (
        <View style={[styles.container]}>
            <Text style={styles.regionText}>{balanceData.currencyCode}</Text>
            <Text>{parseFloat(balanceData.balance).toFixed(2)}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        borderRadius: 5,
        height: 60,
        paddingHorizontal: 10,
        borderColor: '#586b71',
        borderWidth: 1
    },
    regionText: {
        fontSize: 16
    }
  });
  