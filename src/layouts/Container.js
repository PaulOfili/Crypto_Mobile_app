import React, { useContext } from 'react';
import { ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Container(props) {

	return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <SafeAreaView style={styles.container}>
                    {props.children}
		    </SafeAreaView>
        </ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})