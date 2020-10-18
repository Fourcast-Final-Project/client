import { SET_INO } from '../actions/types';

const initialState = {
  ino: {}
}

export default (state = initialState, action) => {
  switch (action.types) {
    case SET_INO:
      return { ...state, ino: action.payload };
    default:
      return state;
  }
}