import {combineReducers} from 'redux'
import feedbackReducer from './feedbackReducer'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import responseReducer from './responseReducer';

export default combineReducers({
    feedback : feedbackReducer,
    auth : authReducer,
    error : errorReducer,
    response : responseReducer
})