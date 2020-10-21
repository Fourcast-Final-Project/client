import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { SearchBar, Card, Image, CardItem} from 'react-native-elements';

export default function CardHistory(props) {
    const dispatch = useDispatch();

    

    return (
        <View style={ styles.containerRounded }>
            
            {props.location.waterLevel <= 10 && <View style={[styles.green, { width: 47, height: 17, borderStyle: 'solid', borderRadius: 100, position: 'absolute', right: 19, top: 19 }]}></View>}
            {(props.location.waterLevel < 20) && (props.location.waterLevel > 10) && <View style={[styles.yellow, { width: 50, height: 20, borderStyle: 'solid', borderRadius: 100, position: 'absolute', right: 19, top: 19 }]}></View>}
            {props.location.waterLevel > 20 && <View style={[styles.red, { width: 47, height: 17, borderStyle: 'solid', borderRadius: 100, position: 'absolute', right: 19, top: 19 }]}></View>}
            <Text style={[styles.darkGray, { fontSize: 24, fontWeight: '500', marginBottom: 5 }]}>{ props.location.Location.name }</Text>
            <Text style={[styles.lightGray, { fontSize: 18}]}>{ props.location.updatedAt.split("T")[0] } { props.location.updatedAt.split("T")[1].substring(0, 8) } </Text>
            <View style={ styles.row }>
                
                {/* GATAU INI JADI GA */}
                <Text style={[styles.mediumGray, { fontSize: 26, position: 'absolute', right: 0, bottom: -5 }]}>{ props.location.waterLevel }<Text style={[styles.lightGray, { fontSize: 22 }]}> cm</Text></Text>
                
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
        paddingRight: 20,
        marginBottom: 10
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