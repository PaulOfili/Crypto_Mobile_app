import React, {useState, useCallback} from "react";
import { useDispatch } from 'react-redux';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components/ArgonComponents";
import { Button as Button2 } from 'react-native-elements';
import { Images, argonTheme } from "../constants/ArgonConstants";
import { signUpUser } from '../store/actions/auth';
const { width, height } = Dimensions.get("screen");

function Register({navigation}) {
  
  const actionDispatch = useDispatch();
  const signUpUserDispatch = useCallback((data) => actionDispatch(signUpUser(data)),[actionDispatch]);

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptTermsChecked, setAcceptTermsChecked] = useState(false)

  const toggleCheckbox = () => {
    setAcceptTermsChecked(!acceptTermsChecked);
  };

  const onSignUp = () => {
    const requestBody = {
      username: email,
      firstName,
      lastName,
      password,
      confirmPassword,
      email,
      mobileNo: phone
    }
    signUpUserDispatch(requestBody)
  }
  return (
    <Block flex middle>
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        <Block flex middle>
          <Block style={styles.registerContainer}>
            <Block flex>
              <Block flex={0.12} middle>
                <Text color="#8898AA" size={12}>
                  Join us 
                </Text>
              </Block>
              <Block flex center>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior="padding"
                  enabled
                  
                  
                >
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>                    
                      <Block row style={{ width: width*0.8, marginBottom: 10 }}>
                        <Block flex style={{marginRight: 4}}>
                          <Input
                            value={firstName}
                            onChangeText={text => setFirstName(text)}
                            borderless
                            placeholder="First Name"
                            iconContent={
                              <Icon
                                size={16}
                                color={argonTheme.COLORS.ICON}
                                name="user"
                                family="AntDesign"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block flex style={{marginLeft: 4}} >
                          <Input
                            value={lastName}
                            onChangeText={text => setLastName(text)}
                            borderless
                            placeholder="Last Name"
                            iconContent={null}
                          />
                        </Block>
                      </Block>
                      <Block style={{ width: width*0.8, marginBottom: 10 }}>
                        <Input
                          value={email}
                          onChangeText={text => setEmail(text)}
                          borderless
                          placeholder="Email"
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="email-outline"
                              family="Material-Community"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      </Block>
                      <Block style={{ width: width*0.8, marginBottom: 10 }}>
                        <Input
                          value={phone}
                          onChangeText={text => setPhone(text)}
                          type='number-pad'
                          borderless
                          placeholder="Phone"
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="phone"
                              family="AntDesign"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      </Block>
                      <Block style={{ width: width*0.8, marginBottom: 10 }}>
                        <Input
                          value={password}
                          onChangeText={text => setPassword(text)}
                          password
                          borderless
                          placeholder="Password"
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="lock"
                              family="AntDesign"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      </Block>
                      <Block width={width * 0.8}>
                        <Input
                          value={confirmPassword}
                          onChangeText={text => setConfirmPassword(text)}
                          password
                          borderless
                          placeholder="Confirm Password"
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="lock"
                              family="AntDesign"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      </Block>
                      <Block row width={width * 0.75}>
                        <Checkbox
                          value={acceptTermsChecked}
                          onChange={() => toggleCheckbox()}
                          checkboxStyle={{
                            borderWidth: 3
                          }}
                          color={argonTheme.COLORS.PRIMARY}
                          label="I agree with the"
                        />
                        <Button
                          style={{ width: 100, elevation: 0 }}
                          color="transparent"
                          textStyle={{
                            color: argonTheme.COLORS.PRIMARY,
                            fontSize: 14
                          }}
                        >
                          Privacy Policy
                        </Button>
                      </Block>
                      <Block middle>
                        <Button2
                          disabled={acceptTermsChecked}
                          buttonStyle={styles.signUpButton}
                          title="Sign Up"
                          onPress={onSignUp}
                        />
                      </Block>
                      <Block middle width={width * 0.75}>
                        <Button
                          onPress={() => navigation.navigate('Login')}
                          style={{ width: 180, elevation: 0, marginTop: 10 }}
                          color="transparent"
                          textStyle={{
                            color: argonTheme.COLORS.PRIMARY,
                            fontSize: 14
                          }}
                        >
                          <Block row>
                            <Text muted>Already have an account?</Text>
                            <Text style={{marginLeft: 15}} >Login here</Text>
                          </Block>
                        </Button>
                      </Block>
                    </View>
                  </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
              </Block>
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.78,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  signUpButton: {
    width: width * 0.5,
    marginTop: 15
  },
});

export default Register;
