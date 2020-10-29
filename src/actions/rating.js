import {RATING} from './types';
import firebaseDb from '../fbase'



export const rateLoad=(dataSet)=> dispatch=>{
    console.log(dataSet,"act")
 dispatch({type:RATING,payload:dataSet})
}