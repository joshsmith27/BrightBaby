import {GET_USERINFO, GET_USER_CART} from './../actions/constants';


export function userInfo (state = {}, action){
	switch(action.type){
		case `${GET_USERINFO}_FULFILLED` :
			return action.payload.data;
		case `${GET_USERINFO}_REJECTED`:
			return action.payload.message;
	    default:
		    return state;
	}
}

export function cart (state = [], action){
	switch(action.type){
		case `${GET_USER_CART}_FULFILLED` :
			return action.payload.data;
		case `${GET_USER_CART}_REJECTED`:
			return action.payload.message;
	    default:
		    return state;
	}
}