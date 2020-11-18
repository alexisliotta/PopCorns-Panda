import {createStore} from 'redux';
import peliculasReducers from './reducers/peliculasReducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(peliculasReducers,composeWithDevTools())

export default store;