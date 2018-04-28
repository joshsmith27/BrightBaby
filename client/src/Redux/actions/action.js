import {Get_Details, Get_Products, Post_Update_Products, Alert_Action} from  './Products/product_actions';
import {Get_UserInfo, Get_Cart, Remove_From_Cart, Upadte_From_Cart, Add_To_Cart} from  './User/user_actions';
import {Change_Admin} from './User/admin_action.js'
import {Add_Demographics, Add_Payment} from './Products/checkout_actions.js';
//! comment 
export const GetDetails = Get_Details;
export const GetProducts = Get_Products;
export const GetUserInfo = Get_UserInfo;
export const GetCart = Get_Cart;
export const UpdateProduct = Post_Update_Products;
export const RemoveCartItem = Remove_From_Cart;
export const UpdateCartItem = Upadte_From_Cart;
export const AddToCart = Add_To_Cart;
export const ChangeAdmin = Change_Admin;
export const Alert = Alert_Action;
export const AddDemographics = Add_Demographics;
export const AddPayment = Add_Payment;

