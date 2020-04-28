import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  Dimensions,
  Picker,
  Alert,
  View,
  ActivityIndicator,
  RefreshControl,
  ScrollView
} from 'react-native';
import {Button, Block, Text, Input, theme} from 'galio-framework';
import { Input as Input2, Button as Button2} from 'react-native-elements';
import Container from '../layouts/Container';
import Toast from '../components/Toast';
import { checkMinimumLength } from '../utilities/formValidation'
import { getCurrencies } from '../store/actions/commonData';
import { postMakeTransfer } from '../store/actions/trade';

const {width} = Dimensions.get('screen');

function Transfer (props) {

  const toastRef = useRef();

  const currencies = useSelector((store) => store.commonData.currencies)
  const userData = useSelector((store) => store.auth.userData)

  const actionDispatch = useDispatch();
  const getCurrenciesDispatch = useCallback(() => actionDispatch(getCurrencies()), [actionDispatch]);
  const postMakeTransferDispatch = useCallback((data) => actionDispatch(postMakeTransfer(data)),[actionDispatch]);

  const [senderCurrencyType, setSenderCurrencyType] = useState('')
  const [recipientCurrencyType, setRecipientCurrencyType] = useState('')
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('0');
  const [memo, setMemo] = useState('');
  const [memoError, setMemoError] = useState(false);

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
    
    const requestBody = {
      senderEmail: userData.email,
      recipientPublicKeyOrEmail: recipient,
      amount,
      currencyToSend: senderCurrencyType,
      currencyToReceive: recipientCurrencyType,
      memo
    };

    if (senderCurrencyType &&
        recipientCurrencyType &&
        recipient &&
        amount && parseFloat(amount) !== 0 &&
        memo && !memoError) {
          postMakeTransferDispatch(requestBody);
        } else {
          Alert.alert("Please complete all fields properly")
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