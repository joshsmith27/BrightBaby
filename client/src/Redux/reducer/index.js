import { combineReducers } from 'redux';
import {details, products, alert} from './product_reducer';
import {userInfo, cart, canCheckout} from './user_reducer';
import{IsAdmin} from './admin_reducer';
import {checkout} from './checkout_reducer';
const rootReducer = combineReducers({details, products, userInfo, cart, IsAdmin, alert, checkout, canCheckout});

export default rootReducer;

