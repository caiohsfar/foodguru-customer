import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './reducers';
import Reactotron from '../config/ReactotronConfig';

const midlewares = applyMiddleware(ReduxThunk);
const Store = createStore(Reducers, {}, midlewares);

export default Store;
