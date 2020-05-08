import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components/ArgonComponents";
import { Images, argonTheme } from "../constants/ArgonConstants";
import {loginUser} from "../store/actions/auth";
import { checkEmail } from '../utilities/formValidation';
const { width, height } = Dimensions.get("screen");


function Login({navigation}) {

  const loginLoading = useSelector((store) => store.auth.isLoading)

  const actionDispatch = useDispatch();
  const loginUserDispatch = useCallback((data) => actionDispatch(loginUser(data)),[actionDispatch]);
    
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)

  const onEmailChange = (newEmail) => {
    setEmail(newEmail)
    setEmailError(false)
  }

  const onEmailBlur = () => {
    setEmailError(!checkEmail(email))
  }

  const onPasswordChange = (newPassword) => {
    setPassword(newPassword)
    // setPasswordError(!checkPassword(newPassword))
  }

  const onLogin = () => {
    const requestBody = {
      email: email,
      password: password,
    }
    if (email && !emailError && 
        password && !passwordError) {
          loginUserDispatch(requestBody)
    } else {
      Alert.alert('Please complete all fields properly!');
    }
  }

  return (
      <Block flex middle>
        <StatusBar translucent hidden backgroundColor="transparent"/>
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex middle>
            <Block style={styles.loginContainer}>
              <Block flex>
                  <View style={styles.welcomeContainer}>
                    <Block>
                      <Text color="#2196e6" size={30}>
                        Welcome back.
                      </Text>
                    </Block>
                  </View>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                      <View style={{flex: 1}}>
                        <Block width={width * 0.8}>
                          <Input
                            error={emailError}
                            value={email}
                            onChangeText={text => onEmailChange(text)}
                            onBlur={onEmailBlur}
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
                        <Block width={width * 0.8}>
                          <Input
                            error={passwordError}
                            value={password}
                            onChangeText={text => onPasswordChange(text)}
                            password
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
                        <Block middle>
                          <Button 
                            loading={loginLoading}
                            onPress={onLogin}
                            color="primary" style={styles.createButton}>
                            <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                              Login
                            </Text>
                          </Button>
                        </Block>
                        <Block middle width={width * 0.75}>
                          
                          <Button
                            onPress={() => navigation.navigate('Register')}
                            style={{ width: 130, elevation: 0, marginTop: 30 }}
                            color="transparent"
                            textStyle={{
                              color: argonTheme.COLORS.PRIMARY,
                              fontSize: 14
                            }}
                          >
                            <Block row>
                              <Text muted>New here?</Text>
                              <Text style={{marginLeft: 10}} >Sign Up to join</Text>
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
  loginContainer: {
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
  welcomeContainer: {
    marginTop: 80,
    paddingHorizontal: 20,
    marginBottom: 40
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
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});

export default Login;
