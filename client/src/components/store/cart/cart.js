import React, { Component } from 'react';
import CartItem from './cart_item.js';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetCart, RemoveCartItem, UpdateCartItem} from '../../../Redux/actions/action';
class Cart extends Component {

  constructor(props){
    super(props)
    this.state = {
      checkoutOn: false,
    }
    this.checkout = this.checkout.bind(this);
  }

  componentWillMount(){
    this.props.GetCart()
  }
  checkout(){
    this.props.history.push('/checkout/demographics')
  }
  render() {
    let CartItems;
    let checkoutButton = this.props.canCheckout > 0 ? <button onClick={this.checkout} className="checkoutButton">Check Out</button> : <button disabled onClick={this.checkout} className="checkoutButton">Check Out</button>
		if(this.props.cart.products && typeof this.props.cart.products !== 'string' ){
      console.log(this.props)
			CartItems = this.props.cart.products.map((e, i)=>{
        let image  = e.productImages.filter((image)=>{
          if(image.is_default){
              return image
          }
        })[0]
				return <CartItem
          key={e.productid}
          productName={e.name}
          productImage={e.productImages.length > 0 ? `/uploads/${image.imagepath}` : ""}
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
            <br/>
            {checkoutButton}
          </div>
          
        </footer>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({GetCart, RemoveCartItem, UpdateCartItem}, dispatch);
}
  
export default connect(state => state, mapDispatchToProps)(Cart);

