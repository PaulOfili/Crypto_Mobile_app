import React, { useContext } from 'react';
import { ScrollView, StatusBar, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Container(props) {

	return (
        <SafeAreaView style={styles.container} >
			<StatusBar barStyle="dark-content" backgroundColor='white'/>
            {props.children}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})