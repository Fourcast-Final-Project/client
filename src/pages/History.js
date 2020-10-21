import React,{useEffect}from 'react'
import { View, TouchableOpacity, Button,Text, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getHistory } from '../store/actions/dataActions'
import CardHistory from '../components/CardHistory'
import { AntDesign } from '@expo/vector-icons'; 

export default function History({ route, navigation }) {
    const { id } = route.params
    
    const dispatch = useDispatch();
    const dataHistory = useSelector(state => state.dataReducer.history);

    useEffect(() => {
        console.log(id)
        dispatch(getHistory(id))
    }, [id]);

    function onPress(){
        navigation.navigate('MainMenu', { screen: 'Search' });
    }

    if (!dataHistory) return <Text>Loading...</Text>
    return (
        <View>
            <Pressable onPress={() => onPress()}>
                <AntDesign name='arrowleft' size={ 32 } color='#686868'></AntDesign>
            </Pressable>
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
                dataHistory.length > 0 ? dataHistory.map((item) => {
                    return <CardHistory location={ item }  key={ item.id } /> 
                }) : <Text>fyuuuh, its so relieved that this place hasn't fluid history yet</Text>
            }
            </View>
            {/* <Text>{JSON.stringify(dataHistory.result[0])}</Text> */}
        </View>
    )
}
