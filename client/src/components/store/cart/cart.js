import React, { Component } from 'react';
import CartItem from './cart_item.js';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetCart, RemoveCartItem} from '../../../actions/action';

class Cart extends Component {

  componentWillMount(){
    this.props.GetCart()
  }

  render() {
    let CartItems;
		if(this.props.cart && typeof this.props.cart !== 'string' ){
			CartItems = this.props.cart.map((e)=>{
				return <CartItem
        productName={e.name}
        productImage={e.productImages.length > 0 ?e .productImages[0].imagepath : ""}
        productQuanity={e.quantity}
        productId = {e.productId}
        RemoveCartItem = {this.props.RemoveCartItem}
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
	return bindActionCreators({GetCart, RemoveCartItem}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Cart);

