import {IS_ADMIN} from '../actions/constants';

export const IsAdmin = (state = null, action) => {
    switch(action.type){
        case IS_ADMIN :
            return action.payload;
        default:
            return state;
    }
}