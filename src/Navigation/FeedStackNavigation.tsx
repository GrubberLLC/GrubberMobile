import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FavoriteScreen from '../Screens/Favorites/FavoriteScreen';
import FavoritesSinglePlaceScreen from '../Screens/Favorites/FavoritesSinglePlaceScreen';
import PostsScreen from '../Screens/Posts/PostsScreen';
import AddPostScreen from '../Screens/Posts/AddPostScreen';
import SinglePlaceScreen from '../Screens/Posts/SinglePlaceScreen';
import NotificationsScreen from '../Screens/Posts/NotificationsScreen';
import SinglePlaceInPostScreen from '../Screens/Posts/SinglePlaceInPostScreen';
import UserProfileScreen from '../Screens/Profiles/UserProfileScreen';
import EditPostScreen from '../Screens/Posts/EditPostScreen';
import SinglePostScreen from '../Screens/Posts/SinglePostScreen';

const StackNav = createStackNavigator();

const FeedStackNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="PostsScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="PostsScreen" component={PostsScreen} />
      <StackNav.Screen name="AddPostScreen" component={AddPostScreen} />
      <StackNav.Screen name="PostSinglePlaceScreen" component={SinglePlaceScreen} />
      <StackNav.Screen name="NotificationsScreen" component={NotificationsScreen} />
      <StackNav.Screen name="SinglePlaceInPostScreen" component={SinglePlaceInPostScreen} />
      <StackNav.Screen name="SinglePostScreen" component={SinglePostScreen} />
      <StackNav.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <StackNav.Screen name="EditPostScreen" component={EditPostScreen} />
    </StackNav.Navigator>
  );
};

export default FeedStackNavigation;
