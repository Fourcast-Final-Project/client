import React from 'react'
import { View, TouchableOpacity, Button } from 'react-native'

export default function History() {
    function onPress(){

    }
    return (
        <View>
           <View style={{marginTop:20}}>
                <TouchableOpacity style={{borderRadius:25}}>
                <Button
                    onPress={() => onPress()}
                    title="History"
                    color=""
                    accessibilityLabel="Learn more about this purple button"
                />
                </TouchableOpacity>
            </View>
        </View>
    )
}
