import React,{useEffect, useState}from 'react'
import { View, TouchableOpacity, Button,Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getHistory } from '../store/actions/dataActions'
import CardHistory from '../components/CardHistory'


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

    }
    return (
        <View>
           <View style={{marginTop:20}}>
                <TouchableOpacity style={{borderRadius:25}}>
                <Button
                    onPress={() => onPress()}
                    title="History"
                    color=""
                    accessibilityLabel="Learn more about this purple button"
                />
                </TouchableOpacity>
            </View>
            {/* <Text>{JSON.stringify(dataHistory[0])}</Text> */}
            
            <View>
            {
                dataHistory && dataHistory.map((item) => {
                    return <CardHistory location={ item }  key={ item.id } /> 
                }) 

            }
            </View>
            {/* <Image source={{uri: images}} /> */}
            {/* <Text>{JSON.stringify(dataHistory.result[0])}</Text> */}
            
        </View>
    )
}
