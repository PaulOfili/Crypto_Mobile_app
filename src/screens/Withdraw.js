import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
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
import { getBanks, getCurrencies } from '../store/actions/commonData';
import { postMakeWithdraw } from '../store/actions/trade';

const {width} = Dimensions.get('screen');

function Withdraw(props){

  const toastRef = useRef();

  const userData = useSelector((store) => store.auth.userData)
  const banks = useSelector((store) => store.commonData.banks)
  const currencies = useSelector((store) => store.commonData.currencies)
  
  const actionDispatch = useDispatch();
  const getBanksDispatch = useCallback(() => actionDispatch(getBanks()), [actionDispatch]);
  const getCurrenciesDispatch = useCallback(() => actionDispatch(getCurrencies()), [actionDispatch]);
  const postMakeWithdrawDispatch = useCallback((data) => actionDispatch(postMakeWithdraw(data)),[actionDispatch]);
  
  const [currencyType, setCurrencyType] = useState('');
  const [bankType, setBankType] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('0');
  const [memo, setMemo] = useState('');
  const [memoError, setMemoError] = useState(false);

  useEffect(() => {
    getBanksDispatch()
    getCurrenciesDispatch()
  }, [getBanksDispatch, getCurrenciesDispatch])

  useEffect(() => {
    if (banks.error || currencies.error) {
      toastRef.current.openToast();
    }
  }, [banks.error, currencies.error])

  useFocusEffect(
    useCallback(() => {
      if (banks.error || currencies.error) {
        toastRef.current.openToast();
      }
    },[banks.error, currencies.error])
  );

  const onRefresh = useCallback(() => {
    getBanksDispatch();
    getCurrenciesDispatch();
  })

  const onMemoChange = (newMemo) => {
    setMemo(newMemo)

    setMemoError(!checkMinimumLength(newMemo))
  }

  const makeWithdraw = () => {
    const requestBody = {
      senderEmail: userData.email,
      recipientPublicKeyOrEmail: recipient,
      amount,
      bank: bankType,
      debitCurrency: currencyType,
      memo
    };


    if (currencyType &&
        bankType &&
        recipient &&
        amount && parseFloat(amount) !== 0 &&
        memo && !memoError) {
          Alert.alert("Coming Soon!!")
          // postMakeWithdrawDispatch(requestBody);
        } else {
          Alert.alert("Please complete all fields properly")
        }
  };

  const renderCurrencyPicker = () => {
    return (
      <View style={styles.currencyPicker}>
        <Text>Debit Currency:</Text>
        <Picker
          selectedValue={currencyType}
          onValueChange={(itemValue, itemIndex) =>
            setCurrencyType(itemValue)
          }>
          <Picker.Item label='Pick a currency' value=''/>
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

  const renderBankPicker = () => {
    return (
      <View style={styles.bankPicker}>
        <Text>Select a Bank:</Text>
        <Picker
          selectedValue={bankType}
          onValueChange={(itemValue, itemIndex) =>
            setBankType(itemValue)
          }>
            <Picker.Item label='Select one' value='' style={{fontSize: 70}}/>
            {Object.keys(banks.data).map(bank => (
              <Picker.Item 
                key={bank} 
                label={banks.data[bank]}
                value={bank} />
            ))}
        </Picker>
      </View>
    );
  };

  
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}  refreshControl={
        <RefreshControl refreshing={banks.isLoading || currencies.isLoading} onRefresh={onRefresh} />
        }
      >
        <Block flex style={styles.withdraw}>
          {renderCurrencyPicker()}
          {renderBankPicker()}
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
            <Text style={styles.amountText}>Amount:</Text>
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
              inputContainerStyle={[styles.inputField, {borderColor: '#2196e6'}]}
            />
          </View>
          <Button2
            buttonStyle={styles.withdrawButton}
            title="Withdraw"
            onPress={makeWithdraw}
          />
        </Block>
      </ScrollView>
      <Toast ref={toastRef} text={currencies.error || banks.error}/>
    </Container>
  );
}

const styles = StyleSheet.create({
  withdraw: {
    width: width,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  currencyPicker: {
    marginBottom: 20,
  },
  bankPicker: {
    marginBottom: 20,
  },
  inputField: {
    borderColor: theme.COLORS.INFO,
    marginBottom: 30,
    // height: 50
  },
  withdrawButton: {
    marginTop: 20,
  }
});


export default Withdraw;