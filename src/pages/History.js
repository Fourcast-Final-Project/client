import React,{useEffect}from 'react'
import { View, TouchableOpacity, Button,Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getHistory } from '../store/actions/dataActions'
import CardHistory from '../components/CardHistory'

export default function History({ route, navigation }) {
    const { id } = route.params
    
    const dispatch = useDispatch();
    const dataHistory = useSelector(state => state.dataReducer.history);

    useEffect(() => {
        console.log(id)
        dispatch(getHistory(id))
    }, [id]);

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
            {/* <Text>{JSON.stringify(dataHistory.result[0])}</Text> */}
            
        </View>
    )
}
