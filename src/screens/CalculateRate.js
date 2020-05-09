import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator
} from 'react-native';
import {Button, Block, Text, Input, theme} from 'galio-framework';
import { Input as Input2, Button as Button2} from 'react-native-elements';
import Container from '../layouts/Container';
import { postMakeTransfer } from '../store/actions/trade';

const {width} = Dimensions.get('screen');

function CalculateRate ({route}) {
    const { calculateRateResponse, senderPublicKey, transferDetails } = route.params

    const transferIsLoading = useSelector(store => store.trade.transfer.isLoading)

    const actionDispatch = useDispatch();
    const postMakeTransferDispatch = useCallback((data) => actionDispatch(postMakeTransfer(data)),[actionDispatch]);

    const confirmAndTransfer = () => {
        postMakeTransferDispatch(transferDetails);
    };

    if (transferIsLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#0000ff"/>
                <Text style={{marginTop: 15}}>Processing Transaction</Text>
            </View>
        )
    }
    return (
        <Container>  
            <Block flex style={styles.calculateRate}>
                <View style={styles.confirmContainer}>
                    <View style={styles.confirmRecipient}>
                        <Text style={styles.confirmRecipientDetails}>
                            {(transferDetails.recipientPublicKeyOrEmail.length < 18) 
                                ? transferDetails.recipientPublicKeyOrEmail
                                : transferDetails.recipientPublicKeyOrEmail.substring(0, 4) 
                                    + '...' 
                                    + transferDetails.recipientPublicKeyOrEmail.substring(transferDetails.recipientPublicKeyOrEmail.length-4, transferDetails.recipientPublicKeyOrEmail.length)}
                        </Text>
                        {/* <Text style={styles.confirmText}>would receive</Text> */}
                    </View>
                    <Text style={styles.confirmAmount}>{transferDetails.currencyToReceive} {transferDetails.amount}</Text>
                </View>
                <View style={styles.senderAccountContainer}>
                    <Text>Sender Account</Text>
                    <View style={styles.senderAccountTile}>
                        <Text>{(senderPublicKey) 
                            ? senderPublicKey.substring(0,4) + '...' + senderPublicKey.substring(senderPublicKey.length-4, senderPublicKey.length) 
                            // ? transferDetails.senderEmail 
                            : 'You have no account'}
                        </Text>
                        <Text style={{color: 'red'}}> - {calculateRateResponse.senderAssetCode} {calculateRateResponse.amountToDeduct}</Text>
                    </View>
                    <View style={styles.senderAccountTile}>
                        <Text>Exchange rate</Text>
                        <Text>{calculateRateResponse.recipientAssetCode} 1 = {calculateRateResponse.senderAssetCode} {calculateRateResponse.price}</Text>
                    </View>
                </View>
                <Button2
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
    // marginBottom: 10
},
confirmText: {
    color: 'white',
    fontSize: 15,
},
confirmAmount: {
    color: 'white',
    fontSize: 22
},
senderAccountContainer: {
    marginTop: 40,
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