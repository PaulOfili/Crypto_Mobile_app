import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'galio-framework'
export default function Banner(props) {
    
    return (
        <View style={styles.bannerContainer} >
            <View style={styles.bannerTextContainer}>
                <Text muted style={styles.bannerTitleMuted}>Welcome back,</Text>
                <Text h4 style={styles.bannerHeader}>Tayo</Text>  
            </View>

            <Text p size={13} color='white'>My Accounts</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    bannerContainer: {
        // justifyContent: 'center',
        // alignItems: 'center',
        // paddingHorizontal: 10,
        // paddingVertical: 10,
        padding: 20,
        backgroundColor: "#066995",
        width: '100%',
        height: 230,
        alignSelf: 'center',
        // borderRadius: 10,
        marginBottom: 10
    },

    bannerHeader: {
        color: 'white',
        // fontSize: 20
    },

    bannerTitleMuted: {
        color: 'white',
        opacity: 0.5
    },

    bannerTextContainer: {
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: 'white',
        marginBottom:25,
    }
  });
  