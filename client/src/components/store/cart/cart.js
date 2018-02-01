import React, { Component } from 'react';
import CartItem from './cart_item.js';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetCart} from '../../../actions/action';

class Cart extends Component {

  componentWillMount(){
    this.props.GetCart()
  }

  render() {
    debugger
    let CartItems;
		if(this.props.cart && typeof this.props.cart !== 'string' ){
			CartItems = this.props.cart.map((e)=>{
				return <CartItem
        productName={e.productName}
        productImage={e.productImage}
        productQuanity={e.productQuanity}
        />
		});
		
		}else{
			CartItems = <div>{this.props.cart}</div>
		}
    return (
      <div className="cart-main-container">
        <p className="Yellow-Text cart-header">CART</p>
        {CartItems}
        <footer>
            <p className="Normal-Text">Total: {this.props.subTotal}</p>
        </footer>
      </div>
    );
  }
}

function mapStateToProps({cart}){
	return {cart};
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({GetCart}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Cart);

