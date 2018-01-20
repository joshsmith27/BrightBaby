import {GET_DETAILS} from 'constants';

import axios from 'axios';

const baseUrl = 'api/';

export function Get_Details (id){
	axios.get(`${baseUrl}/getDetails/${id}`)
		.then(function (response) {
			return {
				type: GET_DETAILS,
				payload: response.data
			};
		})
		.catch(function (error) {
			console.log(error);
		});
}