import React, { Component } from 'react';
import CartItem from './cart_item.js';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetCart, RemoveCartItem, UpdateCartItem} from '../../../actions/action';

class Cart extends Component {

  componentWillMount(){
    this.props.GetCart()
  }

  render() {
    let CartItems;
		if(this.props.cart.products && typeof this.props.cart.products !== 'string' ){
      console.log(this.props)
			CartItems = this.props.cart.products.map((e, i)=>{
				return <CartItem
        key={e.productid}
        productName={e.name}
        productImage={e.productImages.length > 0 ?e .productImages[0].imagepath : ""}
        productQuanity={e.quanity}
        productPrice={e.price}
        productId = {e.productid}
        RemoveCartItem = {this.props.RemoveCartItem}
        UpdateCartItem = {this.props.UpdateCartItem}
        avaliablequantity={e.avaliablequantity}
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
          <div>
            <p className="Normal-Text">Total: <span className="Purple-Text">{`$${Number(this.props.cart.subTotal).toFixed(2)}`}</span> </p>
          </div>
        </footer>
      </div>
    );
  }
}

function mapStateToProps({cart}){
	return {cart};
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({GetCart, RemoveCartItem, UpdateCartItem}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Cart);

