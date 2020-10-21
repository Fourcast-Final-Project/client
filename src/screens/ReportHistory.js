import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Text, View } from 'react-native'
import { getReportHistory } from '../store/actions/userActions'
import CardHistory from '../components/CardHistory'

function ReportHistory () {
    const dispatch = useDispatch()
    let userReportHistory = useSelector(state => state.usersReducer.reportHistory)
    
    useEffect(() => {
        dispatch(getReportHistory())
    }, [])

    return (
        <>
            {/* <Text>
                {
                    JSON.stringify(userReportHistory)
                }
            </Text> */}
            <View>
            {
                userReportHistory && userReportHistory.map((item) => {
                    return <CardHistory location={ item }  key={ item.id } /> 
                }) 
            }
            </View>
        </>
    )
}

export default ReportHistory