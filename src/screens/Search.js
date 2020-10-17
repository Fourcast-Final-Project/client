import React, {useState} from 'react'
import { View} from 'react-native'
import { SearchBar} from 'react-native-elements';
import CardComponent from '../components/CardComponent'


export default function Search({navigation}) {
    const [search, setSearch] = useState("")

    function updateSearch(input){

        setSearch(input)
    }
    return (
        <View>
            <View style={{marginTop:20}}>
                {/* <TouchableOpacity style={{borderRadius:25}}>
                <Button
                    onPress={() => onPress()}
                    title="Login"
                    color=""
                    accessibilityLabel="Learn more about this purple button"
                />
                </TouchableOpacity> */}
                <SearchBar
                    showLoading
                    platform="ios"
                    placeholder="Search Place..."
                    onChangeText={updateSearch}
                    value={search}
                />

               <CardComponent/>
                 
            </View>
        </View>
    )
}

