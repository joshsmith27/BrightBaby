import {GET_USERINFO, GET_USER_CART} from '../constants';
import{AddToCart, UpdateCartItem, RemoveItemFromCart, GetTotal} from '../../components/store/cart/add_to_cart_service';
import axios from 'axios';
const baseUrl = 'api/user';

export function Get_UserInfo (){
	const request = axios.get(`${baseUrl}/getUserInfo`);	
	return {
		type: GET_USER_CART,
		payload: request,
	}
}

export function Remove_From_Cart (productId){
	RemoveItemFromCart(productId)
	let payload = {};
	payload.products = JSON.parse(localStorage.getItem('cart')) || [];
	payload.subTotal = GetTotal(payload.products);
	return {
		type: GET_USER_CART,
		payload,
	}
}

export function Upadte_From_Cart (productId, quanity){
	UpdateCartItem(productId, quanity)
	let payload = {};
	payload.products = JSON.parse(localStorage.getItem('cart')) || [];
	payload.subTotal = GetTotal(payload.products);
	return {
		type: GET_USER_CART,
		payload,
	}
}

export function Add_To_Cart(productId, quanity){
	AddToCart(productId, quanity)
	let payload = {};
	payload.products = JSON.parse(localStorage.getItem('cart')) || [];
	payload.subTotal = GetTotal(payload.products);
	return {
		type: GET_USER_CART,
		payload,
	}
}

export function Get_Cart (){
	let payload = {};
	payload.products = JSON.parse(localStorage.getItem('cart')) || [];
	payload.subTotal = GetTotal(payload.products);
	return {
		type: GET_USER_CART,
		payload: payload,
	}
}
