import React, {useState, useEffect, useRef} from 'react'
import { StyleSheet, View, Text, TextInput, Dimensions, Pressable } from 'react-native'
import { useDispatch } from 'react-redux'
import { register } from '../store/actions/userActions'
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

async function registerForPushNotificationsAsync() {
    
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
        }
        if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        });
    }

    return token;
}


export default function Register({navigation}) {
    const [expoPushToken, setExpoPushToken] = useState('');
    const notificationListener = useRef();
    const responseListener = useRef();
    const dispatch = useDispatch()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [checkEmail, setcheckEmail] = useState(false)
    const [checkPassword, setCheckPassword] = useState(false)
    
    
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    }, [])


    function onPress(){

        setcheckEmail(false)
        setCheckPassword(false)

        if (!email) {
            setcheckEmail(true);
        } 
        if(!password) {
            setCheckPassword(true);
        }
        if(email && password){
            dispatch(register({ email, password, expoPushToken }))
            navigation.navigate("Login")   
            setEmail('')
            setPassword('')
        }
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
            { checkEmail && <View style={ styles.errorContainer }>
                <Text style={ styles.error }>Email must be filled</Text> 
            </View>}
            <View style={ styles.subContainer }>
                <Text style={ styles.subHeader }>PASSWORD</Text>
            </View>

            <TextInput 
                style={styles.textInput}
                value={password}
                secureTextEntry={true}
                onChangeText={handleOnChangePassword}
            />
              { checkPassword && <View style={ styles.errorContainer }>
                <Text style={styles.error}>password must be filled</Text> 
            </View>}

            <View>
                <Pressable onPress={() => onPress()} style={ styles.button }>
                    <Text style={ styles.buttonText }>Register</Text>
                </Pressable>
            </View>
            <View style={{marginTop:20}}>
                <Text style={ styles.ask }>Nevermind, I do have an account.</Text>
            </View>
            <View>
                <Pressable onPress={() => toLogin()}>
                    <Text style={ styles.register }>Login</Text>
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
        paddingTop: windowHeight * 1 / 12,
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
        fontSize: 40,
        color: '#393939'
    },
    subHeader: {
        alignSelf: 'flex-start',
        fontWeight: '600',
        fontSize: 16,
        color: '#9A9A9A',
        marginBottom: 5
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
        marginTop: '10%',
        padding: '3%',
        borderRadius: 15
    }, 
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 22
    },
    cancelButton: {
        backgroundColor: '#F36162',
        width: windowWidth * 8.5 / 10,
        marginTop: '3%',
        padding: '3%',
        borderRadius: 15
    },
    textInput: {
        fontSize: 18,
        paddingLeft: 15,
        paddingRight: 20,
        paddingTop: 15,
        paddingBottom: 15,
        fontWeight: '400',
        backgroundColor: '#EAEAEA',
        color: '#353535',
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
        fontSize: 22,
        marginTop: 3
    },
    address: {
        fontSize: 26,
        color: '#393939',
        fontWeight: '700',
        marginTop: '7%'
    },
    error: {
        alignSelf: 'flex-start',
        fontWeight: '600',
        fontSize: 14,
        color: 'red',
        marginBottom: 5
    },
    errorContainer: {
        alignSelf: 'center',
        width: windowWidth * 8.5 / 10,
    }
  });
