import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import arduinoReducer from './arduinoReducer';
import dataReducer from './dataReducer';

export default combineReducers({
  usersReducer,
  arduinoReducer,
  dataReducer,
});