import {Get_Details, Get_Products, Post_Update_Products} from  './Products/product_actions';
import {Get_UserInfo, Get_Cart, Remove_From_Cart, Upadte_From_Cart, Add_To_Cart} from  './User/user_actions';

export const GetDetails = Get_Details;
export const GetProducts = Get_Products;
export const GetUserInfo = Get_UserInfo;
export const GetCart = Get_Cart;
export const UpdateProduct = Post_Update_Products;
export const RemoveCartItem = Remove_From_Cart;
export const UpdateCartItem = Upadte_From_Cart;
export const AddToCart = Add_To_Cart;

