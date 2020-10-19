import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Button, Text, StyleSheet, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CardComponent from '../components/CardComponent'
// import firebase from 'firebase'
import database from '../config/firebase'
import { getUserLocationSearch, getWeather, setWeather } from '../store/actions/userActions'
import publicIP from 'react-native-public-ip'
import axios from 'axios'

const windowWidth = Dimensions.get('window').width;
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
        if (location.length > 0) {
            console.log(location, 'masuk kok')
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
        <View style={ styles.pageContainer }>
             <View>
                {/* <TouchableOpacity style={{ borderRadius:25 }}> */}
                {/* <Button
                    onPress={() => onPress()}
                    title="Login"
                    color=""
                    accessibilityLabel="Learn more about this purple button"
                /> */}
                {/* </TouchableOpacity> */}
                {/* <Text>{JSON.stringify(location)}</Text> */}
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
                <Text>waterLevel: { data.waterLevel }</Text>
                {/* <CardComponent/> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        marginTop: 70,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 50,
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center'
    },
    containerRounded: {
        backgroundColor: 'gray',
        borderRadius: 15,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20
    }
})