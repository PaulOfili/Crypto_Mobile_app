import React, { useContext } from 'react';
import { ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Container(props) {

	return (
        <SafeAreaView style={styles.container} >
        	<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {props.children}
        	</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})