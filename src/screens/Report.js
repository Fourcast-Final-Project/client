import React, {useState, useEffect, useRef} from 'react'
import { StyleSheet, View, Text, Button, TextInput, Dimensions, Pressable, TouchableOpacity, ScrollView, SafeAreaView, Keyboard, TouchableWithoutFeedback, ImageBackground} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { CheckBox } from 'react-native-elements'
import { reportDanger } from '../store/actions/userActions';
import firebase from 'firebase'
// import {CountDownText} from 'react-native-countdown-timer-text';


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
        <ImageBackground source={require('../../assets/3.png')} style={{ width: '100%', height: '100%', flex: 1 }}>
            <DismissKeyboard>
            {/* <SafeAreaView style={{ backgroundColor: 'white' }}>
                <ScrollView style={styles.scrollView}> */}
                    <View style={[styles.container]}>
                        <Text style={{ color: 'rgb(28, 28, 30)', fontSize: 28, fontWeight: '600', marginBottom: 15 }}>Report</Text>
                        <Text style={{ color: 'rgb(99, 99, 102)', fontSize: 14, fontWeight: '600', marginBottom: 5 }}>PLACE</Text>
                        <TextInput 
                            style={[styles.textInput, { color: 'rgb(174, 174, 178)', borderBottomColor: 'rgb(174, 174, 178)' }]}
                            value={location[0].name}
                            onChangeText={handleOnChangeZipCode}
                            placeholderTextColor='#C4C4C4'
                            editable={ false }
                        /> 
                        <Text style={{ color: 'rgb(99, 99, 102)', fontSize: 14, fontWeight: '600', marginBottom: 5 }}>AREA</Text>
                        <TextInput 
                            style={[styles.textInput, { color: 'rgb(174, 174, 178)', borderBottomColor: 'rgb(174, 174, 178)' }]}
                            value={location[0].area}
                            onChangeText={handleOnChangeZipCode}
                            placeholder='Enter ZIP Code'
                            placeholderTextColor='#C4C4C4'
                            editable={ false }
                        />    
                        <Text style={{ color: 'rgb(99, 99, 102)', fontSize: 14, fontWeight: '600', marginBottom: 5 }}>CITY</Text>
                        <TextInput 
                            style={[styles.textInput, { color: 'rgb(174, 174, 178)', borderBottomColor: 'rgb(174, 174, 178)' }]}
                            value={location[0].city}
                            onChangeText={handleOnchangeCity}
                            placeholder='Enter City'
                            placeholderTextColor='#C4C4C4'
                            editable={ false }
                        />
                        <Text style={{ color: 'rgb(99, 99, 102)', fontSize: 14, fontWeight: '600', marginBottom: 5 }}>WATER LEVEL</Text>
                        <TextInput 
                            style={[styles.textInput, { width: '30%' }]}
                            keyboardType= 'numeric'
                            value={waterLevel}
                            onChangeText={handleOnChangeWaterLevel}
                            placeholder='in cm'
                            placeholderTextColor='#C4C4C4'
                        />  
                        {waterLevelCheck && <Text style={{color: 'red'}}>water level at least 50 cm</Text>}
                        <Text style={{ color: 'rgb(99, 99, 102)', fontSize: 14, fontWeight: '600', marginBottom: 5 }}>SUPPORTING IMAGE</Text>
                        <Pressable onPress={() => uploadImageButton()} style={ styles.button }>
                            <Text style={ styles.buttonText }>UPLOAD IMAGE</Text>
                        </Pressable>
                        {image.length > 0 && 
                            <Text style={{ textAlign: 'center', marginTop: 10, marginBottom: 0, color: 'rgb(199, 199, 204)' }}>Image uploaded</Text>
                        }
                        {imageCheck && <Text style={{color: 'red'}}>please upload your report photo</Text>} 
                        {checkcheck && <Text style={{color: 'red'}}>Term on condition must be check</Text>}
                        {/* <View style={styles.checkboxContainer}> */}
                            <CheckBox
                                title='I hereby confirm that the information above is true as agreed through the code of conduct.'
                                onPress={onPressCheckBox}
                                checked={checkBox}
                                textStyle={{ fontSize: 12, fontWeight: '300' }}
                                containerStyle={{ marginLeft: 0, width: '100%', marginTop: 25 }}
                                checkedColor='black'
                            />
                        {/* </View> */}
                        {/* <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text>I hereby confirm that the information above is true as agreed through the code of conduct.</Text>
                        </View> */}
                        {checkcheck && <Text>ISI</Text>}
                        <View style={ styles.subContainer }>
                            <Pressable onPress={() => onPressButtonAlert()} style={ styles.buttonAlert }>
                                <Text style={[styles.buttonText, { color: '#FF6363' }]}>ALERT DANGER</Text>
                            </Pressable>
                        </View>
                    </View>
                {/* </ScrollView>
            </SafeAreaView> */}
        </DismissKeyboard>
    </ImageBackground>
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
        // alignContent: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 50,
        paddingTop: windowHeight * 1 / 15,
    },
    // subContainer: {
    //     marginTop: 5,
    //     alignSelf: 'center',
    //     width: windowWidth * 8.5 / 10,
    // },
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
        marginBottom: 25
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        width: windowWidth * 8.5 / 10
    },
    // checkbox: {
    //     alignSelf: "center",
    // },
    // label: {
    //     paddingLeft: 8,
    // },
    button: {
        // backgroundColor: '#63B3FD',
        // width: windowWidth * 8.5 / 10,
        marginTop: '2%',
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'rgb(28, 28, 30)'
    },
    buttonText: {
        color: 'rgb(28, 28, 30)',
        fontWeight: '500',
        alignSelf: 'center',
        fontSize: 18
    },
    buttonAlert: {
        // backgroundColor: '#FF6363',
        borderColor: '#FF6363',
        // width: windowWidth * 8.5 / 10,
        marginTop: '2%',
        borderRadius: 15,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 50,
        borderWidth: 2,
    },
    scrollView: {
        // backgroundColor: 'pink',
        // marginHorizontal: 20,
    }
  });

