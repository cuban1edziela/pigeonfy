import { combineReducers } from 'redux';
import loggedReducer from './loggedReducer';

const allReducers = combineReducers({
    isLogged: loggedReducer
});

export default allReducers