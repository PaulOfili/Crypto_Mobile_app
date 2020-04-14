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
    label: 'Naira',
    value: 'naira',
  },
  {
    label: 'Bitcoin',
    value: 'bitcon',
  },
  {
    label: 'Crypto',
    value: 'crypto',
  },
];
export default class Funds extends React.Component {
  constructor() {
    super();

    this.state = {
      currencyType: '',
      acceptTermsChecked: false,
    };
  }

  toggleSwitch = () => {
    this.setState(prevState => ({
      acceptTermsChecked: !prevState.acceptTermsChecked,
    }));
  };

  createAccount = () => {
    Alert.alert(`Selected is ${this.state.currencyType} !!`);
  };

  renderCurrencies = () => {
    return (
      <View style={styles.container}>
        <Text>Select Currency</Text>
        <Picker
          style={styles.currencyPicker}
          selectedValue={this.state.currencyType}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({currencyType: itemValue})
          }>
          {currencies.map(currency => (
            <Picker.Item label={currency.label} value={currency.value} />
          ))}
        </Picker>
      </View>
    );
  };

  render() {
    return (
      <ScrollView>
        <Block flex style={styles.funds}>
          <Text size={16}>Coming Soon</Text>
        </Block>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  funds: {
    width: width,
    padding: 20,
    marginTop: 20,
  },
  currencyPicker: {
    marginTop: 40,
    marginBottom: 50,
  },
  togglerContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 30,
  },
  togglerText: {
    marginTop: 3,
  },
});
