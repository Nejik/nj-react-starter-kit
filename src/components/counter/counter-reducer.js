import {COUNTER_INCREMENT, COUNTER_DECREMENT} from './counter-actions'


export default function counterReducer(state = 0, action) {
  const {type} = action
  var result;
  if(type === COUNTER_INCREMENT) {
    result = state + 1
  } else if(type === COUNTER_DECREMENT) {
    result = state - 1
  } else {
    result = state;
  }
  return result;
}