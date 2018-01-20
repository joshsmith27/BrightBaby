import {GET_DETAILS} from './../actions/constants';

export function details (state = {}, action){
	switch(action.type){
	    case GET_DETAILS :
		    return action.payload;
	    default:
		    return state;
	}
}
