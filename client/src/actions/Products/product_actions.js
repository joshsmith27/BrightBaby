import {GET_DETAILS, GET_PRODUCTS, ERROR} from '../constants';
import axios from 'axios';
const baseUrl = 'api/products';

export function Get_Details (id){
	let request = [];
	let type = GET_DETAILS;
	axios.get(`${baseUrl}/getDetails/${id}`)
	.then(function (response) {
		type = GET_DETAILS;
		request = response;
	})
	.catch(function (error) {
		type = ERROR;
		request = error;
	 });
	 return {
		 type,
		 payload: request,
	 }
};

export function Get_Products (){
	let request = [];
	let type = GET_PRODUCTS;
	axios.get(`https://swapi.co/api/people/1`)
		.then(function (response) {
			type = GET_PRODUCTS;
			request = response;
		})
		.catch(function (error) {
			type = ERROR;
			request = error;
		 });
		 return {
			 type,
			 payload: request,
		 }
}