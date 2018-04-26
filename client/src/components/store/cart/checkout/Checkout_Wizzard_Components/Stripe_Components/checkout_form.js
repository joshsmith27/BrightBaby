import React, {Component} from 'react';
import {injectStripe} from 'react-stripe-elements';
import CardSection from './card_section'
import {Link} from 'react-router-dom';

class CheckoutForm extends Component {

    handleSubmit = (ev) => {
      // We don't want to let default form submission happen here, which would refresh the page.
      ev.preventDefault();
  
      // Within the context of `Elements`, this call to createToken knows which Element to
      // tokenize, since there's only one in this group.
      this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
        console.log('Received Stripe token:', token);
      });
  
      // However, this line of code will do the same thing:
      // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <CardSection />
          <div className="button-container">
            <Link to={`/checkout/demographics`}>
              <button >Back</button>
            </Link>
            <button>Submit</button>
          </div>
        </form>
      );
    }
  }
  export default injectStripe(CheckoutForm)