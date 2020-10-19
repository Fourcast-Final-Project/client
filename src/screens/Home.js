import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CardComponent from '../components/CardComponent'
import firebase from 'firebase'
import database from '../config/firebase'
import { getUserLocation, getWeather, setWeather } from '../store/actions/userActions'
import publicIP from 'react-native-public-ip'
import axios from 'axios'
// import firebase from 'firebase'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Home({navigation}) {
    const dispatch = useDispatch();
    const [data, setData] = useState('');
    const location = useSelector(state => state.usersReducer.location);
    const weather = useSelector(state => state.usersReducer.weather);
    
    function onPress(){
        navigation.navigate("Login")
    }

    useEffect(() => {
        publicIP()
            .then(ip => {    
                console.log(ip);
                return axios({
                    method: 'get',
                    url: `https://cors-anywhere.herokuapp.com/https://api.ip2location.com/v2/?package=WS24&ip=${ip}&format=json&key=LYDJRXN1GG`
                })
            })
            .then(data => {
                console.log(data.data.city_name)
                dispatch(getUserLocation(data.data.city_name));
            })
            .catch(error => {
                console.log(error);
                // 'Unable to get IP address.'
            });
    }, [])

    useEffect(() => {
        if (location.length > 0) {
            console.log(location, 'masuk kok')
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
                {location.length > 0 && weather.main &&
                    <View style={ styles.containerRounded }>
                        <Text>{ location[0].area }, Indonesia</Text>
                        <Text>{ location[0].name }</Text>
                        <Text>{ weather.main.temp }</Text>
                        <Text>{ weather.weather[0].main }</Text>
                    </View>
                }
                {/* <View style={ styles.containerRounded }>
                        <Text>Jakarta, Indonesia</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>26</Text>
                        <Text>Sunny</Text>
                    </View>
                </View> */}
                {/* <CardComponent/> */}
                <View style={ styles.levContainer }>
                    <Text>Water Level</Text>
                    <View style ={{ flexDirection: 'row' }}>
                        <Text>{ data.waterLevel ? data.waterLevel : 8.7 }</Text>
                        <Text>cm</Text>
                    </View>
                    <View>
                        <Text>SAFE</Text>
                    </View>
                </View>
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