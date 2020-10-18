import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';

export default function Account() {
    const user = useSelector(state => state.usersReducer.user);
    const location = useSelector(state => state.usersReducer.location);

    return (
        <View style={ styles.pageContainer }>
            <View>
                <Text style={{ fontSize: 32, fontWeight: 'bold', }}>Profile</Text>
                <Text style={{ fontSize: 24, marginBottom: 2 }}>{ user.email }</Text>
                <Text>Currently at <Text style={{ fontWeight: '500' }}>{ location[0].name }</Text></Text>
            </View>
            <View style={{ marginTop: 30 }}>
                <Text style={{ fontSize: 32, fontWeight: 'bold', }}>Subscribed</Text>
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
    }
})