import {GET_USERINFO, GET_USER_CART, ERROR} from '../constants';
import axios from 'axios';
const baseUrl = 'api/user';

export function Get_UserInfo (){
	const request = axios.get(`${baseUrl}/getUserInfo`);	
	return {
		type: GET_USER_CART,
		payload: request,
	}
}

export function Get_Cart (){
	const request = axios.get(`${baseUrl}/getCart`);	
	return {
		type: GET_USER_CART,
		payload: request,
	}
}
