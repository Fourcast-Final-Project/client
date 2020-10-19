import React, {useEffect, useState} from 'react'
import { View, TouchableOpacity,Button } from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import CardComponent from '../components/CardComponent'
import firebase from 'firebase'
import database from '../config/firebase'
import {getUserLocation} from '../store/actions/userActions'
import publicIP from 'react-native-public-ip'

export default function Home({navigation}) {
    const [data, setData] = useState('')
    const location = useSelector(state => state.usersReducer.location)
    const dispatch = useDispatch()

    function onPress(){
        navigation.navigate("Login")
        
    }

        useEffect(()=>{
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
        },[])
console.log(location, '<<<<<< location')
    return (
        <View>
             <View style={{marginTop:20}}>
                <TouchableOpacity style={{borderRadius:25}}>
                <Button
                    onPress={() => onPress()}
                    title="Login"
                    color=""
                    accessibilityLabel="Learn more about this purple button"
                />
                </TouchableOpacity>

                <CardComponent/>
            </View>
        </View>
    )
}
