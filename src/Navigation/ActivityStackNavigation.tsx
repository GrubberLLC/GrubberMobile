import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ActivityScreen from '../Screens/Activity/ActivityScreen';
import UserProfileScreen from '../Screens/Profiles/UserProfileScreen';

const StackNav = createStackNavigator();

const ActivityStackNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="ListScreens"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="ActivityScreen" component={ActivityScreen} />
      <StackNav.Screen name="UserProfileScreen" component={UserProfileScreen} />
    </StackNav.Navigator>
  );
};

export default ActivityStackNavigation;
