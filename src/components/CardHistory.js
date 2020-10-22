import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity } from 'react-native'
import { SearchBar, Card, CardItem} from 'react-native-elements';
import { Storage } from '../config/firebase';
import Lightbox from 'react-native-lightbox'


export default function CardHistory(props) {
    const dispatch = useDispatch();
    const [img, setImg] = useState('')

    useEffect(() => {
        const imageRef = Storage.ref(`/images/${props.location.image}`)
        imageRef.getDownloadURL().then(function(url) {
            setImg(url)
            console.log(url, 'url<<<<<<<<<<<<<<<');
        }, function(error){
            console.log(error, "<<<<<<<<<<<<< error");
        });
    }, [])
    // const srcImages = (image) => {
    //     // let newURL = ''
        
    //     return newURL
    // }

    return (
        <>
            {img.length > 0 && <View style={ styles.containerRounded }>
                {props.location.waterLevel <= 10 && <View style={[styles.green, { width: 47, height: 17, borderStyle: 'solid', borderRadius: 100, position: 'absolute', right: 19, top: 19 }]}></View>}
                {(props.location.waterLevel < 20) && (props.location.waterLevel > 10) && <View style={[styles.yellow, { width: 50, height: 20, borderStyle: 'solid', borderRadius: 100, position: 'absolute', right: 19, top: 19 }]}></View>}
                {props.location.waterLevel > 20 && <View style={[styles.red, { width: 47, height: 17, borderStyle: 'solid', borderRadius: 100, position: 'absolute', right: 19, top: 19 }]}></View>}
                <View>
                    <View style={{ display: 'flex', flexDirection: 'row'}}>
                        {img && 
                            <Lightbox renderContent={()=> {
                                return(
                                    <Image
                                    source={{ uri: img }}
                                    style={styles.bigLogo}
                                    resizeMode='center'
                                    />
                                )
                                }}>
                                <Image
                                source={{ uri: img }}
                                style={[styles.tinyLogo, { marginBottom: 5 }]}
                                // resizeMode='center'
                                />
                            </Lightbox>
                        }
                        <View style={{ marginLeft: 10, marginTop: 3 }}>
                            <Text style={[styles.lightGray, { fontSize: 16, marginBottom: 5 }]}>{ props.location.updatedAt.split("T")[0] } { props.location.updatedAt.split("T")[1].substring(0, 8) } </Text>
                            <Text style={[styles.darkGray, { fontSize: 24, fontWeight: '500', marginBottom: 8 }]}>{ props.location.Location.name }</Text>
                            <Text style={[styles.mediumGray, { fontSize: 14, fontWeight: '600' }]}>WATER LEVEL</Text>
                        </View>
                    </View>
                    <View style={ styles.row }>
                        
                        {/* GATAU INI JADI GA */}
                        <Text style={[styles.mediumGray, { fontSize: 26, position: 'absolute', right: 0, bottom: 0 }]}>{ props.location.waterLevel }<Text style={[styles.lightGray, { fontSize: 22 }]}> cm</Text></Text>
                        {/* <Image source={ srcImages(props.location.image) } /> */}
                        
                    </View>
                </View>
            </View>}
        </>
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
    },
    tinyLogo: {
        width: 50,
        height: 80,
    },
    bigLogo: {
        width: 400,
        height: 400,
    }
})