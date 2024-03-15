import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from '../Screens/Search/SearchScreen';
import SearchSinglePlaceScreen from '../Screens/Search/SearchSinglePlaceScreen';
import SearchPlaceScreen from '../Screens/Search/SearchPlaceScreen';

const StackNav = createStackNavigator();

const SearchStackNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="SearchScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="SearchScreen" component={SearchScreen} />
      <StackNav.Screen name="SearchSinglePlaceScreen" component={SearchSinglePlaceScreen} />
      <StackNav.Screen name="SearchPlaceScreen" component={SearchPlaceScreen} />
    </StackNav.Navigator>
  );
};

export default SearchStackNavigation;
