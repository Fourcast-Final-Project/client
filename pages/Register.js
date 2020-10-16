import React, {useState} from 'react'
import { StyleSheet, View, Text, Button, TextInput } from 'react-native'

export default function Register({navigation}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    function onPress(){
    
        navigation.navigate("Login")

        
    }

    function handleOnChangeUsername(username){
        setUsername(username)
    }

    function handleOnChangePassword(password){
        setPassword(password)
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
                <Text>Email</Text>
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

            <View style={{marginTop:20, marginBottom:10}}>
                <Text style={{fontSize:20}}>Address</Text>
            </View>

            <View style={styles.inputName}>
                <Text>City</Text>
            </View>
            <TextInput 
                style={styles.textInput}
                value={username}
                onChangeText={handleOnChangeUsername}
            />

            <View style={styles.inputName}>
                <Text>ZIP code</Text>
            </View>

            <TextInput 
                style={styles.textInput}
                value={username}
                onChangeText={handleOnChangeUsername}
            />          

            <View style={{marginTop:20}}>
                <Button
                    onPress={() => onPress()}
                    title="Register"
                    color="#63B4FF"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>

    
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
