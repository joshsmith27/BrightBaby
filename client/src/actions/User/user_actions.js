import {GET_USERINFO, GET_USER_CART, ERROR} from '../constants';
import axios from 'axios';
const baseUrl = 'api/user';

export function Get_UserInfo (){
	axios.get(`${baseUrl}/getUserInfo`)
		.then(function (response) {
			return {
				type: GET_USERINFO,
				payload: response.data
			};
		})
		.catch(function (error) {
			return {
				type: ERROR,
				payload: error.response.data
			}
		});
}

export function Get_Cart (){
	axios.get(`${baseUrl}/getCart`)
		.then(function (response) {
			return {
				type: GET_USER_CART,
				payload: response.data
			};
		})
		.catch(function (error) {
			return {
				type: ERROR,
				payload: error.response.data
			}
		});
}
