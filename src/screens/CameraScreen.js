import React from 'react'
import { View, Text } from 'react-native'
import CameraComponent from '../components/CameraComponent'

export default function CameraScreen({navigation}) {
    return (
        <View style={{flex: 1}}>
           <CameraComponent navigation={navigation}/>
        </View>
    )
}
