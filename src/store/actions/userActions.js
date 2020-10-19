import { SET_TOKEN, SET_USER, SET_SUBSCRIBED, SET_LOCATION, SET_WEATHER, SET_PHOTO } from './types';
import axios from 'axios';
const baseUrl = 'http://192.168.0.30:3000'

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

export const setPhoto = (photo) =>{
    return {
      type: SET_PHOTO,
      payload: photo
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
  const { email, password } = user;
  return (dispatch, getState) => {
    axios({
      method: 'post',
      url: baseUrl + '/register',
      data: {
        email,
        password
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
      console.log(data, 'INI SUBSCRIBED');
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
        UserId: getState().usersReducer.user.id,
        LocationId
      },
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

export const getWeather = (location) => {
  return (dispatch, getState) => {
    console.log(getState().usersReducer.token, 'INI TOKEEEENNNNNN')
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
      dispatch(setWeather(data));
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

export const getPhoto = (photo) => {
  return(dispatch) =>{
    dispatch(setPhoto(photo))
  }
}
