import React from 'react'
import {useSelector} from 'react-redux'
import { StyleSheet, View, Text, Pressable, Dimensions } from 'react-native'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function AlertDanger({navigation}) {
    let waterLevel = useSelector(state => state.waterLevel)
    function AlertDanger(){
        navigation.navigate("Home")
    }
    return (
        <View style={{height:"100%", backgroundColor:"#DF6F6F"}}>
             <View style={ styles.danger }>
                <Pressable style={ styles.button }>
                    <Text style={ styles.buttonTextRed }>Danger</Text>
                </Pressable>
                </View>
            <View style={ styles.subContainerCircle }>
                <Pressable style={ styles.button }>
                    <Text style={ styles.buttonTextRed }>{waterLevel} cm</Text>
                </Pressable>
                </View>

            <View style={ styles.subContainer }>
                <Pressable onPress={() => AlertDanger()} style={ styles.button }>
                    <Text style={ styles.buttonText }>to home</Text>
                </Pressable>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    subContainer: {
        marginTop: windowWidth * 2 / 10,
        alignSelf: 'center',
        width: windowWidth * 8.5 / 10,
    },
    subContainerCircle: {
        backgroundColor: 'white',
        marginTop: windowWidth * 2 / 10,
        height:windowHeight * 1/10,
        alignSelf: 'center',
        width: windowWidth * 5 / 10,
        borderRadius: 50
    },
    danger:{
        backgroundColor: 'white',
        marginTop: windowWidth * 5 / 10,
        alignSelf: 'center',
        width: windowWidth * 5 / 10,
        borderRadius: 50
    },
    button: {
        width: windowWidth * 8.5 / 10,
        marginTop: '2%',
        padding: '3%',
        borderRadius: 15
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 18
    },
    buttonTextRed: {
        marginStart: windowHeight * 0.8 / 10,
        color: '#DF6F6F',
        fontWeight: 'bold',
        fontSize: 18
    }
  });


