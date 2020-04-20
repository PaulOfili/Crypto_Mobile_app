import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Picker,
  Alert,
  View,
} from 'react-native';
import {Button, Block, Text, Input, theme} from 'galio-framework';
import { Input as Input2, Button as Button2} from 'react-native-elements';
import Container from '../layouts/Container';

const {width} = Dimensions.get('screen');
const currencies = [
  {
    id: 0,
    label: 'Naira',
    value: 'naira',
  },
  {
    id: 1,
    label: 'Bitcoin',
    value: 'bitcon',
  },
  {
    id: 2,
    label: 'Crypto',
    value: 'crypto',
  },
];

const banks = [
  {
    id: 0,
    value: 'uba',
    label: 'United Bank for Africa',
  },
  {
    id: 1,
    value: 'ecobank',
    label: 'Ecobank',
  },
  {
    id: 2,
    value: 'gtbank',
    label: 'GTBank',
  },
];

function Withdraw(props){

  const [currencyType, setCurrencyType] = useState('')
  const [bankType, setbankType] = useState('')

  const makeWithdraw = () => {
    Alert.alert('Withdraw has been activated!!');
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
          {currencies.map(currency => (
            <Picker.Item
              key={currency.id}
              label={currency.label}
              value={currency.value}
            />
          ))}
        </Picker>
      </View>
    );
  };

  const renderBanks = () => {
    return (
      <View style={styles.bankPicker}>
        <Text>Select a Bank:</Text>
        <Picker
          selectedValue={bankType}
          onValueChange={(itemValue, itemIndex) =>
            setBankType(itemValue)
          }>
          {banks.map(bank => (
            <Picker.Item key={bank.id} label={bank.label} value={bank.value} />
          ))}
        </Picker>
      </View>
    );
  };

  return (
    <Container>
      <Block flex style={styles.withdraw}>
        {renderCurrencyPicker()}
        {renderBanks()}
        <View style={styles.recipientContainer}>
          <Text style={styles.recipientText}>Account Number:</Text>
          <Input2
            placeholder='Receiver email or public key'
            inputContainerStyle={[styles.inputField, {borderColor: '#2196e6'}]}
          />
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>Amount:</Text>
          <Input2
            placeholder='Enter amount in figures'
            inputContainerStyle={[styles.inputField, {borderColor: '#2196e6'}]}
          />
        </View>
        <View style={styles.memoContainer}>
          
          <Text style={styles.memoText}>Narration:</Text>
          <Input2
            inputContainerStyle={[styles.inputField, {borderColor: '#2196e6'}]}
          />
        </View>
      </Block>
    </Container>
  );
}

const styles = StyleSheet.create({
  withdraw: {
    width: width,
    padding: 20,
    // marginTop: 10,
  },
  currencyPicker: {
    marginTop: 30,
    marginBottom: 5,
  },
  bankPicker: {
    marginVertical: 20,
  },
  inputField: {
    borderColor: theme.COLORS.INFO,
    marginBottom: 35,
    // height: 50
  },
});


export default Withdraw;