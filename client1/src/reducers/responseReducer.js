import {ADD_RESPONSE} from '../actions/types'

const initialState = {
    response : [],
    loading : false
}

export default function(state=initialState,action){
    switch(action.type){
        case ADD_RESPONSE:
            return {
                ...state,
                
                response : {
                    ...state.response,
                    response: [action.payload,...state.email]},   
                loading : false
            }
        default :
            return state
    }
}