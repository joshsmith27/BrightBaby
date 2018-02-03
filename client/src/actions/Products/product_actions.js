import {GET_DETAILS, GET_PRODUCTS, ERROR} from '../constants';
import axios from 'axios';
const baseUrl = 'api/products';

export function Get_Details (id){
	debugger
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