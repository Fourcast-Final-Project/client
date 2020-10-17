import React, {useState} from 'react'
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, Dimensions } from 'react-native'

const windowWidth = Dimensions.get("window").width;

export default function Login({navigation}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    function onPress(){
    
        navigation.navigate("MainMenu")

        
    }

    function handleOnChangeUsername(username){
        setUsername(username)
    }

    function handleOnChangePassword(password){
        setPassword(password)
    }

    function handelOnPressTextRegister(){
        navigation.navigate("Register")
    }
    return (
        <View style={{marginTop:20}}>
            <View style={styles.inputName}>
                <Text>Usename</Text>
            </View>

            <TextInput 
                style={styles.textInput}
                value={username}
                onChangeText={handleOnChangeUsername}
            />

            <View style={styles.inputName}>
                <Text>Password</Text>
            </View>

            
            <TextInput 
                style={styles.textInput}
                value={password}
                onChangeText={handleOnChangePassword}
            />

            <View style={{marginTop:20}}>
                <TouchableOpacity style={{borderRadius:25}}>
                <Button
                    onPress={() => onPress()}
                    title="Login"
                    color=""
                    accessibilityLabel="Learn more about this purple button"
                />
                </TouchableOpacity>
            </View>

          

            <View style={{marginTop:20}}>
                <Text>Don't Have an account ? </Text>
            </View>
            <TouchableOpacity styles={{fontSize:20}} onPress={handelOnPressTextRegister}>
                <View>
                    <Text styles={{fontSize:20}}>Register</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputContainer: {
      width: "100%",
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      marginBottom: 10
    },
    inputName: {
        marginBottom: 10
    },
    textInput: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1, 
        borderRadius:25
    }
    
  });
