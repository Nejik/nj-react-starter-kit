import {vendor} from 'vendor/vendor.js';
vendor();

import React, {PropTypes, Component} from 'react'
import {render} from 'react-dom'
import {Provider, connect} from 'react-redux'

import store from 'store/store'


import Header from 'header/header'
import Footer from 'footer/footer'
import Counter from 'counter/counter'

import {increment, decrement} from 'counter/counter-actions'

@connect(
 (state) => ({
   counter: state.counter
 }), {
   increment,
   decrement
 })
export default class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <main className="body">
          <div className="inner">
            <Counter value={this.props.counter} onDecrement={this.props.decrement} onIncrement={this.props.increment} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
render( <Provider store = {store}>
          <App />
        </Provider>, document.getElementById('app'));





