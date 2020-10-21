import React, {useState, useEffect, useRef} from 'react'
import { StyleSheet, View, Text, Button, TextInput, Dimensions, Pressable, TouchableOpacity, ScrollView, SafeAreaView, Keyboard, TouchableWithoutFeedback} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { CheckBox } from 'react-native-elements'
import { reportDanger } from '../store/actions/userActions';
import firebase from 'firebase'
import {CountDownText} from 'react-native-countdown-timer-text';


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

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

    const res = await firebase
        .firestore()
        .collection('locations')
        .doc(firebase.auth().currentUser.uid)
        .set({ token }, { merge: true })

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
      title: 'DANGER',
      body: 'Flooding in your area!',
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

export default function Report({navigation}) {
    const dispatch = useDispatch();
    // const [ city, setCity ] = useState('')
    // const [ zipCode, setZipCode ] = useState('')
    const [ waterLevel, setWaterLevel ] = useState('')
    const [ checkBox, setCheckBox ] = useState(false);
    const [ checkcheck, setCheckCheck ] = useState(false);
    const [ waterLevelCheck, setWaterLevelCheck ] = useState(false);
    const [ imageCheck, setImageCheck ] = useState(false);
    const image = useSelector(state => state.usersReducer.rawPhoto);
    const location = useSelector(state => state.usersReducer.location);
 
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

    async function onPressButtonAlert () {
        setCheckCheck(false);
        setWaterLevelCheck(false);
        setImageCheck(false);

        if (checkBox === false) {
            setCheckCheck(true);
            console.log(checkcheck, "checcheck")
        }
        if(waterLevel === '' || waterLevel < 50){
            setWaterLevelCheck(true);
            console.log(waterLevelCheck, " water level checcheck")
        }
        if(!image){
            setImageCheck(true);
            console.log(imageCheck, `imagecheck`)
        }
         if(checkcheck && waterLevelCheck && imageCheck ) {
             alert('berhasil')
             setWaterLevel('')
             setCheckBox(false)
            // console.log(waterLevel, "INI DRI REPORT GUYS WATER")
            // dispatch(reportDanger(waterLevel));
            // await sendPushNotification(expoPushToken);
            // navigation.navigate('MainMenu', { screen: 'Home' })
        }

        
    }

    useEffect(() => {
    },[])
    return (
        <DismissKeyboard>
        <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
            <View style={ styles.container }>
                <View style={ styles.subContainer }>
                    <Text style={ styles.header }>Report</Text>
                </View>
                <View style={ styles.subContainer }>
                    <Text style={ styles.subHeader }>Location</Text>
                </View>
                <View style={ styles.subContainer }>  
                    <Text style={ styles.text }>Place</Text>
                </View>

                <TextInput 
                    style={styles.textInput}
                    value={location[0].name}
                    onChangeText={handleOnChangeZipCode}
                    placeholderTextColor='#C4C4C4'
                    editable={ false }
                />
                <View style={ styles.subContainer }>  
                    <Text style={ styles.text }>Area</Text>
                </View>

                <TextInput 
                    style={styles.textInput}
                    value={location[0].area}
                    onChangeText={handleOnChangeZipCode}
                    placeholder='Enter ZIP Code'
                    placeholderTextColor='#C4C4C4'
                    editable={ false }
                />    
                <View style={ styles.subContainer }>
                    <Text style={ styles.text } >City</Text>
                </View>
                <TextInput 
                    style={styles.textInput}
                    value={location[0].city}
                    onChangeText={handleOnchangeCity}
                    placeholder='Enter City'
                    placeholderTextColor='#C4C4C4'
                    editable={ false }
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
                 {waterLevelCheck && <Text style={{color: 'red'}}>water level at least 50 cm</Text>}
                
                <View style={ styles.subContainer }>
                    <Text style={ styles.text }>Supporting Image</Text>
                </View>

                <View style={ styles.subContainer }>
                <Pressable onPress={() => uploadImageButton()} style={ styles.button }>
                    <Text style={ styles.buttonText }>Upload Image</Text>
                </Pressable>
                </View>

               

                {image.length > 0 && <View style={styles.inputName}>
                    <Text>Image uploaded</Text>
                </View>}

                {imageCheck && <Text style={{color: 'red'}}>please upload your report photo</Text>} 

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='I hereby confirm that the information above is true as agreed through the code of conduct.'
                            onPress={onPressCheckBox}
                            checked={checkBox}
                        />
                    </View>
                    {checkcheck && <Text style={{color: 'red'}}>Term on condition must be check</Text>}
                   
                    
                    <View style={ styles.subContainer }>
                        <Pressable onPress={() => onPressButtonAlert()} style={ styles.buttonAlert }>
                            <Text style={ styles.buttonText }>Alert Danger</Text>
                        </Pressable>
                    </View>
                
            </View>
            </ScrollView>
            </SafeAreaView>
        </DismissKeyboard>
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
    },
    
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  }
  });

