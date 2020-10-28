import {USERS,USER} from './types';
import firebaseDb from '../fbase'



export const loadUsers=(dataSet)=> dispatch=>{
    console.log(dataSet,"act")
 dispatch({type:USERS,payload:dataSet})
}

export const loadUser=(dataSet)=> dispatch=>{
    console.log(dataSet,"act")
 dispatch({type:USER,payload:dataSet})
}