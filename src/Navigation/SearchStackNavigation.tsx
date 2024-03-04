import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from '../Screens/Search/SearchScreen';
import SearchSinglePlaceScreen from '../Screens/Search/SearchSinglePlaceScreen';

const StackNav = createStackNavigator();

const SearchStackNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="SearchScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="SearchScreen" component={SearchScreen} />
      <StackNav.Screen name="SearchSinglePlaceScreen" component={SearchSinglePlaceScreen} />
    </StackNav.Navigator>
  );
};

export default SearchStackNavigation;
