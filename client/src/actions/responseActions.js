import axios from 'axios'
import {ADD_RESPONSE} from './types'
import {tokenConfig} from './authAction'
import {returnErrors} from './errorAction'


export const addResponse = (response,email) =>(dispatch,getState)=>{
    axios.post('/api/response',response,tokenConfig(getState))
        .then(res => dispatch({
            type : ADD_RESPONSE,
            payload : [res.data,email]
        }))
        .catch(err=>dispatch(returnErrors(err.response.data,err.response.stuatus)))

}
// NOTE ac