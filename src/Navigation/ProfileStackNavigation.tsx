import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../Screens/Profiles/ProfileScreen';
import SettingsScreen from '../Screens/Profiles/SettingsScreen';
import UserProfileScreen from '../Screens/Profiles/UserProfileScreen';
import ProfileSingleListScreen from '../Screens/Profiles/ProfileSingleListScreen';

const StackNav = createStackNavigator();

const ProfileStackNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="ProfileScreen" component={ProfileScreen} />
      <StackNav.Screen name="SettingsScreen" component={SettingsScreen} />
      <StackNav.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <StackNav.Screen name="ProfileSingleListScreen" component={ProfileSingleListScreen} />
    </StackNav.Navigator>
  );
};

export default ProfileStackNavigation;
