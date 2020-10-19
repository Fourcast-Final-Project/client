import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, TextInput, Text } from 'react-native'
import { SearchBar} from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux'
import SearchCard from '../components/SearchCard'
import useDebounce from '../hooks/useDebounce' 
import { searchLocation } from '../store/actions/dataActions'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Search({navigation}) {
    const dispatch = useDispatch()
    const [search, setSearch] = useState("")
    const delay = 500
    const debouncedSearchTerm = useDebounce(search, delay);
    const [isZero, setIsZero] = useState(true)
    let searchResults = useSelector(state => state.dataReducer.searchData)

    useEffect(() => {
        if (debouncedSearchTerm) {
                dispatch(searchLocation(search))
              //console.log('debouncing')
            }
        },
        [debouncedSearchTerm]
    );

    function handleOnChange (search) {
        setSearch(search)
        //console.log(search, 'searching')
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
                <View style={ styles.search }>
                    <TextInput 
                        style={styles.textInput}
                        value={search}
                        placeholder='Search places...'
                        placeholderTextColor='#BFBFBF'
                        onChangeText={(event) => handleOnChange(event)}
                    />
                </View>
                    <Text>
                        {/* {
                            JSON.stringify(searchResults)
                        } */}
                    </Text>
                    {
                        searchResults.map((city) => {
                            return <SearchCard city={ city } key={ city.id } /> 
                        }) 
                    }
                {/* <CardComponent/> */}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: windowHeight * 1 / 10,
    },
    search: {
        marginBottom: '10%',
        borderRadius: 2
    },
    textInput: {
        height: 40, 
        paddingLeft: 20,
        paddingRight: 20,
        fontWeight: 'bold',
        backgroundColor: '#EAEAEA',
        borderRadius:15,
        width: windowWidth * 8.5 / 10,
    }
})