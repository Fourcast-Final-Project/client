import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, FontAwesome, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import Search from '../screens/Search'
import Account from '../screens/Account'
import Home from '../screens/Home'
import Report from '../screens/Report'
import Subscription from '../screens/Subscription'
import ReportHistory from '../screens/ReportHistory'

const Tab = createBottomTabNavigator();

export default function MainMenu() {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Home" component={Home}  options={{
                    title: () => {return null},
                    tabBarIcon: ({size,focused,color}) => {
                        return (
                            <Ionicons name="ios-home" size={24} color="black" />
                        );
                    },
                }} 
            />

            <Tab.Screen 
                name="Search" component={Search} options={{
                    title: () => {return null},
                    tabBarIcon: ({size,focused,color}) => {
                        return (
                            <Ionicons name="ios-search" size={24} color="black" />
                        );
                    },
                }} 
            />

            <Tab.Screen
                name="Report" component={Report} options={{
                    title: () => {return null},
                    tabBarIcon: ({size,focused,color}) => {
                        return (
                            <MaterialIcons name="report" size={24} color="black" />
                        );
                    },
                }}
            /> 

            <Tab.Screen 
                name="Report History" component={ReportHistory} options={{
                    title: () => {return null},
                    tabBarIcon: ({size,focused,color}) => {
                        return (
                        <Ionicons name="ios-folder" size={24} color="black" />
                        );
                    },
                }} 
            />

{/* //              name="History" component={History} options={{
//             title: 'History',
//             tabBarIcon: ({size,focused,color}) => {
//               return (
//                 <FontAwesome name="history" size={24} color="black" />
//               );
//             },
//           }} /> */}

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
            title: () => {return null},
            tabBarIcon: ({size,focused,color}) => {
              return (
                <MaterialCommunityIcons name="account" size={24} color="black" />              );
            },
          }} />
      </Tab.Navigator>
    )
}
