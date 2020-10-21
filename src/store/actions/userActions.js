import { SET_TOKEN, SET_USER, SET_SUBSCRIBED, SET_LOCATION, SET_WEATHER, SET_RAW_PHOTO, SET_PHOTO_NAME, SET_REPORT_HISTORY } from './types';
import axios from 'axios';

const baseUrl = 'http://192.168.1.177:3000'


export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    payload: token
  }
}

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  }
}

export const setSubscribed = (places) => {
  return {
    type: SET_SUBSCRIBED,
    payload: places
  }
}

export const setUserLocation = (place) =>{
  return {
    type: SET_LOCATION,
    payload: place
  }
}

export const setWeather = (weather) => {
  return {
    type: SET_WEATHER,
    payload: weather
  }
}

export const setRawPhoto = (photo) =>{
    return {
      type: SET_RAW_PHOTO,
      payload: photo
    }
}

export const setPhotoName = (name) => {
  return {
    type: SET_PHOTO_NAME,
    payload: name
  }
}

export const setReportHistory = (payload) => {
  return {
    type: SET_REPORT_HISTORY,
    payload
  }
}

export const getToken = (user) => {
  const { email, password } = user;
  return (dispatch, getState) => {
    axios({
      method: 'post',
      url: baseUrl + '/login',
      data: {
        email,
        password
      }
    })
    .then(({ data }) => {
      dispatch(setToken(data.access_token));
      dispatch(setUser({
        email: data.email,
        id: data.id
      }));
    })
    .catch(err => {
      console.log(err);
    });
  }
}

export const register = (user) => {
  const { email, password, expoPushToken } = user;
  return (dispatch, getState) => {
    axios({
      method: 'post',
      url: baseUrl + '/register',
      data: {
        email,
        password,
        expoPushToken
      }
    })
    .then(({ data }) => {
      console.log('User successfully registered');
    })
    .catch(err => {
      console.log(err, '<<<<<<<<<<<<<<<<<<<,err');
    });
  }
}

export const getAllSubscribed = () => {
  return (dispatch, getState) => {
    axios({
      method: 'get',
      url: `${baseUrl}/subscribes`,
      headers: {
        access_token: getState().usersReducer.token
      }
    })
    .then(({ data }) => {
      //console.log(data, 'INI SUBSCRIBED');
      //alert("Success")
      dispatch(setSubscribed(data.results));
    })
    .catch(err => {
      console.log(err);
    });
  }
}

export const addToSubscribed = (LocationId) => {
  return (dispatch, getState) => {
    axios({
      method: 'post',
      url: `${baseUrl}/subscribes`,
      data: {
        LocationId
      },
      headers: {
        access_token: getState().usersReducer.token
      }
    })
    .then(_ => {
      alert("Success")
      dispatch(getAllSubscribed());
    })
    .catch(err => {
      console.log(err);
    })
  }
}

export const removeFromSubscribed = (id) => {
  console.log('yay masuk remove')
  return (dispatch, getState) => {
    axios({
      method: 'delete',
      url: `${baseUrl}/subscribes/${id}`,
      headers: {
        access_token: getState().usersReducer.token
      }
    })
    .then(_ => {
      dispatch(getAllSubscribed());
    })
    .catch(err => {
      console.log(err);
    })
  }
}

export const getUserLocation = (place) => {
  console.log ("masuk userAction: getUserLocation")
  return (dispatch) => {
    fetch(`${baseUrl}/locations/search/${place}`)
      .then((res) => res.json())
      .then(({data}) => {
           console.log(data, 'INI DI USERLOC')
          dispatch(setUserLocation(data))
      })
      .catch((err) => {
          console.log(err)
      })
  }    
}

export const getUserLocationSearch = (place) => {
  //console.log ("masuk userAction: getUserLocation")
  //place = 'unknownPlace'
  return (dispatch) => {
    fetch(`${baseUrl}/locations/find/${place}`)
      .then((res) => res.json())
      .then(({data}) => {
          console.log(data, 'INI DI FIND')
          console.log(data.length)
          let result =[]
          if (data.length === 0) // kalo lokasi user tidak ada di database, set default location = Kebon Jeruk
          {
            result = [{
              "id": 29,
              "area": "West Jakarta",
              "name": "Kebon Jeruk",
              "city": "Jakarta"
            }]
          }
          else {
            result = data
          }
          //console.log(result)
          //const result = data.filter(location => location.name === 'Kebon Jeruk');
          dispatch(setUserLocation(result))
      })
      .catch((err) => {
          console.log(err)
      })
  }    
}

export const getWeather = (location) => {
  return (dispatch, getState) => {
    console.log('masuk weather')
    //console.log(getState().usersReducer.token, 'INI TOKEEEENNNNNN')
    const token = getState().usersReducer.token;
    fetch(`${baseUrl}/weather/${location}`, {
      method: 'GET',
      headers: {
        access_token: token
      },
      redirect: 'follow'
    })
    .then((res) => res.json())
    .then(data => {
      console.log(data, 'INI WEATHERRRRRRRRR');
      const newData = JSON.parse(JSON.stringify(data));
      console.log(newData.main, "NEW")
      newData.main.temp = Math.round((Number(newData.main.temp) - 273.15) * 10) / 10;
      dispatch(setWeather(newData));
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

export const getRawPhoto = (photo) => {
  return(dispatch) =>{
    dispatch(setRawPhoto(photo))
  }
}

export const reportDanger = (waterLevel) => {
  return (dispatch, getState) => {
    const id = getState().usersReducer.location[0].id
    console.log(getState().usersReducer.location, 'INI DRI REPORT DANGER')
    axios({
      method: 'put',
      url: `${baseUrl}/locations/${id}`,
      data: { 
        image: getState().usersReducer.photoName,
        waterLevel: Number(waterLevel)
      },
      headers: {
        access_token: getState().usersReducer.token
      }
    })
    .then(({ data }) => {
      console.log('MUAHAHAHAHAHHAHAHAHAHAHA', data);
      const result = [];
      result.push(data.result);
      dispatch(setUserLocation(result));
    })
    .catch(err => {
      console.log(err);
    })
  }
}

export const getReportHistory = () =>{
  return (dispatch, getState) => {
    axios({
      method: 'get',
      url: `${baseUrl}/histories`,
      headers: {
        access_token: getState().usersReducer.token
      }
    })
    .then(result => {
      console.log(result.data.results)
      dispatch(setReportHistory(result.data.results))
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const checkRedis = () => {
  return (dispatch, getState) => {
    axios({
      method: 'post',
      url: `${baseUrl}/login`
    })
    .then(({ data }) => {
      dispatch(setToken(data));
    })
    .catch(err => {
      console.log(err);
    })
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch(setToken(''));
  }
}