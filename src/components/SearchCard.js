import React from 'react'
import { View, Text, StyleSheet, Dimensions, Pressable, Alert  } from 'react-native'
import { SearchBar, Card, Image, CardItem} from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons'; 
import { useDispatch } from 'react-redux'
import  { addToSubscribed } from '../store/actions/userActions'
import { setSearch } from '../store/actions/dataActions'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;



export default function CardComponent( props) {
    //console.log('==========')
    //console.log(props.location.location,'propsy')
    //console.log(props.location.navigation,'props.location.city')
    const dispatch = useDispatch()

    function subscribe () {
        dispatch(addToSubscribed(props.location.location.id))
    }

    function goToHistory () {
        //alert(props.location.location.id)
        let newArr = []
        dispatch(setSearch(newArr))
        props.location.navigation.navigate('History', { id : props.location.location.id});
    }


    if (!props.location) return <></>
    return (
        <>
            <View style={ styles.infoContainer }>
                <View style={ styles.cityContainer }>
                    <View>
                        <Pressable onPress={() => goToHistory()}>
                            <Text style={ styles.city }> {props.location.location.city} </Text>
                            <Text style={ styles.city }> {props.location.location.name} </Text>                       
                        </Pressable>
                    </View>                    
                    <View style={ styles.pinContainer }>
                        <Pressable style={ styles.pin } onPress={ () => subscribe() }>
                            <AntDesign name='pushpino' size={ 32 } color='#686868' />
                        </Pressable>
                    </View>
                </View>
                <View style={ styles.waterLevel }>
                    <Text style={ styles.value }>{props.location.waterLevel}</Text>
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
    pinContainer: {
        alignItems: 'flex-end'
    },
    pin: {
        alignSelf: 'flex-end'
    }
})