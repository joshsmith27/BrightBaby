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

export function cart (state = {products:[], subTotal: 0}, action){
	switch(action.type){
		case GET_USER_CART :
			return action.payload;
	    default:
		    return state;
	}
}
export const canCheckout =  ( state=false, action)=>{
	if(action.type === GET_USER_CART && action.payload.products.length > 0){
		state = true;
	}
	return state
}