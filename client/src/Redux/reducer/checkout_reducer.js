 import {DEMOGRAPHICS, PAYMENT} from '../actions/constants';
 const initialState = {
     firstname:'',
     lastname:'',
     address:'',
     address2:'',
     city:'',
     state:'',
     zip:'',
 }
 export const checkout = (state = initialState, action)=>{
    switch(action.type){
        case DEMOGRAPHICS : 
            return state = action.payload;
        case PAYMENT : 
            return state = action.payload;
        default:
            return state;
    }
 }