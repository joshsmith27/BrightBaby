import React, {Component} from 'react';
import {StripeProvider} from 'react-stripe-elements';

import SpruceBabyCheckout from './spruce_baby_checkout';
class Checkout extends Component {
  render(){
      return(
        <div>
          <StripeProvider apiKey="pk_test_mj3oAMnW8TW6P9VpGqFzngLH">
            <SpruceBabyCheckout />
          </StripeProvider>
        </div>

      );
  }
}
export default Checkout