import { SET_DATA, SEARCH_DATA } from './types';
import axios from 'axios';
const baseUrl = 'http://192.168.1.177:3000'

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