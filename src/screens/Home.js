import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions,Image,ActivityIndicator, Button, TouchableOpacity } from 'react-native'
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
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        if (location.length > 0) {
            database.ref(`Location/${location[0].id}`).orderByKey().on('value',snapshoot => {
                setData(snapshoot.val())
            })
        }
    }, [data])

    function onPressAlert(){
        navigation.navigate("AlertDanger")
    }

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
                {location.length > 0 && weather.main ? (
                    <View style={ styles.containerRounded }>
                        <Text>{ location[0].area }, Indonesia</Text>
                        <Text>{ location[0].name }</Text>
                        <Image 
                        style={{width: 100, height: 100}}
                        source={{uri: `http://openweathermap.org/img/w/${ weather.weather[0].icon }.png`}} />
                        <Text>{ weather.main.temp }</Text>
                        <Text>{ weather.weather[0].main }</Text>
                    </View>
                ) : (
                <View style={ styles.containerRounded }>
                    <ActivityIndicator size="large" color="#00ff00"/>
                </View>)
                }
                <View style={ styles.containerRounded }>
                        <Text>Jakarta, Indonesia</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>26</Text>
                        <Text>Sunny</Text>
                    </View>
                </View>
                {/* <CardComponent/> */}
                <View style={ styles.levContainer }>
                    <Text>Water Level from Firebase</Text>
                                       
                    <View>
                         <Text>{ data.name }</Text>
                    </View>
                    <View style ={{ flexDirection: 'row' }}>
                        
                        <Text>{ data.waterLevel ? data.waterLevel : 8.7 }</Text>
                        <Text>cm</Text>
                    </View> 
                    <View>
                        <Text>SAFE</Text>
                    </View>
                </View>
                <Text> dibawah ini data subscription</Text>

                <View style={{marginTop:20}}>
                <TouchableOpacity style={{borderRadius:25}}>
                <Button
                    onPress={() => onPressAlert()}
                    title="To Alert Danger"
                    color=""
                    accessibilityLabel="Learn more about this purple button"
                />
                </TouchableOpacity>

            </View>
            
                {
                        subscribed.map((location) => {
                            return <CardSubs location={ location.id }  key={ location.id } /> 
                        }) 
                        
                    }

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
        paddingTop: windowHeight * 1 / 10,
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