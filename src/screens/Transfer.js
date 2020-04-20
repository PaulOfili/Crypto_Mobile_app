import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Picker,
  Alert,
  View,
  Switch,
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
function Transfer (props) {

  const [currencyType, setCurrencyType] = useState('')

  const makeTransfer = () => {
    Alert.alert('Transfer has been activated!!');
  };

  const renderCurrencyPicker = () => {
    return (
      <View style={styles.currencyPicker}>
        <Text>Choose account to debit</Text>
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

  return (
    <Container>
      <Block flex style={styles.transfer}>
        {renderCurrencyPicker()}
        <View style={styles.recipientContainer}>
          <Text style={styles.recipientText}>Recipient:</Text>
          <Input2
            placeholder='Receiver email or public key'
            inputContainerStyle={[styles.inputField, {borderColor: '#2196e6'}]}
          />
          {/* <Input
            placeholder="Receiver email or public key"
            color={theme.COLORS.INFO}
            style={styles.inputField}
          /> */}
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>Amount to send:</Text>
          <Input2
            placeholder='Receiver email or public key'
            inputContainerStyle={[styles.inputField, {borderColor: '#2196e6'}]}
          />
        </View>
        <View style={styles.memoContainer}>
          <Text style={styles.memoText}>Memo:</Text>
          <Input2
            placeholder='Receiver email or public key'
            inputContainerStyle={[styles.inputField, {borderColor: '#2196e6'}]}
          />
        </View>
        <Button2
          buttonStyle={styles.transferButton}
          title="Transfer"
          onPress={makeTransfer}
        />
      </Block>
    </Container>
  );
}

const styles = StyleSheet.create({
  transfer: {
    width: width,
    padding: 20,
    marginTop: 20,
  },
  currencyPicker: {
    marginTop: 30,
    marginBottom: 15,
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