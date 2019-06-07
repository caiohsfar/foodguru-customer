import { combineReducers } from 'redux';
import MenuReducer from './MenuReducer';
import BillReducer from './BillReducer';

const Reducers = combineReducers({
  MenuReducer,
  BillReducer
});

export default Reducers;
