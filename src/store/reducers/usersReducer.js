import { SET_TOKEN, SET_USER, SET_SUBSCRIBED } from '../actions/types';

const initialState = {
  token: '',
  user: {},
  subscribed: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_USER: 
      return { ...state, user: action.payload };
    case SET_SUBSCRIBED:
      return { ...state, subscribed: action.payload };
    default:
      return state;
  }
}