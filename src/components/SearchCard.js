import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Pressable, Alert  } from 'react-native'
import { SearchBar, Card, Image, CardItem} from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from 'react-redux'
import  { addToSubscribed } from '../store/actions/userActions'
import { setSearch } from '../store/actions/dataActions'
import firebase from 'firebase'
import database from '../config/firebase'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;



export default function CardComponent( props) {
    //console.log('==========')
    //console.log(props.location.location,'propsy')
    //console.log(props.location.navigation,'props.location.city')
    const dispatch = useDispatch()
    const [wea, setWea] = useState('')
    const [data, setData] = useState('')
    console.log(props.location.location, 'masuk card componeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeent')
    const token = useSelector(state => state.usersReducer.token)

    useEffect(() => {
        // console.log('masuk use effect hah', location)
        // if (location.length > 0) {
            // console.log(location, 'masuk kok')
        if (token) {
            fetch(`http://192.168.0.27:3000/weather/${props.location.location.city}`, {
                method: 'GET',
                headers: {
                    access_token: token
                },
                    redirect: 'follow'
            })
            .then((res) => res.json())
            .then(data => {
                console.log(data, 'INI WEATHERRRRRRRRR CCCCC');
                const newData = JSON.parse(JSON.stringify(data));
                console.log(newData.main, "NEW")
                newData.main.temp = Math.round((Number(newData.main.temp) - 273.15) * 10) / 10;
                setWea(newData)
            })
            .catch((err) => {
                console.log(err);
            });
        }

        database.ref(`Location/${props.location.location.id}`).orderByKey().on('value',snapshoot => {
            setData(snapshoot.val())  
        })
        // }
    }, []);

    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        // if (location.length > 0) {
            database.ref(`Location/${props.location.location.id}`).orderByKey().on('value',snapshoot => {
                setData(snapshoot.val())
            })
        // }
    }, [])

    function subscribe () {
        console.log('Subscribe!')
        dispatch(addToSubscribed(props.location.location.id))
    }

    function goToHistory () {
        //alert(props.location.location.id)
        let newArr = []
        dispatch(setSearch(newArr))
        props.location.navigation.navigate('History', { id : props.location.location.id});
    }


    if (!props.location) return <></>
    if (!wea.main) return <Text>Loading...</Text>
    return (
        // <>
        //     <View style={ styles.infoContainer }>
        //         <View style={ styles.cityContainer }>
        //             <View>
        //                 <Pressable onPress={() => goToHistory()}>
        //                     <Text style={ styles.city }> {props.location.location.city} </Text>
        //                     <Text style={ styles.city }> {props.location.location.name} </Text>                       
        //                 </Pressable>
        //             </View>                    
        //             <View style={ styles.pinContainer }>
        //                 <Pressable style={ styles.pin } onPress={ () => subscribe() }>
        //                     <AntDesign name='pushpino' size={ 32 } color='#686868' />
        //                 </Pressable>
        //             </View>
        //         </View>
        //         <View style={ styles.waterLevel }>
        //             <Text style={ styles.value }>{data.waterLevel}</Text>
        //             <View style={ styles.unitContainer }>
        //                 <Text style={ styles.unit }> cm</Text>
        //             </View>
        //         </View>
        //         <View style={ styles.statusContainer }>
        //             {data.waterLevel > 50 ? <Text style={{ color: '#FF6363', fontSize: 22, fontWeight: '600' }}>DANGER</Text> : (data.waterLevel > 5 ? <Text style={{ color: '#FAB86A', fontSize: 20, fontWeight: '600' }}>WARNING</Text> : <Text style={{ color: '#5CC55A', fontSize: 20, fontWeight: '600' }}>SAFE</Text>)}
        //             {/* <Text style={ styles.status }>DANGER</Text> */}
        //         </View>
        //         <View style={ styles.weatherContainer }>
        //             <Text style={ styles.weather }>{ wea.weather[0].main }</Text>
        //         </View>
        //         <View style={ styles.temperatureContainer }>
        //             <Text style={ styles.tempValue }>{ wea.main.temp }</Text>
        //             <Text style={ styles.degree }>o</Text>
        //         </View>
        //     </View>
        // </>
        // <>
            <View style={ styles.containerRounded }>
                <Pressable style={[styles.pinContainer, { position: 'absolute', right: 19, top: 19, zIndex: 12 }]} onPress={ () => subscribe() }>
                    {/* <View style={ styles.pinContainer }> */}
                        <AntDesign name='pushpino' size={ 26 } color='#686868' />
                    {/* </View> */}
                </Pressable>
                <View>
                    <Pressable style={{ width: 245 }} onPress={() => goToHistory()}>
                        <Text style={[styles.darkGray, { fontSize: 24, fontWeight: '500' }]}>{props.location.location.name}</Text>                      
                        <Text style={[styles.mediumGray, { fontSize: 16, marginBottom: 5 }]}>{props.location.location.city}</Text>
                    </Pressable>
                </View>                    
                <Text style={[styles.weather, { color: 'rgb(174, 174, 178)' }]}>{ wea.weather[0].main }</Text>
                <Text style={[styles.mediumGray, { fontSize: 26, position: 'absolute', right: 19, top: 70 }]}>{data.waterLevel} cm</Text>
                <View style={ styles.row }>
                    <Text style={[styles.mediumGray, { fontSize: 22, fontWeight: '500' }]}>{ wea.main.temp }°C</Text>
                    {data.waterLevel > 50 ? <Text style={{ color: '#FF6363', fontSize: 22, fontWeight: '600' }}>DANGER</Text> : (data.waterLevel > 5 ? <Text style={{ color: '#FAB86A', fontSize: 20, fontWeight: '600' }}>WARNING</Text> : <Text style={{ color: '#5CC55A', fontSize: 20, fontWeight: '600' }}>SAFE</Text>)}
                </View>
            </View>
        // </>
        // <>
        // <Text>
        //     {
        //         JSON.stringify(wea)
        //     }
        // </Text>
        //  <Text>
        //  {
        //      JSON.stringify(data)
        //  }
        // </Text>
        // </>
    )
}

const styles = StyleSheet.create({
    containerRounded: {
        backgroundColor: 'whitesmoke',
        borderRadius: 15,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 15
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    infoContainer: {
        backgroundColor: 'whitesmoke',
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
        // alignItems: 'flex-end'
        // backgroundColor: 'blue'
    },
    pin: {
        alignSelf: 'flex-end'
    },
    darkGray: {
        color: 'rgb(58, 58, 60)'
    },
    lightGray: {
        color: 'rgb(174, 174, 178)'
    },
    mediumGray: {
        color: '#858484'
    },
    evenDarkerGray: {
        color: 'rgb(28, 28, 30)'
    }
})