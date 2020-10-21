import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Pressable, ScrollView, SafeAreaView } from 'react-native'
import { SearchBar, Card, Image, CardItem} from 'react-native-elements';
// import { ScrollView } from 'react-native-gesture-handler';

export default function CardComponent(props) {
    const dispatch = useDispatch();
    const wea = useSelector(state => state.usersReducer.weather);

    useEffect(() => {
        dispatch(props.getWeather(props.location.name));
    }, []);

    const deleteFromSubscribed = () => {
        dispatch(props.removeFromSubscribed(props.id));
    }

    return (
        <View style={ styles.containerRounded }>
            {props.edit === true && 
                <Pressable onPress={ deleteFromSubscribed }>
                    <View style={{ backgroundColor: 'rgb(174, 174, 178)', width: 40, height: 15, position: 'absolute', right: 0, top: -20, borderRadius: 100 }}>
                        <View style={{ backgroundColor: 'rgb(72, 72, 74)', width: 20, height: 5, position: 'absolute', right: 9.5, top: 5, borderRadius: 100 }}></View>
                    </View>
                </Pressable>
            }
            {/* {props.location.waterLevel <= 10 && <View style={[styles.green, { width: 47, height: 17, borderStyle: 'solid', borderRadius: 100, position: 'absolute', right: 19, top: 19 }]}></View>}
            {(props.location.waterLevel < 20) && (props.location.waterLevel > 10) && <View style={[styles.yellow, { width: 50, height: 20, borderStyle: 'solid', borderRadius: 100, position: 'absolute', right: 19, top: 19 }]}></View>}
            {props.location.waterLevel > 20 && <View style={[styles.red, { width: 47, height: 17, borderStyle: 'solid', borderRadius: 100, position: 'absolute', right: 19, top: 19 }]}></View>} */}
            <Text style={[styles.mediumGray, { fontSize: 26, position: 'absolute', right: 19, top: 38 }]}>{ props.location.waterLevel }<Text style={[styles.lightGray, { fontSize: 22 }]}> cm</Text></Text>
            <Text style={[styles.darkGray, { fontSize: 24, fontWeight: '500' }]}>{ props.location.name }</Text>
            <Text style={[styles.lightGray, { fontSize: 16, marginBottom: 5 }]}>{ props.location.area }</Text>
            <View style={ styles.row }>
            <Text style={[styles.mediumGray, { fontSize: 22, fontWeight: '500' }]}>{ wea.main.temp }°C</Text>
            {props.location.waterLevel > 50 ? <Text style={{ color: '#FF6363', fontSize: 22, fontWeight: '600' }}>DANGER</Text> : (props.location.waterLevel > 5 ? <Text style={{ color: '#FAB86A', fontSize: 20, fontWeight: '600' }}>WARNING</Text> : <Text style={{ color: '#5CC55A', fontSize: 20, fontWeight: '600' }}>SAFE</Text>)}
            </View>
        </View>
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
    },
    green: {
        backgroundColor: '#5CC55A'
    },
    red: {
        backgroundColor: '#FF6363'
    },
    yellow: {
        backgroundColor: '#FAB86A'
    }
})