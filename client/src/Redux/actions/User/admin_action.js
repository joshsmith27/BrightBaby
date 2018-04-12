import {IS_ADMIN} from '../constants.js';

export const Change_Admin = (payload)=>{
    
    return {
        type:IS_ADMIN,
        payload
    }
}