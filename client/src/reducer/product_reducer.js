import {GET_DETAILS, GET_PRODUCTS, GET_USERINFO} from './../actions/constants';

export function details (state = {
		details:{
		avaliablequantity: 0,
		name: "",
		price: "",
		description: "",
		moreinformation: "",
		productImages: [{imagepath: ""}],
	}
}, action){
	switch(action.type){
		case `${GET_DETAILS}_PENDING` :
			return{
				details:{
					avaliablequantity: 0,
					name: "",
					price: "",
					description: "",
					moreinformation: "",
					ProductImage: "",
				}
			};
	    case `${GET_DETAILS}_FULFILLED` :
			return action.payload.data;
		case `${GET_DETAILS}_REJECTED`:
			return action.payload.message;
	    default:
		    return state;
	}
}

export function products (state = [], action){
	switch(action.type){
	    case `${GET_PRODUCTS}_FULFILLED` :
			return [...state, action.payload.data];
		case `${GET_PRODUCTS}_REJECTED`:
			return action.payload.message;
	    default:
		    return state;
	}
}

