import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ActivityScreen from '../Screens/Activity/ActivityScreen';
import UserProfileScreen from '../Screens/Profiles/UserProfileScreen';
import ActivityUserListScreen from '../Screens/Activity/ActivityUserListScreen';
import ActivityUserProfileScreen from '../Screens/Activity/ActivityUserProfileScreen';

const StackNav = createStackNavigator();

const ActivityStackNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="ListScreens"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="ActivityScreen" component={ActivityScreen} />
      <StackNav.Screen name="ActivityUserProfileScreen" component={ActivityUserProfileScreen} />
      <StackNav.Screen name="ActivityUserListScreen" component={ActivityUserListScreen} />
    </StackNav.Navigator>
  );
};

export default ActivityStackNavigation;
