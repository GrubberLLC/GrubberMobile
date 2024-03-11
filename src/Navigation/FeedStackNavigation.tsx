import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FavoriteScreen from '../Screens/Favorites/FavoriteScreen';
import FavoritesSinglePlaceScreen from '../Screens/Favorites/FavoritesSinglePlaceScreen';
import PostsScreen from '../Screens/Posts/PostsScreen';
import AddPostScreen from '../Screens/Posts/AddPostScreen';
import SinglePlaceScreen from '../Screens/Posts/SinglePlaceScreen';

const StackNav = createStackNavigator();

const FeedStackNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="PostsScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="PostsScreen" component={PostsScreen} />
      <StackNav.Screen name="AddPostScreen" component={AddPostScreen} />
      <StackNav.Screen name="PostSinglePlaceScreen" component={SinglePlaceScreen} />
    </StackNav.Navigator>
  );
};

export default FeedStackNavigation;
