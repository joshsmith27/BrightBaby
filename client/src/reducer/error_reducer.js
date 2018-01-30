import {ERROR} from './../actions/constants';

export function error (state=[], action){
    switch(action.type){
	    case ERROR :
		    return action.payload;
	    default:
		    return state;
	}
}