import { SET_TOKEN, SET_USER, SET_SUBSCRIBED, SET_LOCATION, SET_PHOTO } from '../actions/types';

const initialState = {
  token: '',
  user: {},
  subscribed: [],
  location: {},
  photo:''

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
      case SET_PHOTO:
        return { ...state, photo: action.payload };
    default:
      return state;
  }
}