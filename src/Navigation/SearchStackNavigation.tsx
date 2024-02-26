import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from '../Screens/Search/SearchScreen';

const StackNav = createStackNavigator();

const SearchStackNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="SearchScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="SearchScreen" component={SearchScreen} />
    </StackNav.Navigator>
  );
};

export default SearchStackNavigation;
