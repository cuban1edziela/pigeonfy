import { combineReducers } from 'redux';
import loggedReducer from './loggedReducer';
import currentUser from './currentUser';

const allReducers = combineReducers({
    isLogged: loggedReducer,
    user: currentUser
});

export default allReducers