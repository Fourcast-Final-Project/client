import { SET_DATA, SEARCH_DATA,SET_HISTORY } from '../actions/types';

const initialState = {
  data: {},
  searchData: [],
  history:[]
}

export default (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case SET_DATA:
      return { ...state, data: action.payload };
    case SET_HISTORY:
      return { ...state, history: action.payload };
    case SEARCH_DATA:
      newState.searchData = action.payload
      //console.log(newState)
      return newState
    default:
      return state;
  }
}


