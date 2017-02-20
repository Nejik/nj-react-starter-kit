import {combineReducers} from 'redux';

import counterReducer from 'counter/counter-reducer'

export default combineReducers({
  counter: counterReducer
})