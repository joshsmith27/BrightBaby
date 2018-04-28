import {DEMOGRAPHICS, PAYMENT} from '../constants';

export const Add_Demographics = (payload) =>{
    return {
        type: DEMOGRAPHICS,
        payload
    }
}

export const Add_Payment = (payload) => {
    return {
        type: PAYMENT,
        payload
    }
}