export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
export const COUNTER_DECREMENT = 'COUNTER_DECREMENT';

export function increment() {
  return {
    type: COUNTER_INCREMENT
  }
}
export function decrement() {
  return {
    type: COUNTER_DECREMENT
  }
}