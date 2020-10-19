import React from 'react'
import { View, Text } from 'react-native'
import CameraComponent from '../components/CameraComponent'

export default function CameraScreen() {
    return (
        <View style={{flex: 1}}>
           <CameraComponent/>
        </View>
    )
}
