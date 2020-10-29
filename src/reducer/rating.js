import {RATING} from '../actions/types';


const initialState={

    rating:[]
 
};


export default function(state=initialState,action){
        const {type,payload}=action;
        console.log(action,"pay22")

    switch (type){
        case RATING:
            console.log(payload,"pay")
            return{
                ...state,
                rating:payload
            }
        default :
            return state
    }
}