import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { SearchBar, Card, Image, CardItem} from 'react-native-elements';

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
                    <Text style={{ backgroundColor: 'pink', width: 40, height: 15, position: 'absolute', right: 0, top: -20 }}>-</Text>
                </Pressable>
            }
            {props.location.waterLevel <= 10 && <View style={[styles.green, { width: 47, height: 17, borderStyle: 'solid', borderRadius: 100, position: 'absolute', right: 19, top: 19 }]}></View>}
            {(props.location.waterLevel < 20) && (props.location.waterLevel > 10) && <View style={[styles.yellow, { width: 50, height: 20, borderStyle: 'solid', borderRadius: 100, position: 'absolute', right: 19, top: 19 }]}></View>}
            {props.location.waterLevel > 20 && <View style={[styles.red, { width: 47, height: 17, borderStyle: 'solid', borderRadius: 100, position: 'absolute', right: 19, top: 19 }]}></View>}
            <Text style={[styles.darkGray, { fontSize: 28, fontWeight: '500' }]}>{ props.location.name }</Text>
            <Text style={ styles.lightGray }>{ props.location.name }</Text>
            <View style={ styles.row }>
                <Text>{ wea.main.temp } K</Text> 
                {/* GATAU INI JADI GA */}
                <Text style={[styles.mediumGray, { fontSize: 30, position: 'absolute', right: 0, bottom: 0 }]}>{ props.location.waterLevel }<Text style={[styles.lightGray, { fontSize: 22 }]}> cm</Text></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerRounded: {
        backgroundColor: '#E5E5E5',
        borderRadius: 15,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
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