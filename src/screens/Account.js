import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { getAllSubscribed, getWeather, removeFromSubscribed } from '../store/actions/userActions';
import CardComponent from '../components/CardComponent';

export default function Account() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.usersReducer.user);
    const location = useSelector(state => state.usersReducer.location);
    const subscribed = useSelector(state => state.usersReducer.subscribed);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        dispatch(getAllSubscribed());
    }, []);


    const toggleEdit = () => {
        setEdit(true);
    }

    return (
        <View style={ styles.pageContainer }>
            <View>
                <Text style={[styles.evenDarkerGray, { fontSize: 32, fontWeight: 'bold', }]}>Profile</Text>
                <Text style={[styles.darkGray, { fontSize: 24, marginBottom: 2 }]}>{ user.email }</Text>
                <Text style={ styles.lightGray }>Currently at <Text style={[styles.lightGray, { fontWeight: '500' }]}>{ location[0].name }</Text></Text>
            </View>
            <View style={{ marginTop: 30 }}>
                <Text style={[styles.evenDarkerGray, { fontSize: 32, fontWeight: 'bold', marginBottom: 10 }]}>Subscribed</Text>
                <Pressable onPress={ toggleEdit }>
                    <Text>Edit</Text> 
                    {/** ini buat nge delete */}
                </Pressable>
                <Text>{ JSON.stringify(subscribed) }</Text>
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
    },
    darkGray: {
        color: '#616161'
    },
    lightGray: {
        color: '#B0B0B0'
    },
    mediumGray: {
        color: '#858484'
    },
    evenDarkerGray: {
        color: '#353535'
    }
})