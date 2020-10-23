import React,{useEffect, useState}from 'react'
import { View, TouchableOpacity, Button,Text, Pressable, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getHistory } from '../store/actions/dataActions'
import CardHistory from '../components/CardHistory'
import { AntDesign } from '@expo/vector-icons'; 

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


export default function History({ route, navigation }) {
    const { id } = route.params
    
    const dispatch = useDispatch();
    const dataHistory = useSelector(state => state.dataReducer.history);
    const [images, setImages] = useState('')

    useEffect(() => {
        console.log(id)
        dispatch(getHistory(id))
    }, [id]);

    const srcImages = (image) => {
        let newURL = ''
        const imageRef = Storage.ref(`/images/${image}.png`)
        imageRef.getDownloadURL().then(function(url) {
            newUrl = url
            console.log(url, 'url<<<<<<<<<<<<<<<');
        }, function(error){
            console.log(error, "<<<<<<<<<<<<< error");
        });
        return newURL
    } 
    // useEffect(() => {
    //     dispatch(getAllSubscribed());
    //     const imageRef = Storage.ref(`/images/3_29_2020-10-21T10:56:58.811Z`)
    //     imageRef.getDownloadURL().then(function(url) {
    //         setImages(url)
    //         console.log(url, 'url<<<<<<<<<<<<<<<');
    //     }, function(error){
    //         console.log(error, "<<<<<<<<<<<<< error");
    //     });
    // }, []);

    function onPress(){
        navigation.navigate('MainMenu', { screen: 'Search' });
    }

    // if (!dataHistory) return <Text>Loading...</Text>
    if (!dataHistory) return <></>
    return (
        <ScrollView style={styles.scrollView}>
        <View style={ styles.container }>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Pressable onPress={() => onPress()}>
                    <AntDesign name='arrowleft' size={ 32 } color='rgb(28, 28, 30)'></AntDesign>
                </Pressable>
                <Text style={{ color: 'rgb(28, 28, 30)', fontSize: 28, fontWeight: '600', marginBottom: 10, marginLeft: 10, marginBottom: 20 }}>History</Text>
            </View>
            {/* <Text>{JSON.stringify(dataHistory[0])}</Text> */}
            
            <View>
                {
                    (dataHistory.length > 0) ? dataHistory.map((item) => {
                        return <CardHistory location={ item } key={ item.id }/> 
                    }) : <Text>fyuuuh, its so relieved that this place hasn't fluid history yet</Text>
                }
            </View>
            {/* <Image source={{uri: images}} /> */}
            {/* <Text>{JSON.stringify(dataHistory.result[0])}</Text> */}
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
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
        paddingTop: windowHeight * 1 / 15,
    },
    scrollView: {
        backgroundColor: 'white'
    }
})