import React, {useState} from 'react'
import { StyleSheet, View, Text, Button, TextInput, CheckBox, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;

export default function Report() {
    const [isSelected, setSelection] = useState(false);

    return (
        <>
            <View style={ styles.container }>
                <View style={ styles.subContainer }>
                    <Text style={ styles.header }>Report</Text>
                </View>
                <View style={ styles.subContainer }>
                    <Text style={ styles.subHeader }>Location</Text>
                </View>
                <View style={ styles.subContainer }>
                    <Text style={ styles.text } >City</Text>
                </View>
                <TextInput 
                    style={styles.textInput}
                    // value={username}
                    // onChangeText={handleOnChangeUsername}
                    placeholder='Enter City'
                    placeholderTextColor='#C4C4C4'
                />

                <View style={ styles.subContainer }>  
                    <Text style={ styles.text }>ZIP code</Text>
                </View>

                <TextInput 
                    style={styles.textInput}
                    // value={username}
                    // onChangeText={handleOnChangeUsername}
                    placeholder='Enter ZIP Code'
                    placeholderTextColor='#C4C4C4'
                />    

                <View style={ styles.subContainer }>
                    <Text style={ styles.subHeader }>Water Level</Text>
                </View>

                <TextInput 
                    style={styles.textInput}
                    // value={username}
                    // onChangeText={handleOnChangeUsername}
                    placeholder='in cm'
                    placeholderTextColor='#C4C4C4'
                />  
                
                <View style={ styles.subContainer }>
                    <Text style={ styles.subHeader }>Supporting Image</Text>
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
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    subContainer: {
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
        color: '#A1A1A1',
        fontWeight: 'bold',
        fontSize: 18
    },
    // inputContainer: {
    //   width: "100%",
    //   borderLeftWidth: 1,
    //   borderRightWidth: 1,
    //   borderTopWidth: 1,
    //   borderBottomWidth: 1,
    //   marginBottom: 10
    // },
    inputName: {
        marginBottom: 10
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

  });

