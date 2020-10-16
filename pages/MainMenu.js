import React from 'react'
import { View, Text, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../components/Search'
import Account from '../components/Account'
import Home from '../components/Home'
import Report from '../components/Report'
import History from '../components/History'

const Tab = createBottomTabNavigator();

export default function MainMenu() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}  options={{
            title: 'Home',
            tabBarIcon: ({size,focused,color}) => {
              return (
                <Image
                  style={{ width: size, height: size }}
                  source={require('../assets/home.png')}
                />
              );
            },
          }} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Report" component={Report} />
            <Tab.Screen name="History" component={History} />
            <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    )
}
