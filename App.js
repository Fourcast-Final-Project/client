import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainMenu from './pages/MainMenu'
import Register from './pages/Register'
import Login from './pages/Login'


const Stack = createStackNavigator()


export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator>

       <Stack.Screen
            name= "Login"
            component={Login}
            options={{title: "Login"}}
          />

       <Stack.Screen
            name= "Register"
            component={Register}
            options={{title: "Register"}}
          />
          <Stack.Screen
            name= "MainMenu"
            component={MainMenu}
            options={{title: "MainMenu"}}
          />
         

      </Stack.Navigator>
      
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
