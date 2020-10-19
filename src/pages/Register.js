import React, {useState} from 'react'
import { StyleSheet, View, Text, TextInput, Dimensions, Pressable } from 'react-native'
import { useDispatch } from 'react-redux'
import { register } from '../store/actions/userActions'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Register({navigation}) {
    const dispatch = useDispatch()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")


    function onPress(){
        dispatch(register({ email, password }))
        navigation.navigate("Login")   
        setEmail('')
        setPassword('')
    }

    function toLogin(){
        navigation.navigate("Login")
        setEmail('')
        setPassword('')
    }

    function handleOnChangePassword(password){
        setPassword(password)
    }

    function handleOnChangeEmail(email){
        setEmail(email)
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.headerContainer }>
                <Text style={ styles.header }>Register</Text>
            </View>

            <View style={ styles.subContainer }>
                <Text style={ styles.subHeader }>EMAIL</Text>
            </View>

            <TextInput 
                style={styles.textInput}
                value={email}
                onChangeText={handleOnChangeEmail}
            />

            <View style={ styles.subContainer }>
                <Text style={ styles.subHeader }>PASSWORD</Text>
            </View>

            <TextInput 
                style={styles.textInput}
                value={password}
                secureTextEntry={true}
                onChangeText={handleOnChangePassword}
            />

            <View>
                <Pressable onPress={() => onPress()} style={ styles.button }>
                    <Text style={ styles.buttonText }>Register</Text>
                </Pressable>
            </View>
            <View>
                <Pressable onPress={() => toLogin()} style={ styles.cancelButton }>
                    <Text style={ styles.buttonText }>Cancel</Text>
                </Pressable>
            </View>

    
        </View>
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
    headerContainer: {
        alignSelf: 'center',
        width: windowWidth * 8.5 / 10
    },
    subContainer: {
        alignSelf: 'center',
        width: windowWidth * 8.5 / 10,
        marginTop: '5%'
    },
    header: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: 42,
        color: '#393939'
    },
    subHeader: {
        alignSelf: 'flex-start',
        // fontWeight: 'bold',
        fontSize: 20,
        color: '#9A9A9A'
    },
    text: {
        alignSelf: 'flex-start',
        color: '#A1A1A1',
        fontWeight: 'bold',
        fontSize: 18
    },
    button: {
        backgroundColor: '#63B3FD',
        width: windowWidth * 8.5 / 10,
        marginTop: '15%',
        padding: '3%',
        borderRadius: 15
    }, 
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 18
    },
    cancelButton: {
        backgroundColor: '#F36162',
        width: windowWidth * 8.5 / 10,
        marginTop: '3%',
        padding: '3%',
        borderRadius: 15
    },
    textInput: {
        height: 40, 
        fontWeight: 'bold',
        backgroundColor: '#EAEAEA',
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius:15,
        width: windowWidth * 8.5 / 10,
    },
    ask: {
        color: '#9A9A9A',
        fontWeight: '600',
        fontSize: 16
    },
    register: {
        color: '#686868',
        fontWeight: '700',
        fontSize: 20
    },
    address: {
        fontSize: 26,
        color: '#393939',
        fontWeight: '700',
        marginTop: '7%'
    }
  });
