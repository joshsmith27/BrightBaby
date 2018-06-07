import React, {Component} from 'react';
import {injectStripe} from 'react-stripe-elements';
import CardSection from './card_section'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as Actions from '../../../../../../Redux/actions/action'

class CheckoutForm extends Component {

    handleSubmit = (ev) => {
      ev.preventDefault();
  
      // Within the context of `Elements`, this call to createToken knows which Element to
      // tokenize, since there's only one in this group.
      this.props.stripe.createToken({name: `${this.props.checkout.firstname} ${this.props.checkout.lastname}` })
        .then(({token}) => {
          debugger
          this.props.checkout.token = token.id;
          this.props.AddPayment(this.props.checkout)
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
            <button>Next</button>
          </div>
        </form>
      );
    }
  }
  
  export default connect(state=>state, Actions)(injectStripe(CheckoutForm));