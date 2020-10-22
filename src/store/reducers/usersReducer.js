import { SET_TOKEN, SET_USER, SET_SUBSCRIBED, SET_LOCATION, SET_RAW_PHOTO, SET_WEATHER, SET_PHOTO_NAME, SET_REPORT_HISTORY, SET_WATER_LEVEL, SET_ERROR_LOGIN } from '../actions/types';

const initialState = {
  token: '',
  user: {},
  subscribed: [],
  location: [],
  weather: {},
  rawPhoto: '',
  photoName: '',
  reportHistory: [],
  waterLevel:0, 
  errorLogin:null
}

export default (state = initialState, action) => {
  console.log(action.payload,'inia action reducer')
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
    case SET_REPORT_HISTORY:
      return { ...state, reportHistory: action.payload };
    case SET_WATER_LEVEL:
      return { ...state, waterLevel: action.payload.waterLevel };
    case SET_ERROR_LOGIN:
      return { ...state, errorLogin: action.payload}
    default:
      return state;
  }
  
}