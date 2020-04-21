import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'galio-framework'

export default function Banner({userData}) {
    return (
        <View style={styles.bannerContainer} >
            <View style={styles.bannerTextContainer}>
                <Text muted style={styles.bannerTitleMuted}>Welcome back,</Text>
                <Text h4 style={styles.bannerHeader}>{userData.firstName}</Text>  
            </View>

            <Text p size={13} color='white'>My Account</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    bannerContainer: {
        padding: 20,
        backgroundColor: "#005B82",
        width: '100%',
        height: 200,
        alignSelf: 'center',
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
  