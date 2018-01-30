import {GET_DETAILS, GET_PRODUCTS, GET_USERINFO} from './../actions/constants';

export function details (state = {}, action){
	switch(action.type){
	    case GET_DETAILS :
		    return action.payload;
	    default:
		    return state;
	}
}

export function products (state = [], action){
	switch(action.type){
	    case GET_PRODUCTS :
		    return action.payload;
	    default:
		    return state;
	}
}

