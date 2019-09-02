import {GET_FEEDBACKS,ADD_FEEDBACK,DELETE_FEEDBACK,FEEDBACKS_LOADING} from '../actions/types'


const initialState = {
    feedbacks : [],
    loading : false
}

export default function(state=initialState,action){
    switch(action.type){
        case GET_FEEDBACKS:
            return {
                ...state,
                feedbacks : action.payload,
                loading : false
            }
        case DELETE_FEEDBACK:
            return {
                ...state,
                feedbacks : state.feedbacks.filter(feedback =>feedback._id !== action.payload)
            }
        case ADD_FEEDBACK :
            return {
                ...state,
                feedbacks : [action.payload,...state.feedbacks]
            }
        case FEEDBACKS_LOADING : 
            return {
                ...state,
                loading :true
            }
        default : 
            return state
    }
}