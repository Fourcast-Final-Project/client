import { SET_DATA, SEARCH_DATA, SET_HISTORY } from './types';
import axios from 'axios';
const baseUrl = 'http://192.168.0.14:3000'

export const setData = (data) => {
  return {
    type: SET_DATA,
    payload: data
  }
}

export const setSearch = (payload) => {
  return {
    type: SEARCH_DATA,
    payload
  }
}

export const searchLocation = (place) => {
  console.log ("masuk userAction: ini search")
  return (dispatch) => {
    fetch(`${baseUrl}/locations/find/${place}`)
      .then((res) => res.json())
      .then(({data}) => {
           console.log(data, 'INI DRI SEARCH LOC')
          dispatch(setSearch(data))
      })
      .catch((err) => {
          console.log(err)
      })
  }    
}


export const getHistory = (id) => {
  console.log ("~~~~~~~~~~~~~")
  console.log ("masuk get history")
  return (dispatch,getState) => {
    const token = getState().usersReducer.token;
    fetch(`${baseUrl}/histories/${id}`, {
      method: 'GET',
      headers: {
        access_token: token
      },
      redirect: 'follow'
    })
      .then((res) => res.json())
      .then((data) => {
          //console.log(data, 'INI DRI history')
          dispatch(setHistory(data.result))
      })
      .catch((err) => {
          console.log(err)
      })
  }    
}


export const setHistory = (payload) => {
  return {
    type: SET_HISTORY,
    payload
  }
}