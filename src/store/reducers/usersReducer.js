import { SET_TOKEN, SET_USER, SET_SUBSCRIBED, SET_LOCATION, SET_RAW_PHOTO, SET_WEATHER, SET_PHOTO_NAME } from '../actions/types';

const initialState = {
  token: '',
  user: {},
  subscribed: [],
  location: [],
  weather: {},
  rawPhoto: '',
  photoName: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_USER: 
      return { ...state, user: action.payload };
    case SET_SUBSCRIBED:
      return { ...state, subscribed: action.payload };
    case SET_LOCATION:
      return { ...state, location: action.payload };
    case SET_WEATHER:
      return { ...state, weather: action.payload };
    case SET_RAW_PHOTO:
      return { ...state, rawPhoto: action.payload };
    case SET_PHOTO_NAME:
      return { ...state, photoName: action.payload };
    default:
      return state;
  }
}