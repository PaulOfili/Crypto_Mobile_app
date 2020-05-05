import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import {Button, Block, Text, Input, theme} from 'galio-framework';
import { Input as Input2, Button as Button2} from 'react-native-elements';
import Container from '../layouts/Container';
import { postMakeTransfer } from '../store/actions/trade';

const {width} = Dimensions.get('screen');

function CalculateRate ({route}) {

    const transferIsLoading = useSelector(store => store.trade.transfer.isLoading)

    const actionDispatch = useDispatch();
    const postMakeTransferDispatch = useCallback((data) => actionDispatch(postMakeTransfer(data)),[actionDispatch]);
    
    console.log(route.params)

    const confirmAndTransfer = () => {
        postMakeTransferDispatch(requestBody);
    };

    const { senderPublicKey } = route.params
    return (
        <Container>  
            <Block flex style={styles.calculateRate}>
                <View style={styles.confirmContainer}>
                    <View style={styles.confirmRecipient}>
                        <Text style={styles.confirmRecipientDetails}>paulofili@gmail</Text>
                        <Text style={styles.confirmText}>would receive</Text>
                    </View>
                    <Text style={styles.confirmAmount}>USD FDFDF</Text>
                </View>
                <View style={styles.senderAccountContainer}>
                    <Text>Sender Account</Text>
                    <View style={styles.senderAccountTile}>
                        <Text>{(senderPublicKey) ? senderPublicKey : 'You have no account'}</Text>
                    </View>
                    <View style={styles.senderAccountTile}>
                        <Text>Exchange rate</Text>
                        <Text>3535</Text>
                    </View>
                </View>
                <Button2
                    loading={transferIsLoading}
                    buttonStyle={styles.confirmButton}
                    title="Confirm and Transfer"
                    onPress={confirmAndTransfer}
                />
            </Block>
        </Container>
    );
}

const styles = StyleSheet.create({
    calculateRate: {
    width: width,
    paddingHorizontal: 10,
  },
  confirmContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 5,
    height: 140,
    paddingHorizontal: 20,
    paddingVertical: 60,
    backgroundColor: '#005B82'
},
confirmRecipient:{
    width: '70%',
    color: 'white'
},
confirmRecipientDetails: {
    color: '#6CCF00',
    fontSize: 22,
    marginBottom: 10
},
confirmText: {
    color: 'white',
    fontSize: 15,
},
confirmAmount: {
    color: 'white'
},
senderAccountContainer: {
    marginTop: 40,
    // borderWidth: 5,
    flex: 0.9
},
senderAccountTile: {
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 10
}
});

export default CalculateRate;