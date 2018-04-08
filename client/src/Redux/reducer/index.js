import { combineReducers } from 'redux';
import {details, products} from './product_reducer';
import {userInfo, cart} from './user_reducer';
import{IsAdmin} from './admin_reducer'
const rootReducer = combineReducers({details, products, userInfo, cart, IsAdmin});

export default rootReducer;

