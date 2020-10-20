import React, {useState, useEffect, useRef} from 'react'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { StyleSheet, View, Text, TextInput, Pressable, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getToken, checkRedis } from '../store/actions/userActions'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
});

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
        },
        trigger: { seconds: 8 },
    });
}

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

async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { data: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

export default function Login({navigation}) {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const token = useSelector(state => state.usersReducer.token)

    // Expo
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
  
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener);
          Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

    // useEffect(() => {
    //     dispatch(checkRedis());
    // }, [token]);

    useEffect(() => {
        if (token) {
            navigation.navigate("MainMenu")
        }
        setEmail('')
        setPassword('')
    }, [token])

    async function onPress(){
        // await schedulePushNotification(expoPushToken);
        dispatch(getToken({ email, password }))
        setEmail('')
        setPassword('')
    }

    function handleOnChangeEmail(email){
        setEmail(email)
    }

    function handleOnChangePassword(password){
        setPassword(password)
    }

    function handelOnPressTextRegister(){
        navigation.navigate("Register")
        setEmail('')
        setPassword('')
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
                secureTextEntry={true}
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
        fontSize: 18,
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
        paddingLeft: 20,
        paddingRight: 20,
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
