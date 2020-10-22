import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Text, View, StyleSheet, Dimensions, ImageBackground } from 'react-native'
import { getReportHistory } from '../store/actions/userActions'
import CardHistory from '../components/CardHistory'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function ReportHistory () {
    const dispatch = useDispatch()
    let userReportHistory = useSelector(state => state.usersReducer.reportHistory)
    
    useEffect(() => {
        dispatch(getReportHistory())
    }, [])

    return (
        <ImageBackground source={require('../../assets/4.png')} style={{ width: '100%', height: '100%', flex: 1 }}>
            {/* <Text>
                {
                    JSON.stringify(userReportHistory)
                }
            </Text> */}
            <View style={ styles.container }>
            <Text style={{ color: 'rgb(28, 28, 30)', fontSize: 28, fontWeight: '600', marginBottom: 15 }}>Past Reports</Text>
            {
                userReportHistory && userReportHistory.map((item) => {
                    return <CardHistory location={ item }  key={ item.id } /> 
                }) 
            }
            </View>
        </ImageBackground>
    )
}

export default ReportHistory

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#ffff',
        // alignItems: 'center',
        // justifyContent: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 50,
        paddingTop: windowHeight * 1 / 15,
    }
})