import {AUTH_ERROR,ADMIN_LOADING,ADMIN_LOADED,REGISTER_SUCCESS,REGISTER_FAIL,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT_SUCCESS} from './types'
import axios from 'axios'
import {returnErrors} from './errorAction';

//Setup Config/headers and token
export const tokenConfig = getState =>{
    //Get token from local 
    const token = getState().auth.token

    //Config Headers
    const config = {
        headers : {
            'Content-Type' : "application/json"
        }
    }
    if(token){
        config.headers['x-auth-token'] = token //{x-auth-token:token}

    }
    return config
}

// Check token and load Admin
export const loadAdmin = ()=>(dispatch,getState)=>{
    dispatch({type : ADMIN_LOADING})
    axios.get('/api/auth/admin',tokenConfig(getState))
        .then(res=>dispatch({
            type : ADMIN_LOADED,
            payload : res.data
        }))
        .catch(err=>{
            dispatch(returnErrors(err.response.data,err.respone.status))
            dispatch({
                type : AUTH_ERROR
            })
        })
}

// Register User
export const register = ({name,email,password})=>dispatch=>{
    // Header 
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({name,email,password})

    axios.post('/api/admin',body,config)
        .then(res =>dispatch({
            type : REGISTER_SUCCESS,
            payload : res.data
        }))
        .catch(err=>{
            dispatch(returnErrors(err.response.data,err.response.status,'REGISTER_FAIL'))
            dispatch({
                type : REGISTER_FAIL
            })
        })
}

// logout action 
export const logout = () =>{
    return {
        type : LOGOUT_SUCCESS
    }
}

// login action 
export const login = ({email,password})=>dispatch=>{
    //Config 
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    // Body request
    const body = JSON.stringify({email,password})

    axios.post('/api/auth',body,config)
        .then(res =>dispatch({
            type : LOGIN_SUCCESS,
            payload : res.data
        }))
        .catch(err=>{
            dispatch(returnErrors(err.response.data,err.response.status,'LOGIN_FAIL'))
            dispatch({
                type : LOGIN_FAIL
            })
        })
}