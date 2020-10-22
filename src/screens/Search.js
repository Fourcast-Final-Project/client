import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, TextInput, Text, Pressable, Modal, ImageBackground, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import SearchCard from '../components/SearchCard'
import useDebounce from '../hooks/useDebounce' 
import { searchLocation,setHistory, getByCity, getWeather } from '../store/actions/dataActions'
import { Entypo, FontAwesome, AntDesign, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import SearchByCity from '../components/SearchByCity';
// import { AntDesign } from '@expo/vector-icons'; 

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Search({navigation}) {
    const dispatch = useDispatch()
    const [search, setSearch] = useState("")
    const [city, setCity] = useState('')
    const delay = 100
    const debouncedSearchTerm = useDebounce(search, delay);
    const [isChange, setIsChange] = useState(false)
    const [open, setOpen] = useState(false)
    const [isValid, setIsValid] = useState(true)
    let searchResults = useSelector(state => state.dataReducer.searchData)
    let filteredLoc = useSelector(state => state.dataReducer.filteredByCity)
   
    useEffect(() => {
        let newArr = []
        if (debouncedSearchTerm) {
                dispatch(searchLocation(search))
                dispatch(setHistory(newArr))
              //console.log('debouncing')
            }
        },
        [debouncedSearchTerm]
    );

    useEffect(() => {
        if (searchResults.length === 1) {
            // console.log(searchResults, 'ini di if 1')
            setCity(searchResults[0].city)
        } else if (searchResults.length > 1) {
            setCity('')
        }
    }, [searchResults])

    function handleOnChange (search) {
        setIsValid(true)
        setSearch(search)
        if (!search) {
            setIsChange(false)
        } else {
            setIsChange(true)
        }
        //console.log(search, 'searching')
    }

    function handleOnPress () {
        if (city) {
            setIsValid(true)
            dispatch(getByCity(city))
            setOpen(true)
        } else {
            setIsValid(false)
        }
    }

    function falsingSetOpen () {
        setOpen(false)
    }

    return (
        <ScrollView style={styles.scrollView}>
        <ImageBackground source={require('../../assets/2e.png')} style={{ width: '100%', height: '100%', flex: 1 }}>
            <View style={ styles.container }>
                {/* <TouchableOpacity style={{borderRadius:25}}>
                <Button
                    onPress={() => onPress()}
                    title="Login"
                    color=""
                    accessibilityLabel="Learn more about this purple button"
                />
                </TouchableOpacity> */}
                <Text style={{ color: 'rgb(28, 28, 30)', fontSize: 28, fontWeight: '600', marginBottom: 12 }}>Search</Text>
                <View style={ styles.search }>
                    <TextInput 
                        style={styles.textInput}
                        value={search}
                        placeholder='Enter location here'
                        placeholderTextColor='#BFBFBF'
                        onChangeText={(event) => handleOnChange(event)}
                    />
                </View>
                {/* {
                    isValid ? <></> : <Text style={{ alignSelf: 'center', color: 'red' }}>Please Enter Your Specific Location First</Text>   
                } */}
                {/* <View style={ styles.search }> */}
                    {
                        city ? 
                        <View style={styles.search}>
                            <Text style={[{ color: 'rgb(99, 99, 102)', fontSize: 14, fontWeight: '600', marginBottom: 5 }]}>CITY</Text>
                            <Pressable onPress={() => handleOnPress()}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={[styles.textInput, { fontWeight: '600', color: 'rgb(58, 58, 60)' }]}>{ city }</Text>
                                    <AntDesign name='arrowright' size={28} color='rgb(58, 58, 60)'/>
                                </View>
                            </Pressable>
                        </View>
                        : <></>
                        // <Pressable onPress={() => handleOnPress()}>
                        //     <Text style={styles.textInput}>Please Enter Your Specific Location First</Text>
                        // </Pressable>
                    }
                {/* </View> */}
                <Text style={{ color: 'rgb(99, 99, 102)', fontSize: 14, fontWeight: '600', marginBottom: 10 }}>SEARCH RESULTS</Text>
                {
                    isChange ? ( searchResults.length > 0 ? searchResults.map((location) => {
                        return <SearchCard location={ {location,navigation} }  key={ location.id } /> 
                    })  : <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 20, color: 'rgb(174, 174, 178)' }}>Sorry, location not found.</Text>) : <></>
                }
                { filteredLoc ? <Modal animationType="slide" transparent={false} visible={open}>
                    <ScrollView style={styles.scrollView}>
                    <View style={styles.container} >
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Pressable onPress={ falsingSetOpen }>
                                <AntDesign name='arrowleft' size={ 32 } color='rgb(28, 28, 30)'></AntDesign>
                            </Pressable>
                            <Text style={{ color: 'rgb(28, 28, 30)', fontSize: 28, fontWeight: '600', marginBottom: 10, marginLeft: 10, marginBottom: 20 }}>Places</Text>
                        </View>
                        {   
                            filteredLoc.map(location => {
                                // return <Text>
                                //     {
                                //         JSON.stringify(location)
                                //     }
                                // </Text>
                                return <SearchByCity falsingSetOpen={ falsingSetOpen } key={ location.id } id={ location.id } location={ location } getWeather={ getWeather } navigation={ navigation } />
                            })
                        }
                    </View>
                    </ScrollView>
                    </Modal> : <></>
                }
            </View>
        </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#ffff',
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
    search: {
        marginBottom: '10%',
        borderRadius: 2
    },
    textInput: {
        // height: 40, 
        // paddingTop: 10,
        paddingBottom: 2,
        // paddingLeft: 10,
        paddingRight: 10,
        fontSize: 24,
        fontWeight: '400',
        color: 'rgb(72, 72, 74)',
        // backgroundColor: 'whitesmoke',
        borderBottomWidth: 2,
        borderBottomColor: 'rgb(72, 72, 74)',
        // borderRadius: 15,
        // width: windowWidth * 8.5 / 10,
    },
    scrollView: {
        backgroundColor: 'white'
    }
})