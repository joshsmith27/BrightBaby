import {GET_USERINFO, GET_USER_CART} from './../actions/constants';


export function userInfo (state = {}, action){
	switch(action.type){
	    case GET_USERINFO :
		    return action.payload;
	    default:
		    return state;
	}
}

export function cart (state = [], action){
	switch(action.type){
	    case GET_USER_CART :
		    return action.payload;
	    default:
		    return state;
	}
}