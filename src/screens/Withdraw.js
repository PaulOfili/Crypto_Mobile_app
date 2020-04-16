import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Picker,
  Alert,
  View,
} from 'react-native';
import {Button, Block, Text, Input, theme} from 'galio-framework';

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

export default class Withdraw extends React.Component {
  constructor() {
    super();

    this.state = {
      currencyType: '',
      bankType: '',
    };
  }

  makeWithdraw = () => {
    Alert.alert('Withdraw has been activated!!');
  };

  renderCurrencyPicker = () => {
    return (
      <View style={styles.currencyPicker}>
        <Text>Debit Currency:</Text>
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

  renderBanks = () => {
    return (
      <View style={styles.bankPicker}>
        <Text>Select a Bank:</Text>
        <Picker
          selectedValue={this.state.bankType}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({bankType: itemValue})
          }>
          {banks.map(bank => (
            <Picker.Item key={bank.id} label={bank.label} value={bank.value} />
          ))}
        </Picker>
      </View>
    );
  };

  render() {
    return (
      <ScrollView>
        <Block flex style={styles.withdraw}>
          {this.renderCurrencyPicker()}
          {this.renderBanks()}
          <View style={styles.recipientContainer}>
            <Text style={styles.recipientText}>Account Number:</Text>
            <Input
              placeholder="Receiver email or public key"
              color={theme.COLORS.INFO}
              style={styles.inputField}
            />
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>Amount:</Text>
            <Input
              placeholder="Enter amount in figures"
              color={theme.COLORS.INFO}
              style={styles.inputField}
            />
          </View>
          <View style={styles.memoContainer}>
            <Text style={styles.memoText}>Narration:</Text>
            <Input color={theme.COLORS.INFO} style={styles.inputField} />
          </View>
          <Button
            style={styles.withdrawButton}
            size="small"
            round
            uppercase
            color="success"
            onPress={this.makeWithdraw}>
            Next
          </Button>
        </Block>
      </ScrollView>
    );
  }
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
    marginTop: 10,
    marginBottom: 15,
  },
  inputField: {
    borderColor: theme.COLORS.INFO,
    marginBottom: 10,
  },
  withdrawButton: {
    marginTop: 15,
  },
});
