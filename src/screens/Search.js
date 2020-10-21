import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, TextInput, Text, Pressable, Modal } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import SearchCard from '../components/SearchCard'
import useDebounce from '../hooks/useDebounce' 
import { searchLocation,setHistory, getByCity, getWeather } from '../store/actions/dataActions'
import SearchByCity from '../components/SearchByCity';

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
        setIsChange(true)
        setIsValid(true)
        setSearch(search)
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
        <>
            <View style={ styles.container }>
                {/* <TouchableOpacity style={{borderRadius:25}}>
                <Button
                    onPress={() => onPress()}
                    title="Login"
                    color=""
                    accessibilityLabel="Learn more about this purple button"
                />
                </TouchableOpacity> */}
                <Text style={{ color: 'rgb(28, 28, 30)', fontSize: 28, fontWeight: '600', marginBottom: 10 }}>Search</Text>
                <View style={ styles.search }>
                    <TextInput 
                        style={styles.textInput}
                        value={search}
                        placeholder='Search places...'
                        placeholderTextColor='#BFBFBF'
                        onChangeText={(event) => handleOnChange(event)}
                    />
                </View>
                <View style={ styles.search }>
                    {
                        city ? <Pressable onPress={() => handleOnPress()}>
                            <Text  style={styles.textInput}>{ city }</Text>
                        </Pressable> : <Pressable onPress={() => handleOnPress()}>
                            <Text style={styles.textInput}>Please Enter Your Specific Location First</Text>
                        </Pressable>
                    }
                </View>
                    {
                        isValid ? <></> : <Text style={{ alignSelf: 'center', color: 'red' }}>Please Enter Your Specific Location First</Text>   
                    }
                    {
                        isChange ? ( searchResults.length > 0 ? searchResults.map((location) => {
                            return <SearchCard location={ {location,navigation} }  key={ location.id } /> 
                        })  : <Text style={{ alignSelf: 'center', color: 'red' }}>Location not found</Text>) : <></>
                    }
                { filteredLoc ? <Modal animationType="slide" transparent={false} visible={open}>
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
                    </Modal> : <></>
                }
            </View>
        </>
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
        paddingTop: windowHeight * 1 / 10,
    },
    search: {
        marginBottom: '10%',
        borderRadius: 2
    },
    textInput: {
        // height: 40, 
        // paddingLeft: 20,
        paddingRight: 20,
        fontSize: 24,
        fontWeight: '400',
        backgroundColor: '#EAEAEA',
        borderRadius:15,
        width: windowWidth * 8.5 / 10,
    }
})