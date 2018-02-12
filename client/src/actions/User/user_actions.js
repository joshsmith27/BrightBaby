import {GET_USERINFO, GET_USER_CART} from '../constants';
import{UpdateCart, RemoveCart} from '../cart/add_to_cart_service';
import axios from 'axios';
const baseUrl = 'api/user';

export function Get_UserInfo (){
	const request = axios.get(`${baseUrl}/getUserInfo`);	
	return {
		type: GET_USER_CART,
		payload: request,
	}
}

export function Remove_From_Cart (productId, quanity){
	RemoveCart
	const payload = JSON.parse(localStorage.getItem('cart')) || [];
	return {
		type: GET_USER_CART,
		payload,
	}
}

export function Get_Cart (){
	const payload = JSON.parse(localStorage.getItem('cart')) || [];
	return {
		type: GET_USER_CART,
		payload,
	}
}
