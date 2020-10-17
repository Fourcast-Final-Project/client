import React, {useState} from 'react'
import { StyleSheet, View, Text, Button, TextInput, CheckBox } from 'react-native'

export default function Report() {
    const [isSelected, setSelection] = useState(false);

    return (
        <View>
            <View style={{marginTop:20}}>

            <View style={{marginTop:20}}>
                    <Text style={{fontSize:20}}>Report</Text>
                </View>
                
                <View style={{marginTop:10, marginBottom:10}}>
                    <Text style={{fontSize:20}}>Location</Text>
                </View>

                <View style={styles.inputName}>
                    <Text>City</Text>
                </View>
                <TextInput 
                    style={styles.textInput}
                    // value={username}
                    // onChangeText={handleOnChangeUsername}
                />

                <View style={styles.inputName}>
                    <Text>ZIP code</Text>
                </View>

                <TextInput 
                    style={styles.textInput}
                    // value={username}
                    // onChangeText={handleOnChangeUsername}
                />    

                 <View style={styles.inputName}>
                    <Text>Water Level</Text>
                </View>  

                <TextInput 
                    style={styles.textInput}
                    // value={username}
                    // onChangeText={handleOnChangeUsername}
                />  

                 <View style={styles.inputName}>
                    <Text>Supporing Image</Text>
                </View>  
                <View style={{marginTop:5}}>
                    <Button
                        title="Upload Image"
                        color="#302c2d"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                <View style={styles.inputName}>
                    <Text>Image.png</Text>
                </View>

              
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                        value={isSelected}
                        onValueChange={setSelection}
                        style={styles.checkbox}
                        />
                        <Text style={styles.label}>I hereby confirm that the information above is true as agreed through the code of conduct.</Text>
                    </View>
                    {/* <Text>Is CheckBox selected: {isSelected ? "👍" : "👎"}</Text> */}
             

                <View style={{marginTop:20}}>
                    <Button
                        // onPress={() => onPress()}
                        title="Alert Danger"
                        color="#FF6363"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>

               
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
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
      checkbox: {
        alignSelf: "center",
      },
      label: {
        margin: 8,
      },
    
  });

