import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Activity, Heart, Layers, List, Search, User} from 'react-native-feather';
import ListStackNavigation from './ListStackNavgation';
import ProfileStackNavigation from './ProfileStackNavigation';
import ActivityStackNavigation from './ActivityStackNavigation';
import SearchStackNavigation from './SearchStackNavigation';
import FavoritesStackNavigation from './FavoritesStackNavigation';
import { View } from 'react-native';
import FeedStackNavigation from './FeedStackNavigation';

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
          name="Feed"
          key="Feed"
          component={FeedStackNavigation}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({ focused, color, size }) => (
              <View style={{ width: 22, height: 22, alignItems: 'center' }}>
                {
                  focused 
                    ? <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{width: '100%', height: 3, backgroundColor: '#e94f4e', position: 'absolute', top: 0}}></View>
                        <Layers style={{marginTop: 12}} stroke={'white'} height={20} width={20} strokeWidth={3}/>
                      </View>
                    : <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{width: '100%', height: 3, backgroundColor: 'black', position: 'absolute', top: 0}}></View>
                        <Layers style={{marginTop: 12}} stroke={'white'} height={20} width={20} strokeWidth={3}/>
                      </View>
                }
              </View>
            ),
          }}/>
        <Tab.Screen
          name="Lists"
          key="Lists"
          component={ListStackNavigation}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({ focused, color, size }) => (
              <View style={{ width: 22, height: 22, alignItems: 'center' }}>
                {
                  focused 
                    ? <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{width: '100%', height: 3, backgroundColor: '#e94f4e', position: 'absolute', top: 0}}></View>
                        <List style={{marginTop: 12}} stroke={'white'} height={20} width={20} strokeWidth={3}/>
                      </View>
                    : <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{width: '100%', height: 3, backgroundColor: 'black', position: 'absolute', top: 0}}></View>
                        <List style={{marginTop: 12}} stroke={'white'} height={20} width={20} strokeWidth={3}/>
                      </View>
                }
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          key="Search"
          component={SearchStackNavigation}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({ focused, color, size }) => (
              <View style={{ width: 22, height: 22, alignItems: 'center' }}>
                {
                  focused 
                    ? <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{width: '100%', height: 3, backgroundColor: '#e94f4e', position: 'absolute', top: 0}}></View>
                        <Search style={{marginTop: 12}} stroke={'white'} height={20} width={20} strokeWidth={3}/>
                      </View>
                    : <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{width: '100%', height: 3, backgroundColor: 'black', position: 'absolute', top: 0}}></View>
                        <Search style={{marginTop: 12}} stroke={'white'} height={20} width={20} strokeWidth={3}/>
                      </View>
                }
              </View>
            ),
          }}/>
        <Tab.Screen
          name="Favorites"
          key="Favorites"
          component={FavoritesStackNavigation}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({ focused, color, size }) => (
              <View style={{ width: 22, height: 22, alignItems: 'center' }}>
                {
                  focused 
                    ? <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{width: '100%', height: 3, backgroundColor: '#e94f4e', position: 'absolute', top: 0}}></View>
                        <Heart style={{marginTop: 12}} stroke={'white'} height={20} width={20} strokeWidth={3}/>
                      </View>
                    : <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{width: '100%', height: 3, backgroundColor: 'black', position: 'absolute', top: 0}}></View>
                        <Heart style={{marginTop: 12}} stroke={'white'} height={20} width={20} strokeWidth={3}/>
                      </View>
                }
              </View>
            ),
          }}/>
        <Tab.Screen
          name="Profile"
          key="Profile"
          component={ProfileStackNavigation}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({ focused, color, size }) => (
              <View style={{ width: 22, height: 22, alignItems: 'center' }}>
                {
                  focused 
                    ? <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{width: '100%', height: 3, backgroundColor: '#e94f4e', position: 'absolute', top: 0}}></View>
                        <User style={{marginTop: 12}} stroke={'white'} height={20} width={20} strokeWidth={3}/>
                      </View>
                    : <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{width: '100%', height: 3, backgroundColor: 'black', position: 'absolute', top: 0}}></View>
                        <User style={{marginTop: 12}} stroke={'white'} height={20} width={20} strokeWidth={3}/>
                      </View>
                }
              </View>
            ),
          }}/> 
      </Tab.Navigator>
    </NavigationContainer>
  )
}

// {
//   focused 
//     ? <View>
//         <View style={{width: '100%', height: 2, backgroundColor: '#e94f4e', marginBottom: 6}}></View>
//         <List stroke={color} height={size} width={size} strokeWidth={3}/>
//       </View>
//     : <View>
//         <View style={{width: '100%', height: 2, backgroundColor: 'red'}}></View>
//         <List stroke={color} height={size} width={size}/>
//       </View>
// }

export default BottomTabNavigation
