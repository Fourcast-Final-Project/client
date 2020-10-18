import React, {useEffect, useState} from 'react'
import { View, TouchableOpacity,Button,Text } from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import CardComponent from '../components/CardComponent'
import firebase from 'firebase'
import database from '../config/firebase'
import {getUserLocation} from '../store/actions/userActions'

export default function Home({navigation}) {
    const [data, setData] = useState('')
    const location = useSelector(state => state.usersReducer.location)
    const dispatch = useDispatch()

    function onPress(){
        navigation.navigate("Login")
        
    }

        useEffect(()=>{
            dispatch(getUserLocation("jakarta"))

            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
             }

            database.ref(`Location/${location[0].id}`).orderByKey().on('value',snapshoot =>{
            // console.log(snapshoot.val())
            setData(snapshoot.val())  
            })
            
        },[])
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
                <Text> Location Firebase: {data.name}  </Text>
                <Text> waterLevel: {data.waterLevel}  </Text>

                <CardComponent/>
            </View>
        </View>
    )
}
