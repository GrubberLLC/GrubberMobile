import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Activity, Heart, List, Search, User} from 'react-native-feather';
import ListStackNavigation from './ListStackNavgation';
import ProfileStackNavigation from './ProfileStackNavigation';
import ActivityStackNavigation from './ActivityStackNavigation';
import SearchStackNavigation from './SearchStackNavigation';
import FavoritesStackNavigation from './FavoritesStackNavigation';

const Tab = createBottomTabNavigator()

const BottomTabNavigation = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'black', // Set your desired background color here
            borderTopColor: 'transparent', // You can also remove the border top line
          },
          tabBarActiveTintColor: 'white', // Set active icon color
          tabBarInactiveTintColor: 'gray', // Se
        }}>
        <Tab.Screen
          name="Lists"
          key="Lists"
          component={ListStackNavigation}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({size, color}) => (<List stroke={'white'} height={22} width={22} />),
          }}
        />
        <Tab.Screen
          name="Search"
          key="Search"
          component={SearchStackNavigation}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({size, color}) => (<Search stroke={'white'} height={22} width={22} />),
          }}/>
        <Tab.Screen
          name="Activity"
          key="Activity"
          component={ActivityStackNavigation}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({size, color}) => (<Activity stroke={'white'} height={22} width={22} />),
          }}/>
        <Tab.Screen
          name="Favorites"
          key="Favorites"
          component={FavoritesStackNavigation}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({size, color}) => (<Heart stroke={'white'} height={22} width={22} />),
          }}/>
        <Tab.Screen
          name="Profile"
          key="Profile"
          component={ProfileStackNavigation}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({size, color}) => (<User stroke={'white'} height={22} width={22} />),
          }}/> 
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default BottomTabNavigation
