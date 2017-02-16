import {vendor} from 'vendor/vendor.js';
vendor();

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        React app
      </div>
    );
  }
}
ReactDOM.render(<App />, document.querySelector('.app'));





