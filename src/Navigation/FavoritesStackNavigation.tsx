import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FavoriteScreen from '../Screens/Favorites/FavoriteScreen';

const StackNav = createStackNavigator();

const FavoritesStackNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="ListScreens"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="FavoriteScreen" component={FavoriteScreen} />
    </StackNav.Navigator>
  );
};

export default FavoritesStackNavigation;
