import React from 'react'
import {useSelector} from 'react-redux'
import { StyleSheet, View, Text, Pressable, Dimensions } from 'react-native'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function AlertDanger({navigation}) {
    const waterLevel = useSelector(state => state.usersReducer.waterLevel)
    console.log(waterLevel,"waterLevel")
    function AlertDanger(){
        navigation.navigate("Home")
    }
    return (
        <View style={[styles.container, {height:"100%", backgroundColor:"#DF6F6F"}]}>
            <Text style={{ color: 'white', fontWeight: '400', fontSize: 50, marginBottom: -10, marginTop: 80 }}>OH NO,</Text>
            <Text style={{ color: 'white', fontWeight: '800', fontSize: 60 }}>DANGER!</Text>
            <Text style={{ color: 'white', fontSize: 28, marginTop: 60 }}>CURRENT WATER LEVEL</Text>
            <Text style={{ color: 'white', fontWeight: '800', fontSize: 60 }}>{waterLevel} cm</Text>
            <View style={ styles.subContainer }>
                <Pressable onPress={() => AlertDanger()} style={ styles.button }>
                    <Text style={ styles.buttonText }>TO HOME</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#ffff',
        // alignItems: 'center',
        // justifyContent: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 50,
        paddingTop: windowHeight * 1 / 15,
    },
    subContainer: {
        marginTop: 20,
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
        // backgroundColor: '#63B3FD',
        // width: windowWidth * 8.5 / 10,
        marginTop: '2%',
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white'
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
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


