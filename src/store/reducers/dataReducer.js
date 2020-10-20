import { SET_DATA, SEARCH_DATA,SET_HISTORY, SET_FILTERED_LOCATIONS } from '../actions/types';

const initialState = {
  data: {},
  searchData: [],
  history: [],
  filteredByCity: []
}

export default (state = initialState, action) => {
  // let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case SET_DATA:
      return { ...state, data: action.payload };
    case SET_HISTORY:
      return { ...state, history: action.payload };
    case SEARCH_DATA:
      // newState.searchData = action.payload
      //console.log(newState)
      // return newState
      return { ...state, searchData: action.payload };
    case SET_FILTERED_LOCATIONS:
      return { ...state, filteredByCity: action.payload };
    default:
      return state;
  }
}


