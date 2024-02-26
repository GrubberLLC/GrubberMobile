import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AllListsScreens from '../Screens/Lists/AllListsScreens';
import SingleListScreen from '../Screens/Lists/SingleListScreen';
import ListDetailsPage from '../Screens/Lists/ListDetailsPage';
import SinglePlaceScreen from '../Screens/Lists/SinglePlaceScreen';
import UserProfileScreen from '../Screens/Profiles/UserProfileScreen';

const StackNav = createStackNavigator();

const ListStackNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="ListScreens"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="AllListsScreens" component={AllListsScreens} />
      <StackNav.Screen name="SingleListScreen" component={SingleListScreen} />
      <StackNav.Screen name="ListDetailsPage" component={ListDetailsPage} />
      <StackNav.Screen name="SinglePlaceScreen" component={SinglePlaceScreen} />
      <StackNav.Screen name="UserProfileScreen" component={UserProfileScreen} />
    </StackNav.Navigator>
  );
};

export default ListStackNavigation;
