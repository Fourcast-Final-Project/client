import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { SearchBar, Card, Image, CardItem} from 'react-native-elements';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


export default function CardComponent(props) {
    console.log(props, '<<<<<<<<<<<<<<<<<<<<<<<<')
    return (
        <>
            <View style={ styles.infoContainer }>
                <View style={ styles.cityContainer }>
                    <Text style={ styles.city }> {props.city.name} </Text>
                    <Text style={ styles.subscribe }>Subscribe</Text>
                </View>
                <View style={ styles.waterLevel }>
                    <View>
                        <Text style={ styles.value }> {props.city.waterLevel} </Text>
                    </View>
                    <View style={ styles.unitContainer }>
                        <Text style={ styles.unit }> cm</Text>
                    </View>
                </View>
                <View style={ styles.statusContainer }>
                    <Text style={ styles.status }>DANGER</Text>
                </View>
                <View style={ styles.weatherContainer }>
                    <Text style={ styles.weather }>Thunderstorm</Text>
                </View>
                <View style={ styles.temperatureContainer }>
                    <Text style={ styles.tempValue }>24</Text>
                    <Text style={ styles.degree }>o</Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        backgroundColor: '#EAEAEA',
        padding: '5%',
        width: windowWidth * 8.5 / 10,
        height: 320,
        borderRadius: 15
    },
    cityContainer: {
        alignSelf: 'flex-start',
        flexDirection: 'row'
    },
    city: {
        color: '#686868',
        fontWeight: 'bold',
        fontSize: 32
    },
    waterLevel: {
        flexDirection: 'row'
    },
    value: {
        fontSize: 70,
        color: '#F36162'
    },
    unit: {
        fontSize: 30,
        color: '#F36162'
    },
    unitContainer: {
        justifyContent: 'flex-end',
        paddingBottom: 10
    },
    statusContainer:{
        backgroundColor: '#F36162',
        borderRadius: 15,
        paddingLeft: '3%',
        paddingRight: '3%',
        width: windowWidth * 2.5 / 10,
        alignItems: 'center'
    },
    status: {
        alignSelf: 'center',
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700'
    },
    weatherContainer: {

    },
    weather: {
        color: '#858383',
        fontSize: 26
    },
    temperatureContainer: {
        flexDirection: 'row'
    },
    tempValue: {
        color: '#5F5F5F',
        fontSize: 75
    },
    degree: {
        color: '#5F5F5F',
        fontSize: 30
    },
    subscribe: {
        
    }
})