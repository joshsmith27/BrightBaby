import React, {Component} from 'react';
import {StripeProvider} from 'react-stripe-elements';

import SpruceBabyCheckout from './spruce_baby_checkout';
class Checkout extends Component {
  render(){
      return(
          <StripeProvider apiKey="pk_test_mj3oAMnW8TW6P9VpGqFzngLH">
            <SpruceBabyCheckout />
          </StripeProvider>
      );
  }
}
export default Checkout