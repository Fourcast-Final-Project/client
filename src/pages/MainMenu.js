import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import Search from '../screens/Search'
import Account from '../screens/Account'
import Home from '../screens/Home'
import Report from '../screens/Report'
import History from '../screens/History'
import Subscription from '../screens/Subscription'

const Tab = createBottomTabNavigator();

export default function MainMenu() {
    return (
        <Tab.Navigator>
            <Tab.Screen 
           name="Home" component={Home}  options={{
            title: 'Home',
            tabBarIcon: ({size,focused,color}) => {
              return (
                <Entypo name="home" size={24} color="black" />
              );
            },
          }} />

            <Tab.Screen 
                name="Search" component={Search} options={{
                title: 'Search',
                tabBarIcon: ({size,focused,color}) => {
                return (
                    <FontAwesome name="search" size={24} color="black" />
                );
                },
                }} 
            />

            <Tab.Screen
                name="Report" component={Report} options={{
                title: 'Report',
                tabBarIcon: ({size,focused,color}) => {
                return (
                    <MaterialIcons name="report" size={24} color="black" />
                );
                },
                }}
            /> 

            <Tab.Screen 
             name="History" component={History} options={{
            title: 'History',
            tabBarIcon: ({size,focused,color}) => {
              return (
                <FontAwesome name="history" size={24} color="black" />
              );
            },
          }} />

        {/* <Tab.Screen 
             name="Subscription" component={Subscription} options={{
            title: 'Subscription',
            tabBarIcon: ({size,focused,color}) => {
              return (
                <FontAwesome name="history" size={24} color="black" />
              );
            },
          }} /> */}

            <Tab.Screen
             name="Account" component={Account} options={{
            title: 'My Account',
            tabBarIcon: ({size,focused,color}) => {
              return (
                <MaterialCommunityIcons name="account" size={24} color="black" />              );
            },
          }} />
      </Tab.Navigator>
    )
}
