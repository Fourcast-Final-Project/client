import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text, Button, TextInput, Dimensions, Pressable, TouchableOpacity } from 'react-native'
import { CheckBox } from 'react-native-elements'


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Report({navigation}) {
    const [ city, setCity ] = useState('')
    const [ zipCode, setZipCode ] = useState('')
    const [ waterLevel, setWaterLevel ] = useState('')
    const [ checkBox, setCheckBox ] = useState(false);
  

    function handleOnchangeCity (city) {
        setCity(city)
    }

    function handleOnChangeZipCode (zipCode) {
        setZipCode(zipCode)
    }

    function handleOnChangeWaterLevel (waterLevel) {
        setWaterLevel(waterLevel)
    }

    function onPressCheckBox () {
        if(checkBox === true) {
            setCheckBox(false)
        }else {
            setCheckBox(true)
        }
    }

    function uploadImageButton () {
        navigation.navigate("CameraScreen")
    }

    function onPressButtonAlert () {
        alert("Press")

    }

    useEffect(() => {
    },[])
    return (
        <>
            <View style={ styles.container }>
                <View style={ styles.subContainer }>
                    <Text style={ styles.header }>Report</Text>
                </View>
                <View style={ styles.subContainer }>
                    <Text style={ styles.subHeader }>Location</Text>
                </View>
                <View style={ styles.subContainer }>
                    <Text style={ styles.text } >City</Text>
                </View>
                <TextInput 
                    style={styles.textInput}
                    value={city}
                    onChangeText={handleOnchangeCity}
                    placeholder='Enter City'
                    placeholderTextColor='#C4C4C4'
                />

                <View style={ styles.subContainer }>  
                    <Text style={ styles.text }>ZIP code</Text>
                </View>

                <TextInput 
                    style={styles.textInput}
                    value={zipCode}
                    onChangeText={handleOnChangeZipCode}
                    placeholder='Enter ZIP Code'
                    keyboardType= 'numeric'
                    placeholderTextColor='#C4C4C4'
                />    

                <View style={ styles.subContainer }>
                    <Text style={ styles.text }>Water Level</Text>
                </View>

                <TextInput 
                    style={styles.textInput}
                    keyboardType= 'numeric'
                    value={waterLevel}
                    onChangeText={handleOnChangeWaterLevel}
                    placeholder='in cm'
                    placeholderTextColor='#C4C4C4'
                />  
                
                <View style={ styles.subContainer }>
                    <Text style={ styles.text }>Supporting Image</Text>
                </View>

                <View style={ styles.subContainer }>
                <Pressable onPress={() => uploadImageButton()} style={ styles.button }>
                    <Text style={ styles.buttonText }>Upload Image</Text>
                </Pressable>
                </View>

               

                <View style={styles.inputName}>
                    <Text>Image.png</Text>
                </View>


                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='I hereby confirm that the information above is true as agreed through the code of conduct.'
                            onPress={onPressCheckBox}
                            checked={checkBox}
                        />
                    </View>

                     <View style={ styles.subContainer }>
                        <Pressable onPress={() => onPressButtonAlert()} style={ styles.buttonAlert }>
                            <Text style={ styles.buttonText }>Alert Danger</Text>
                        </Pressable>
                    </View>
                
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
    subContainer: {
        marginTop: 5,
        alignSelf: 'center',
        width: windowWidth * 8.5 / 10,
    },
    header: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: 42,
        color: '#393939'
    },
    subHeader: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#393939'
    },
    text: {
        alignSelf: 'flex-start',
        color: '#393939',
        fontWeight: 'bold',
        marginTop: '2%',
        marginBottom: '1%',
        fontSize: 18
    },
    inputName: {
        margin: "2%"
    },
    textInput: {
        height: 40, 
        paddingLeft: 20,
        paddingRight: 20,
        fontWeight: 'bold',
        backgroundColor: '#EAEAEA',
        borderRadius:15,
        width: windowWidth * 8.5 / 10,
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        width: windowWidth * 8.5 / 10
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        paddingLeft: 8,
    },
    button: {
        backgroundColor: '#63B3FD',
        width: windowWidth * 8.5 / 10,
        marginTop: '2%',
        padding: '3%',
        borderRadius: 15
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 18
    },
    buttonAlert: {
        backgroundColor: '#FF6363',
        width: windowWidth * 8.5 / 10,
        marginTop: '2%',
        padding: '3%',
        borderRadius: 15
    }
  });

