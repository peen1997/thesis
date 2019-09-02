import {ADMIN_LOADED,ADMIN_LOADING,AUTH_ERROR,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT_SUCCESS,REGISTER_SUCCESS,REGISTER_FAIL} from '../actions/types'

const initialState = {
    token : localStorage.getItem('token'),
    isLoading : false,
    isAuthenticated : false,
    admin : null
}

console.log('token', initialState)

export default function(state = initialState,action){
    switch(action.type){
        case ADMIN_LOADING :
            return {
                ...state, // Get current state
                isLoading : true
            }
        case ADMIN_LOADED : 
            return {
                ...state,
                isAuthenticated:true,
                isLoading :false,
                admin : action.payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            debugger;
            return {
                ...state,
                // token: action.payload.token,
                ...action.payload,
                isAuthenticated : true,
                isLoading : false
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated : false,
                isLoading : false,
                admin : null
            }
        default :
            return state
    }
}