import React, {PropTypes, Component} from 'react'

import "./counter.css"

export default class Counter extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onIncrement: PropTypes.func,
    onDecrement: PropTypes.func
  }

  render() {
    return (
      <div className='counter'>
        <h1>{this.props.value}</h1>
        <button onClick={this.props.onDecrement}>Decrement me</button>
        <button onClick={this.props.onIncrement}>Increment me</button>
      </div>
    )
  }
}