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
                    ...state,
                    response: [action.payload,...state.response]},   
                loading : false
            }
        default :
            return state
    }
}