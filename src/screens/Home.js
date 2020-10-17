import React from 'react'
import { View, TouchableOpacity,Button } from 'react-native'

export default function Home({navigation}) {

    function onPress(){
    
        navigation.navigate("Login")

        
    }


    return (
        <View>
             <View style={{marginTop:20}}>
                <TouchableOpacity style={{borderRadius:25}}>
                <Button
                    onPress={() => onPress()}
                    title="Login"
                    color=""
                    accessibilityLabel="Learn more about this purple button"
                />
                </TouchableOpacity>
            </View>
        </View>
    )
}
