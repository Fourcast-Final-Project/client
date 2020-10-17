import { SET_TOKEN, SET_USER, SET_SUBSCRIBED } from './types';
import axios from 'axios';

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

export const getToken = (user) => {
  const { email, password } = user;
  return (dispatch, getState) => {
    axios({
      method: 'post',
      url: 'http://localhost:3000/login',
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
      url: 'http://localhost:3000/register',
      data: {
        email,
        password
      }
    })
    .then(({ data }) => {
      console.log('User successfully registered');
    })
    .catch(err => {
      console.log(err);
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