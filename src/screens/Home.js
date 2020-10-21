import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions,Image,ActivityIndicator, ImageBackground } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import firebase from 'firebase'
import database from '../config/firebase'
 import CardSubs from '../components/CardSubs'
import { getUserLocationSearch, getWeather, getAllSubscribed } from '../store/actions/userActions'
import publicIP from 'react-native-public-ip'
import axios from 'axios'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get("window").height;

export default function Home({navigation}) {
    const dispatch = useDispatch();
    const [data, setData] = useState('');
    const location = useSelector(state => state.usersReducer.location);
    const weather = useSelector(state => state.usersReducer.weather);
    
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
                    url: `https://api.ip2location.com/v2/?package=WS24&ip=${ip}&format=json&key=LYDJRXN1GG`
                })
            })
            .then(data => {
                console.log(data.data.city_name)
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
        if (location.length > 0) {
            //console.log(location, 'masuk kok')
            dispatch(getWeather(location[0].city));
            database.ref(`Location/${location[0].id}`).orderByKey().on('value',snapshoot => {
                setData(snapshoot.val())  
            })
        }
    }, [location]);

    useEffect(() => {
        // if (!firebase.apps.length) {
        //     firebase.initializeApp(firebaseConfig);
        // }
    }, [data])

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
                {location.length > 0 && weather.main ? (<ImageBackground source={weather.weather[0].main === 'Haze' ? require('../../assets/haze.png') : (weather.weather[0].main === 'Sunny' ? require('../../assets/sunny.png') : require('../../assets/rain.png'))} style={{ width: '100%', height: '100%', flex: 1 }}>
                    <View style={ styles.pageContainer }>
                        <View style={ styles.constraints }>
                            <Text style={{ color: 'white', fontSize: 54, fontWeight: '700', marginBottom: -10, textAlign: 'right' }}>{ weather.main.temp }°C</Text>
                            <Text style={{ color: 'white', fontSize: 32, fontWeight: '500', textAlign: 'right' }}>{ weather.weather[0].main }</Text>
                            <Text style={{ color: 'white', fontSize: 42, fontWeight: '600', textAlign: 'right', marginTop: 10 }}>{ location[0].name }</Text>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: '400', textAlign: 'right' }}>{ location[0].area }, Indonesia</Text>
                        </View>
                        <View style={ styles.waterContainer }>
                            {/* <Text>Water Level from Firebase</Text> */}
                            {/* <Text>{ data.name }</Text> */}
                            <Text>{ data.waterLevel ? data.waterLevel : 8.7 } cm</Text>
                            {data.waterLevel > 50 ? <Text>DANGER</Text> : (data.waterLevel > 5 ? <Text>WARNING</Text> : <Text>SAFE</Text>)}
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