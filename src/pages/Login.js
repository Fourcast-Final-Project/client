import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text, TextInput, Pressable, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getToken } from '../store/actions/userActions'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Login({navigation}) {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const token = useSelector(state => state.usersReducer.token)

    useEffect(() => {
        if (token) {
            navigation.navigate("MainMenu")
        }
    }, [token])

    function onPress(){
        dispatch(getToken({ email, password }))
    }

    function handleOnChangeEmail(email){
        setEmail(email)
    }

    function handleOnChangePassword(password){
        setPassword(password)
    }

    function handelOnPressTextRegister(){
        navigation.navigate("Register")
    }
    return (
        <View style={ styles.container }>
            <View style={ styles.headerContainer }>
                <Text style={ styles.header }>Login</Text>
            </View>

            <View style={ styles.subContainer }>
                <Text style={ styles.subHeader }>EMAIL</Text>
            </View>

            <TextInput 
                style={styles.textInput}
                value={email}
                onChangeText={handleOnChangeEmail}
            />

            <View style={styles.subContainer}>
                <Text style={ styles.subHeader }>PASSWORD</Text>
            </View>

            
            <TextInput 
                style={styles.textInput}
                value={password}
                onChangeText={handleOnChangePassword}
            />

            <View>
                <Pressable onPress={() => onPress()} style={ styles.button }>
                    <Text style={ styles.buttonText }>Login</Text>
                </Pressable>
            </View>

          

            <View style={{marginTop:20}}>
                <Text style={ styles.ask }>Don't have an account ? </Text>
            </View>
            <Pressable styles={{fontSize:20}} onPress={handelOnPressTextRegister}>
                <View>
                    <Text style={ styles.register }>Register</Text>
                </View>
            </Pressable>
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
    textInput: {
        height: 40, 
        fontWeight: 'bold',
        backgroundColor: '#EAEAEA',
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
    }
  });
