import {vendor} from 'vendor/vendor.js';
vendor();

import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';

import Header from 'header/header'
import Footer from 'footer/footer'

import 'css/test.css'

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <main className="body">
          <div className="inner">
            <img src="/img/logo.png" alt=""/>
            <div className="logo-bg"></div>

            <div className="test">app</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.querySelector('.app'));





