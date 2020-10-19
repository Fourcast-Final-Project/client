// <<<<<<< search-page
// import React from 'react'
// import { View, Text, StyleSheet, Dimensions } from 'react-native'
// import { SearchBar, Card, Image, CardItem} from 'react-native-elements';

// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;


// export default function CardComponent(props) {
//     console.log(props)
//     if (!props.city) return <View><Text>Please Wait...</Text></View>
//     return (
//         <>
//             <View style={ styles.infoContainer }>
//                 <View style={ styles.cityContainer }>
//                     <Text style={ styles.city }> {props.city.name} </Text>
//                     <Text style={ styles.subscribe }>Subscribe</Text>
//                 </View>
//                 <View style={ styles.waterLevel }>
//                     <View>
//                         <Text style={ styles.value }> {props.city.waterLevel} </Text>
//                     </View>
//                     <View style={ styles.unitContainer }>
//                         <Text style={ styles.unit }> cm</Text>
//                     </View>
//                 </View>
//                 <View style={ styles.statusContainer }>
//                     <Text style={ styles.status }>DANGER</Text>
//                 </View>
//                 <View style={ styles.weatherContainer }>
//                     <Text style={ styles.weather }>Thunderstorm</Text>
//                 </View>
//                 <View style={ styles.temperatureContainer }>
//                     <Text style={ styles.tempValue }>24</Text>
//                     <Text style={ styles.degree }>o</Text>
//                 </View>
//             </View>
//         </>
// =======
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
// <<<<<<< search-page
//     infoContainer: {
//         backgroundColor: '#EAEAEA',
//         padding: '5%',
//         width: windowWidth * 8.5 / 10,
//         height: 320,
//         borderRadius: 15
//     },
//     cityContainer: {
//         alignSelf: 'flex-start',
//         flexDirection: 'row'
//     },
//     city: {
//         color: '#686868',
//         fontWeight: 'bold',
//         fontSize: 32
//     },
//     waterLevel: {
//         flexDirection: 'row'
//     },
//     value: {
//         fontSize: 70,
//         color: '#F36162'
//     },
//     unit: {
//         fontSize: 30,
//         color: '#F36162'
//     },
//     unitContainer: {
//         justifyContent: 'flex-end',
//         paddingBottom: 10
//     },
//     statusContainer:{
//         backgroundColor: '#F36162',
//         borderRadius: 15,
//         paddingLeft: '3%',
//         paddingRight: '3%',
//         width: windowWidth * 2.5 / 10,
//         alignItems: 'center'
//     },
//     status: {
//         alignSelf: 'center',
//         color: '#FFFFFF',
//         fontSize: 14,
//         fontWeight: '700'
//     },
//     weatherContainer: {

//     },
//     weather: {
//         color: '#858383',
//         fontSize: 26
//     },
//     temperatureContainer: {
//         flexDirection: 'row'
//     },
//     tempValue: {
//         color: '#5F5F5F',
//         fontSize: 75
//     },
//     degree: {
//         color: '#5F5F5F',
//         fontSize: 30
//     },
//     subscribe: {
        
// =======
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