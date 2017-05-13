import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

const middlewares = [thunkMiddleware];
const store = createStore(
    reducers,
    {},
    applyMiddleware(...middlewares)
);

export default store;
