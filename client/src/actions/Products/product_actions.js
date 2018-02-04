import {GET_DETAILS, GET_PRODUCTS, POST_PRODUCT} from '../constants';
import axios from 'axios';
const baseUrl = 'api/products';

export function Get_Details (id){
	const request = axios.get(`${baseUrl}/getdetails/${id}`);	
	return {
		type: GET_PRODUCTS,
		payload: request,
	}
};

export function Get_Products (){
	const request = axios.get(`${baseUrl}/getproducts`);	
	return {
		type: GET_PRODUCTS,
		payload: request,
	}
}

export function Post_Update_Products(id, updates){
	debugger
	const request = axios.post(`${baseUrl}/postProducts/${id}`, updates);	
	return {
		type: POST_PRODUCT,
		payload: request,
	}
}