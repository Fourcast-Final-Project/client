import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { Entypo, FontAwesome, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import { getAllSubscribed, getWeather, removeFromSubscribed, logout } from '../store/actions/userActions';
import CardComponent from '../components/CardComponent';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Account({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.usersReducer.user);
    const location = useSelector(state => state.usersReducer.location);
    const subscribed = useSelector(state => state.usersReducer.subscribed);  
    const [edit, setEdit] = useState(false);
    // const waterLevel = useSelector(state => state.usersReducer.waterLevel)
    // console.log(waterLevel,"waterLevel")


    useEffect(() => {
        dispatch(getAllSubscribed());
    }, []);


    const toggleEdit = () => {
        setEdit(!edit);
    }

    const userLogout = () => {
        dispatch(logout());
        navigation.navigate('Login')
    }

    return (
        <View style={ styles.container }>
            <View>
                <Text style={[styles.evenDarkerGray, { fontSize: 28, fontWeight: '600', marginBottom: 10 }]}>Profile</Text>
                <Text style={[styles.darkGray, { fontSize: 24, marginBottom: 2 }]}>{ user.email }</Text>
                <Text style={[styles.lightGray, { fontSize: 16 }]}>currently at <Text style={[styles.lightGray, { fontWeight: '500' }]}>{ location[0].name }</Text></Text>
            </View>
            <Pressable 
                style={{ marginTop: 5 }}
                onPress={ userLogout }>
                <Text style={{ fontSize: 16 }}>Logout</Text> 
            </Pressable>
            <View style={{ marginTop: 30 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={[styles.evenDarkerGray, { fontSize: 28, fontWeight: '600', marginBottom: 10 }]}>Subscribed</Text>
                    <Pressable onPress={ toggleEdit }>
                        <Text style={{ color: 'rgb(142, 142, 147)', fontSize: 16, fontWeight: '600', marginTop: 10 }}>EDIT</Text>
                        {/** ini buat nge delete */}
                    </Pressable>
                </View>
                {/* <Text>{ JSON.stringify(subscribed) }</Text> */}
                {
                    subscribed.map(location => {
                        return <CardComponent key={ location.id } id={ location.id } location={ location.Location } getWeather={ getWeather } edit={ edit } removeFromSubscribed={ removeFromSubscribed }/>
                    })
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        marginTop: 50,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 50,
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        // alignItems: 'center',
        // justifyContent: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 50,
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