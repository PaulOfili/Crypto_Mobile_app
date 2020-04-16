import React from 'react';
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
export default class Transfer extends React.Component {
  constructor() {
    super();

    this.state = {
      currencyType: '',
    };
  }

  makeTransfer = () => {
    Alert.alert('Transfer has been activated!!');
  };

  renderCurrencyPicker = () => {
    return (
      <View style={styles.currencyPicker}>
        <Text>Choose account to debit</Text>
        <Picker
          selectedValue={this.state.currencyType}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({currencyType: itemValue})
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

  render() {
    

    return (
      <ScrollView>
        <Block flex style={styles.transfer}>
          {this.renderCurrencyPicker()}
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
            {/* <Input
              placeholder="Enter amount in figures"
              color={theme.COLORS.INFO}
              style={styles.inputField}
            /> */}
          </View>
          <View style={styles.memoContainer}>
            <Text style={styles.memoText}>Memo:</Text>
            {/* <Input color={theme.COLORS.INFO} style={styles.inputField} /> */}
            <Input2
              placeholder='Receiver email or public key'
              inputContainerStyle={[styles.inputField, {borderColor: '#2196e6'}]}
            />
          </View>
          <Button2
            buttonStyle={styles.transferButton}
            title="Transfer"
          />
          {/* <Button
            style={styles.transferButton}
            size="small"
            round
            uppercase
            color="success"
            onPress={this.makeTransfer}>
            Transfer
          </Button> */}
        </Block>
      </ScrollView>
    );
  }
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
