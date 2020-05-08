import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  Dimensions,
  Picker,
  Alert,
  View,
  RefreshControl,
  ScrollView
} from 'react-native';
import {Button, Block, Text, Input, theme} from 'galio-framework';
import { Input as Input2, Button as Button2} from 'react-native-elements';
import Container from '../layouts/Container';
import Toast from '../components/Toast';
import { checkMinimumLength } from '../utilities/formValidation'
import { getCurrencies } from '../store/actions/commonData';
import { calculateRate } from '../services/trade.service';

const {width} = Dimensions.get('screen');

function Transfer ({navigation}) {

  const toastRef = useRef();

  const currencies = useSelector((store) => store.commonData.currencies)
  const userData = useSelector((store) => store.auth.userData)
  const balanceData = useSelector(store => store.balance.data)

  const actionDispatch = useDispatch();
  const getCurrenciesDispatch = useCallback(() => actionDispatch(getCurrencies()), [actionDispatch]);

  const [senderCurrencyType, setSenderCurrencyType] = useState('')
  const [recipientCurrencyType, setRecipientCurrencyType] = useState('')
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('0');
  const [memo, setMemo] = useState('');
  const [memoError, setMemoError] = useState(false);
  const [calculateRateLoading, setCalculateRateLoading] = useState(false)

  useEffect(() => {
    getCurrenciesDispatch()
  }, [ getCurrenciesDispatch])

  useEffect(() => {
    if (currencies.error) {
      toastRef.current.openToast();
    }
  }, [currencies.error])

  useFocusEffect(
    useCallback(() => {
      if (currencies.error) {
        toastRef.current.openToast();
      }
    },[currencies.error])
  );

  const onRefresh = useCallback(() => {
    getCurrenciesDispatch();
  })

  const onMemoChange = (newMemo) => {
    setMemo(newMemo)

    setMemoError(!checkMinimumLength(newMemo))
  }

  const makeTransfer = () => {
    
    const transferRequestBody = {
      senderEmail: userData.email,
      recipientPublicKeyOrEmail: recipient.trim(),
      amount,
      currencyToSend: senderCurrencyType,
      currencyToReceive: recipientCurrencyType,
      memo: memo.trim()
    };

    if (senderCurrencyType &&
        recipientCurrencyType &&
        recipient &&
        amount && parseFloat(amount) !== 0 &&
        memo && !memoError) {

          const calculateRequestParams = {
            senderAssetCode: senderCurrencyType,
            recipientAssetCode: recipientCurrencyType,
            recipientAmount: amount
          }
          setCalculateRateLoading(true)
        
          return calculateRate(calculateRequestParams)
            .then(responseData => {
              setCalculateRateLoading(false)
              navigation.navigate('CalculateRate', {
                transferDetails: transferRequestBody,
                calculateRateResponse: responseData,
                senderPublicKey: balanceData.publicKey
              })
            })
            .catch(error => {
              setCalculateRateLoading(false)
              Alert.alert(error.message)
            })         
        } else {
          Alert.alert("Please complete all fields properly!")
        }
  };

  const renderSenderCurrencyPicker = () => {
    return (
      <View style={styles.currencyPicker}>
        <Text>Choose currency to send:</Text>
        <Picker
          selectedValue={senderCurrencyType}
          onValueChange={(itemValue, itemIndex) =>
            setSenderCurrencyType(itemValue)
          }>
            <Picker.Item label='Pick a currency' value='' />
           {currencies.data.map(currency => (
              <Picker.Item 
                key={currency.id} 
                label={currency.currencyName}
                value={currency.currencyCode} />
            ))}
        </Picker>
      </View>
    );
  };

  const renderRecipientCurrencyPicker = () => {
    return (
      <View style={styles.currencyPicker}>
        <Text>Choose currency to be received in:</Text>
        <Picker
          selectedValue={recipientCurrencyType}
          onValueChange={(itemValue, itemIndex) =>
            setRecipientCurrencyType(itemValue)
          }>
            <Picker.Item label='Pick a currency' value='' />
           {currencies.data.map(currency => (
              <Picker.Item 
                key={currency.id} 
                label={currency.currencyName}
                value={currency.currencyCode} />
            ))}
        </Picker>
      </View>
    );
  };

  return (
    <Container>   
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl refreshing={currencies.isLoading} onRefresh={onRefresh} />
        }
      >
        <Block flex style={styles.transfer}>
          {renderSenderCurrencyPicker()}
          {renderRecipientCurrencyPicker()}
          <View style={styles.recipientContainer}>
            <Text style={styles.recipientText}>Recipient:</Text>
            <Input2
              selectable
              value={recipient}
              onChangeText={text => setRecipient(text)}
              placeholder='Receiver email or public key'
              inputContainerStyle={[styles.inputField, {borderColor: '#2196e6'}]}
            />
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>Amount to send:</Text>
            <Input2
              selectable
              value={amount}
              onChangeText={text => setAmount(text)}
              placeholder='Enter amount in figures'
              inputContainerStyle={[styles.inputField, {borderColor: '#2196e6'}]}
              keyboardType='numeric'
            />
          </View>
          <View style={styles.memoContainer}>
            <Text style={styles.memoText}>Memo:</Text>
            <Input2
              selectable
              value={memo}
              onChangeText={text => onMemoChange(text)}
              placeholder='Must be at least 5 characters long'
              inputContainerStyle={[styles.inputField, {borderColor: (memoError) ? 'red' : '#2196e6'}]}
            />
          </View>
          <Button2
            loading={calculateRateLoading}
            buttonStyle={styles.transferButton}
            title="Transfer"
            onPress={makeTransfer}
          />
        </Block>
      </ScrollView>
      <Toast ref={toastRef} text={currencies.error}/>
    </Container>
  );
}

const styles = StyleSheet.create({
  transfer: {
    width: width,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  currencyPicker: {
    marginBottom: 20,
  },
  inputField: {
    borderColor: theme.COLORS.INFO,
    marginBottom: 30,
  },
  transferButton: {
    marginTop: 20,
  },
});

export default Transfer;