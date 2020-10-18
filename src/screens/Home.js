import React, {useEffect, useState} from 'react'
import { View, TouchableOpacity,Button,Text, Pressable } from 'react-native'
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

            // if (!firebase.apps.length) {
            //     firebase.initializeApp(firebaseConfig);
            //  }
            //  if(location[0].id){
            //      database.ref(`Location/${location[0].id}`).orderByKey().on('value',snapshoot =>{
            //      // console.log(snapshoot.val())
            //      setData(snapshoot.val())  
            //      })
            //  }
            
        },[])
    return (
        <View>
             <View style={{marginTop:20}}>
                
                {/* {location[0].id &&
                 } */}
                
                <CardComponent/>
                 <View>
                 <Text> Location Firebase: {data.name}  </Text>
                 <Text> waterLevel: {data.waterLevel}  </Text>
                 </View>
                <View>
                <Pressable onPress={() => onPress()} >
                    <Text >Login</Text>
                </Pressable>
            </View>
            </View>
        </View>
    )
}
