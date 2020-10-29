import {combineReducers} from 'redux';
import users from './users'
import rating from './rating'

export default combineReducers({
users,
rating
})