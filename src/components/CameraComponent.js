import React, {useState, useEffect, useRef} from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Modal , Image} from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome, Ionicons,MaterialCommunityIcons,AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux'
import { getPhoto } from '../store/actions/userActions'


export default function CameraComponent({navigation}) {
    const dispatch = useDispatch()
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [photo, setPhoto] = useState("")
    const [open, setOpen] = useState(false)

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
           setOpen(true)
       }else{
           alert("Kamera bermasalah")
       }
    }

    function onHandleOk(event){
       dispatch(getPhoto(photo))
    //    navigation.navigate("Report")
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
                <TouchableOpacity
                    style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    }}
                    onPress={() =>handleCameraType()}
                   >
                    <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                </TouchableOpacity>
                </View>
                <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
                    <TouchableOpacity
                        style={{
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'transparent',                  
                        }}>
                        <Ionicons
                            name="ios-photos"
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
                    <TouchableOpacity
                        style={{
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        }}>
                        <MaterialCommunityIcons
                            name="camera-switch"
                            style={{ color: "#fff", fontSize: 40}}
                        />
                    </TouchableOpacity>
                </View>
            </Camera>
            { 
            photo ? <Modal animationType="slide" transparent={false} visible={open}>
                    
                    <Image
                        style={{width:"100%", height:700, borderRadius:20}}
                        source={{ uri: photo }}
                    />
                    <View style={{flexDirection:"row"}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin:20}}>
                            <TouchableOpacity style={{margin:10}} onPress={()=> setOpen(false)}>
                                <FontAwesome name="window-close" size={50} color="#FF0000"/>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin:20}}>
                            <TouchableOpacity style={{margin:10}} onPress={onHandleOk}>
                                <AntDesign name="checksquare" size={50} color="#2c8f2c" />                   
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal> : <Text>Data tidak ada</Text>
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


