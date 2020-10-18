import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Button, Text, StyleSheet, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CardComponent from '../components/CardComponent'
import firebase from 'firebase'
import database from '../config/firebase'
import { getUserLocation, getWeather, setWeather } from '../store/actions/userActions'

const windowWidth = Dimensions.get('window').width;

export default function Home({navigation}) {
    const dispatch = useDispatch();
    const [data, setData] = useState('');
    const location = useSelector(state => state.usersReducer.location);
    const weather = useSelector(state => state.usersReducer.weather);
    
    function onPress(){
        navigation.navigate("Login")
        
    }

    // useEffect(() => {
    //     if (data) {
    //         dispatch(getUserLocation("jakarta"));
    //         dispatch(getWeather(data.name));
    //         // console.log(data.name, 'HAHAH INI DATA')
    //     }
    // }, [data])

    // useEffect(() => {
    //     if (!firebase.apps.length) {
    //         firebase.initializeApp(firebaseConfig);
    //     }
    //     if (location.length > 0) {
    //         database.ref(`Location/${location[0].id}`).orderByKey().on('value',snapshoot => {
    //             setData(snapshoot.val())  
    //         })
    //     }
    // }, [location])
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
                {/* {location.length > 0 && weather.main &&
                    <View style={ styles.containerRounded }>
                        <Text>{ data.name }, Indonesia</Text>
                        <Text>{ weather.main.temp }</Text>
                    </View>
                } */}
                <View style={ styles.containerRounded }>
                        <Text>Jakarta, Indonesia</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>26</Text>
                        <Text>Sunny</Text>
                    </View>
                </View>
                {/* <Text>waterLevel: { data.waterLevel }</Text> */}
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