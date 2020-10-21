import React, {useState, useEffect, useRef} from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Modal , Image} from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome, Ionicons,MaterialCommunityIcons,AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { getRawPhoto, setPhotoName } from '../store/actions/userActions'
import { Storage } from '../config/firebase';


export default function CameraComponent({navigation}) {
    const dispatch = useDispatch()
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [photo, setPhoto] = useState("")
    const [open, setOpen] = useState(false)
    const user = useSelector(state => state.usersReducer.user);
    const location = useSelector(state => state.usersReducer.location);

    const camRef = useRef(null)

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        if (status !== 'granted') {
            alert('Hey! You might want to enable Camera in your phone settings.')
        }

        })();
    }, []);

    if (hasPermission === null) {
        return <View />
    }
    if (hasPermission === false) {
        alert("No access to camera")
    }

    function handleCameraType(){
        
        if(type == Camera.Constants.Type.back ){
            Camera.Constants.Type.front
        }else{
            Camera.Constants.Type.back
        }
    }

   async function onHandleTakePicture(){
       if(camRef){
           const data = await camRef.current.takePictureAsync()
           setPhoto(data.uri)
           console.log(data, 'uriiiii')
           setOpen(true)
       }else{
           alert("Kamera bermasalah")
       }
    }

    function onHandleOk(){
        // const photoFromCamera = await 
        const newDate = JSON.stringify(new Date());
        const photoName = `${user.id}_${location[0].id}_${newDate.split(`"`).join('')}`
        dispatch(getRawPhoto(photo))
        dispatch(setPhotoName(photoName))
        if (photo.length > 0) {
            console.log(photo, 'INI STORAGE')
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
                Storage.ref('images/' + `${photoName}`).put(xhr.response)
            }
            xhr.onerror = function() {
                console.log('error')
            }
            xhr.responseType = 'blob';
            xhr.open('GET', photo, true);
            xhr.send(null);
            
            navigation.navigate('MainMenu', { screen: 'Report' });
        }
    }

    const toReport = () => {
        console.log(navigation, 'INI DRI HANDLEEEEE')
        navigation.navigate('MainMenu', { screen: 'Report' });
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera 
                ref={camRef} 
                style={{ flex: 1 }} type={type}
            >
                <View
                style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                }}>
                </View>
                <View style={{flex:1, flexDirection:"row",justifyContent:"flex-start",margin:20}}>
                    <TouchableOpacity
                        style={{
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        marginRight: 130               
                        }}
                        onPress={toReport}
                        >
                        <Ionicons
                            name="ios-arrow-back"
                            style={{ color: "#fff", fontSize: 40}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        }}
                        onPress={onHandleTakePicture}
                        >
                        <FontAwesome
                            name="camera"
                            style={{ color: "#fff", fontSize: 40}}
                        />
                    </TouchableOpacity>
                </View>
            </Camera>
            { 
            photo ? <Modal animationType="slide" transparent={false} visible={open}>
                    
                    <Image
                        style={{width:"100%", height:"82%"}}
                        source={{ uri: photo }}
                    />
                    <View style={{flexDirection:"row"}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin:20}}>
                            <TouchableOpacity style={{margin:10}} onPress={()=> setOpen(false)}>
                                <Ionicons name="ios-close-circle" size={60} color="black"/>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin:20}}>
                            <TouchableOpacity style={{margin:10}} onPress={onHandleOk}>
                                <Ionicons name="ios-checkmark-circle" size={60} color="black" />                   
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal> : <></>
             }
         </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        
    }
  });


