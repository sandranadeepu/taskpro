import {USERS} from '../actions/types';


const initialState={
    users:[]
};


export default function(state=initialState,action){
        const {type,payload}=action;
        console.log(action,"pay22")

    switch (type){
        case USERS:
            console.log(payload,"pay")
            return{
                ...state,
                users:payload
            }
        default :
            return state
    }
}