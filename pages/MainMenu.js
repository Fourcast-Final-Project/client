import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import Search from '../components/Search'
import Account from '../components/Account'
import Home from '../components/Home'
import Report from '../components/Report'
import History from '../components/History'

const Tab = createBottomTabNavigator();

export default function MainMenu() {
    return (
        <Tab.Navigator>
            <Tab.Screen 
            screenOptions={{
            headerShown: false
          }}
           name="Home" component={Home}  options={{
            title: 'Home',
            tabBarIcon: ({size,focused,color}) => {
              return (
                <Entypo name="home" size={24} color="black" />
              );
            },
          }} />

            <Tab.Screen 
                screenOptions={{
                headerShown: false
                }} 
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
                screenOptions={{
                    headerShown: false
                }} 
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
            screenOptions={{
                    headerShown: false
                }} 
             name="History" component={History} options={{
            title: 'History',
            tabBarIcon: ({size,focused,color}) => {
              return (
                <FontAwesome name="history" size={24} color="black" />
              );
            },
          }} />
            <Tab.Screen
            screenOptions={{
                headerShown: false
            }} 
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
