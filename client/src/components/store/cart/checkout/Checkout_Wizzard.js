import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Demographics from './Checkout_Wizzard_Components/Demographics';
import PaymentInfo from './Checkout_Wizzard_Components/Stripe_Components/checkout'
class Checkout_Wizzard extends Component {
    render(){
        return(
            <div className="checkout_wizzard-main-container">
                <p>Checkout</p>
                <Route path = {`/checkout/demographics`} component={Demographics}/>
                <Route path = {`/checkout/paymentinfo`} component={PaymentInfo}/>          
            </div>
        );
    }
}

export default Checkout_Wizzard