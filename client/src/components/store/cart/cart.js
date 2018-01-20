import React, { Component } from 'react';
import CartItem from './cart_item.js';

class Cart extends Component {
  render() {
    return (
      <div className="cart-main-container">
        <p className="Yellow-Text cart-header">CART</p>
        <CartItem
        productName=""
        productImage=""
        productQuanity="1"
        />
        <footer>
            <p className="Normal-Text">Total: {this.props.subTotal}</p>
        </footer>
      </div>
    );
  }
}

export default Cart;