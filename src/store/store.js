import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk'

import reducer from './reducer'

const store = createStore(reducer, applyMiddleware(ReduxThunk));
window.store = store;//todo, for convenience only, you should comment this line on production

export default store;