import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider} from 'react-redux'
import store from './src/store'

import MainMenu from './src/pages/MainMenu'
import Register from './src/pages/Register'
import Login from './src/pages/Login'
import CameraScreen from './src/screens/CameraScreen'
import History from './src/screens/History'
import Report from './src/pages/MainMenu'


const Stack = createStackNavigator()


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator 
            screenOptions={{
            headerShown: false
            }} 
          >
          <Stack.Screen
            name= "Login"
            component={Login}
          />
          <Stack.Screen
            name= "Register"
            component={Register}
            options={{title: "Register"}}
          />
          <Stack.Screen
            name= "History"
            component={History}
            options={{title: "History"}}
          />   
          <Stack.Screen
            name= "MainMenu"
            component={MainMenu}
            options={{title: "MainMenu"}}
          />     

          <Stack.Screen
            name= "CameraScreen"
            component={CameraScreen}
            options={{title: "CameraScreen"}}
          />
          
           

          {/* <Stack.Screen
            name= "Report"
            component={Report}
            options={{title: "Report"}}
          />      */}

               
        </Stack.Navigator>  
      </NavigationContainer>
    </Provider>
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
