import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions,Image,ActivityIndicator, ImageBackground, Button, TouchableOpacity, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import firebase from 'firebase'
import database from '../config/firebase'
 import CardSubs from '../components/CardSubs'
import { getUserLocationSearch, getWeather, getAllSubscribed } from '../store/actions/userActions'
import publicIP from 'react-native-public-ip'
import { Fontisto } from '@expo/vector-icons'; 
import axios from 'axios'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get("window").height;

export default function Home({navigation}) {
    const dispatch = useDispatch();
    const [data, setData] = useState('');
    const location = useSelector(state => state.usersReducer.location);
    const weather = useSelector(state => state.usersReducer.weather);
    const [weatherIcon, setWeatherIcon] = useState('day-sunny')
    
    const subscribed = useSelector(state => state.usersReducer.subscribed);
    
    function onPress(){
        navigation.navigate("Login")
    }

    useEffect(() => {
        publicIP()
            .then(ip => {    
                console.log(ip);
                return axios({
                    method: 'get',
                    // url: `https://cors-anywhere.herokuapp.com/https://api.ip2location.com/v2/?package=WS24&ip=${ip}&format=json&key=LYDJRXN1GG`
                    url: `https://api.ip2location.com/v2/?package=WS24&ip=${ip}&format=json&key=ZBE8IKOPXI`
                })
            })
            .then(data => {
                console.log(data)
                dispatch(getUserLocationSearch(data.data.city_name));
            })
            .catch(error => {
                console.log(error);
                // 'Unable to get IP address.'
            });
    }, [])

    useEffect(() => {
        dispatch(getAllSubscribed());
    }, []);

    useEffect(() => {
        // console.log('masuk use effect hah', location)
        if (location.length > 0) {
            // console.log(location, 'masuk kok')
            dispatch(getWeather(location[0].city));
            database.ref(`Location/${location[0].id}`).orderByKey().on('value',snapshoot => {
                setData(snapshoot.val())  
            })
        }
    }, [location]);

    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        if (location.length > 0) {
            database.ref(`Location/${location[0].id}`).orderByKey().on('value',snapshoot => {
                setData(snapshoot.val())
            })
        }
    }, [])

    useEffect(() => {
        if (weather.weather) {
            if (weather.weather[0].main === 'Rain') {
                setWeatherIcon('rain')
            } else if (weather.weather[0].main === 'Clouds') {
                setWeatherIcon('cloudy')
            } else if (weather.weather[0].main === 'Sunny') {
                setWeatherIcon('day-sunny')
            } else if (weather.weather[0].main === 'Thunderstorm') {
                setWeatherIcon('lightning')
            } else if (weather.weather[0].main === 'Haze') {
                setWeatherIcon('day-haze')
            } else {
                setWeatherIcon('day-haze')
            }
        }
    }, [weather.weather])

    useEffect(() => {
        if(data.waterLevel >= 50){
            navigation.navigate("AlertDanger")
        }
    },[data.waterLevel])

    return (
        <>
            <View style={ styles.container }>
                {/* <TouchableOpacity style={{ borderRadius:25 }}> */}
                {/* <Button
                    onPress={() => onPress()}
                    title="Login"
                    color=""
                    accessibilityLabel="Learn more about this purple button"
                /> */}
                {/* </TouchableOpacity> */}
                {/* <Text>{JSON.stringify(location)}</Text> */}
                {/* <Text>{JSON.stringify(weather)}</Text> */}
                {location.length > 0 && weather.main ? (<ImageBackground source={weather.weather[0].main === 'Haze' ? require('../../assets/haze.png') : (weather.weather[0].main === 'Sunny' ? require('../../assets/sunny.png') : require('../../assets/rain.png'))} style={{ width: '100%', height: '100%', flex: 1 }}>
                    <View style={ styles.pageContainer }>
                        <View style={ styles.constraints }>
                            <Text style={{ color: 'white', fontSize: 54, fontWeight: '700', marginBottom: -10, textAlign: 'right' }}>{ weather.main.temp }°C</Text>
                            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: 8 }}>
                                <Text style={{ color: 'white', fontSize: 32, fontWeight: '500', textAlign: 'right', marginRight: 10 }}>{ weather.weather[0].main }</Text>
                                <Fontisto style={{ alignSelf: 'flex-end' }} name={weatherIcon} size={34} color="white"/>
                            </View>
                            <Text style={{ color: 'white', fontSize: 42, fontWeight: '600', textAlign: 'right', marginTop: 10 }}>{ location[0].name }</Text>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: '400', textAlign: 'right' }}>{ location[0].area }, Indonesia</Text>
                        </View>
                        <View style={[styles.waterContainer, { marginTop: 35 }]}>
                            {/* <Text>Water Level from Firebase</Text> */}
                            {/* <Text>{ data.name }</Text> */}
                            <View style={{ paddingLeft: windowWidth / 15, paddingRight: windowWidth / 15, paddingTop: 10 }}>
                                <Pressable style={{ alignItems: 'center', marginBottom: 12 }}>
                                    {/* <View style={{ width: 50, height: 3, borderStyle: 'solid', borderRadius: 100, backgroundColor: 'rgb(28, 28, 30)' }}></View> */}
                                </Pressable>
                                <Text style={{ color: 'rgb(28, 28, 30)', fontSize: 28, fontWeight: '600', marginBottom: 10 }}>Statistics</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View>
                                        <Text style={{ color: 'rgb(99, 99, 102)', fontSize: 14, fontWeight: '600' }}>WATER LEVEL</Text>
                                        <Text style={{ color: 'rgb(28, 28, 30)', fontSize: 24, fontWeight: '500' }}>{ data.waterLevel ? data.waterLevel : 8.7 } cm</Text>
                                    </View>
                                    <View style={{ alignItems: 'flex-end' }}>
                                        <Text style={{ color: 'rgb(99, 99, 102)', fontSize: 14, fontWeight: '600' }}>STATUS</Text>
                                        {data.waterLevel > 50 ? <Text style={{ color: '#FF6363', fontSize: 22, fontWeight: '600' }}>DANGER</Text> : (data.waterLevel > 5 ? <Text style={{ color: '#FAB86A', fontSize: 20, fontWeight: '600' }}>WARNING</Text> : <Text style={{ color: '#5CC55A', fontSize: 20, fontWeight: '600' }}>SAFE</Text>)}
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* <Text> dibawah ini data subscription</Text> */}
                        {/* {
                            subscribed.map((location) => {
                                return <CardSubs location={ location.id }  key={ location.id } /> 
                            }) 
                                
                        } */}
                    </View>
                </ImageBackground>
                ) : (
                <View>
                    <ActivityIndicator size="small"/>
                </View>
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // paddingTop: windowHeight * 1 / 10,
    },
    pageContainer: {
        // flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'flex-start',
        paddingTop: windowHeight * 1 / 2.2,
    },
    constraints: {
        marginRight: windowWidth / 15,
        marginLeft: windowWidth / 15
    },
    waterContainer: {
        backgroundColor: 'white',
        borderRadius: 30,
        height: windowHeight / 3
    },
    containerRounded: {
        backgroundColor: 'gray',
        borderRadius: 15,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20
    },
    levContainer: {
        backgroundColor: '#EAEAEA'
    }
})