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

  renderCurrencies = () => {
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
          <Text size={16}>Welcome back Tayo</Text>
          <Text size={16}>Account ID: GARS...WEIO</Text>
          {this.renderCurrencies()}
          <View style={styles.recipientContainer}>
            <Text style={styles.recipientText}>Recipient:</Text>
            <Input
              placeholder="Receiver email or public key"
              color={theme.COLORS.INFO}
              style={styles.inputField}
            />
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>Amount to send:</Text>
            <Input
              placeholder="Enter amount in figures"
              color={theme.COLORS.INFO}
              style={styles.inputField}
            />
          </View>
          <View style={styles.memoContainer}>
            <Text style={styles.memoText}>Memo:</Text>
            <Input color={theme.COLORS.INFO} style={styles.inputField} />
          </View>
          <Button
            style={styles.transferButton}
            size="small"
            round
            uppercase
            color="success"
            onPress={this.makeTransfer}>
            Transfer
          </Button>
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
    marginBottom: 10,
  },
  transferButton: {
    marginTop: 15,
  },
});
