import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screens/Authentication/LoginScreen';
import SignupScreen from '../Screens/Authentication/SignupScreen';
import ProfileScreen from '../Screens/Authentication/ProfileScreen';
import ForgotPasswordScreen from '../Screens/Authentication/ForgotPasswordScreen';
import ConfirmEmailScreen from '../Screens/Authentication/ConfirmEmailScreen';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
const StackNav = createStackNavigator();

const AuthenticationStackNavigation = () => {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: 'transparent',
        },
      }}>
      <StackNav.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <StackNav.Screen name="LoginScreen" component={LoginScreen} />
        <StackNav.Screen name="SignupScreen" component={SignupScreen} />
        <StackNav.Screen name="ProfileScreen" component={ProfileScreen} />
        <StackNav.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <StackNav.Screen name="ConfirmEmailScreen" component={ConfirmEmailScreen} />
      </StackNav.Navigator>
    </NavigationContainer>
  );
};

export default AuthenticationStackNavigation;
