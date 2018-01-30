
import { combineReducers } from 'redux';
import {details, products} from './product_reducer';
import {userInfo, cart} from './user_reducer';
import {error} from './error_reducer'
const rootReducer = combineReducers({details, products, userInfo, cart, error});

export default rootReducer;

