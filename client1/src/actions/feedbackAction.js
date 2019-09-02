import axios from 'axios'
import {GET_FEEDBACKS,ADD_FEEDBACK,DELETE_FEEDBACK,FEEDBACKS_LOADING} from './types'
import {returnErrors} from './errorAction'
import {tokenConfig} from './authAction';

export const loadFeedbacks = () => {
    return {
        type : FEEDBACKS_LOADING
    }
}

export const getFeedbacks = ()=>(dispatch,getState)=>{
    dispatch(loadFeedbacks())
    axios.get('/api/feedbacks',tokenConfig(getState))
        .then(res=>
            dispatch({
                type : GET_FEEDBACKS,
                payload : res.data
            }))
        .catch(err=>{
            dispatch(returnErrors(err.response.data,err.response.status))
        })
}

export const deleteFeedback = id => (dispatch,getState)=>{
    axios.delete(`/api/feedbacks/${id}`,tokenConfig(getState))
        .then(res=>dispatch({
            type : DELETE_FEEDBACK,
            payload : id 
        }))
        .catch(err=>dispatch(returnErrors(err.response.data,err.response.status)))
}

export const addFeedback = feedback =>(dispatch)=>{
    axios.post('/api/feedbacks',feedback)
        .then(res=>dispatch({
            type : ADD_FEEDBACK,
            payload : res.data
        }))
        .catch(err=> dispatch(returnErrors(err.response.data,err.response.status)))
}

// FIXME CONNECT WITH SERVER