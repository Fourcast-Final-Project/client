import { SET_TOKEN, SET_USER, SET_SUBSCRIBED, SET_LOCATION } from './types';
import axios from 'axios';

const BASE_URL = 'http://192.168.1.172:3000'

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

export const getToken = (user) => {
  const { email, password } = user;
  return (dispatch, getState) => {
    axios({
      method: 'post',
      url: BASE_URL + '/login',
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
      url: BASE_URL + '/register',
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

export const getAllSubscribed = (id) => {
  return (dispatch, getState) => {
    axios({
      method: 'get',
      url: `http://localhost:3000/subscribed/${id}`
    })
    .then(({ data }) => {
      dispatch(setSubscribed(data));
    })
    .catch(err => {
      console.log(err);
    });
  }
}

export const getUserLocation = (place) => {
  return (dispatch) => {
    // dispatch(setLoading(true))
    axios({
      method: 'get',
      url: BASE_URL + `/locations/search/${place}`
    })
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
    // let url = `http://localhost:3000/locations/search/${place}`;
    //   fetch(url)
    //   .then((res) => res.json())
    //   .then(({data}) => {
    //     console.log(data,`<<<<<`)
    //       dispatch(setUserLocation(data))
    //    })
    //    .catch((err) => {
    //       // setError(err)
    //       console.log(err)
    //   })
      // .finally(() => {
      // //   setLoading(false)
      //     dispatch(setUserLocation(false))
      // })
  }  

}

